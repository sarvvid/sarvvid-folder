import React, { useState, useRef, useEffect } from 'react';
import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate } from 'react-native-webrtc'
import { GiftedChat, Composer } from 'react-native-gifted-chat';
import io, { Socket } from "socket.io-client";
import ImagePicker from 'react-native-image-crop-picker';
import md5 from "react-native-md5"
import { Text, View, StyleSheet, TextInput, Button, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons"
import { useNavigation } from '@react-navigation/native';
import Header from "react-native-custom-header"
import RNFS from "react-native-fs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

import VideoPlayer from 'react-native-video-player';


const LENGTH = 6;

const Chat = ({ route }) => {
  const navigation = useNavigation();
  const peerRef = useRef();
  const socketRef = useRef();
  const otherUser = useRef();
  const sendChannel = useRef();
  const { roomID } = route.params;
  const [messages, setMessages] = useState([]);
  const [rest, setrest] = React.useState(true);
  var fileChunks = []
  const [loading, setloading] = React.useState(true)
  // const playVideo = useRef();

  useEffect(() => {

    socketRef.current = io.connect("http://103.155.73.36:9091");
    console.log(roomID)
    socketRef.current.emit("join room", roomID); // Provide Room ID here

    socketRef.current.on("other user", userID => {
      callUser(userID);
      otherUser.current = userID;
    });

    socketRef.current.on("user joined", userID => {
      otherUser.current = userID;
    });

    socketRef.current.on("offer", handleOffer);

    socketRef.current.on("answer", handleAnswer);

    socketRef.current.on("ice-candidate", handleNewICECandidateMsg);

  }, []);

  function callUser(userID) {
    // This will initiate the call
    console.log("[INFO] Initiated a call")
    peerRef.current = Peer(userID);
    sendChannel.current = peerRef.current.createDataChannel("sendChannel");
    // fileSharingChannel.current = peerRef.current.createDataChannel("sendFile")

    // listen to incoming messages
    sendChannel.current.onmessage = handleReceiveMessage;
  }

  function Peer(userID) {
    const peer = new RTCPeerConnection({
      iceServers: [
        { url: 'stun:stun1.l.google.com:19302' },
        {
          url: 'turn:numb.viagenie.ca',
          credential: 'muazkh',
          username: 'webrtc@live.com'
        }
      ]
    });
    peer.onicecandidate = handleICECandidateEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

    return peer;
  }

  function handleNegotiationNeededEvent(userID) {
    // Make Offer
    peerRef.current.createOffer().then(offer => {
      return peerRef.current.setLocalDescription(offer);
    })
      .then(() => {
        const payload = {
          target: userID,
          caller: socketRef.current.id,
          sdp: peerRef.current.localDescription,
        };
        socketRef.current.emit("offer", payload);
      })
      .catch(err => console.log("Error handling negotiation needed event", err));
  }

  function handleOffer(incoming) {
    // Handle Offer made by the initiating peer
    console.log("[INFO] Handling Offer")
    peerRef.current = Peer();
    peerRef.current.ondatachannel = (event) => {
      sendChannel.current = event.channel;
      sendChannel.current.onmessage = handleReceiveMessage;
      console.log('[SUCCESS] Connection established')
    }

    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current.setRemoteDescription(desc).then(() => {
    }).then(() => {
      return peerRef.current.createAnswer();
    }).then(answer => {
      return peerRef.current.setLocalDescription(answer);
    }).then(() => {
      const payload = {
        target: incoming.caller,
        caller: socketRef.current.id,
        sdp: peerRef.current.localDescription
      }
      socketRef.current.emit("answer", payload);
    })
  }

  function handleAnswer(message) {
    // Handle answer by the remote peer
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current.setRemoteDescription(desc).catch(e => { setrest(!rest); console.log("Error handle answer", e) });
  }


  function handleReceiveMessage(e) {

    console.log("[INFO] Message received from peer", e.data.substr(0, 4));
    if (e.data.substr(0, 9) == "??image??") {

      if (e.data.toString() === "??image??") {
        const checkvData = fileChunks.join("");
        console.log(checkvData.substr(9, 100))
        console.log("chunck traced")

        const msg = [{
          _id: Math.random(1000).toString(),
          image: `${checkvData.substr(9, checkvData.length)}`,
          createdAt: new Date(),
          user: {
            _id: 2,
          },
        }];

        setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
        fileChunks = []

      } else {
        fileChunks.push(e.data.substr(9, e.data.length))
      }
    }
    else if (e.data.substr(0, 9) == "??video??") {
      console.log(">>>>>>>>>>>>>>>>>vieo Detected")

      if (e.data.toString() === "??video??") {
        const checkvData = fileChunks.join("");
        console.log(checkvData.substr(9, 100))
        console.log("chunck traced")

        const msg = [{
          _id: Math.random(1000).toString(),
          video: `${checkvData.substr(9, checkvData.length)}`,
          createdAt: new Date(),
          user: {
            _id: 2,
          },
        }];
        
        const name = generateFileName();
        const path = `/data/user/0/com.p2p/files/${name}.mp4`;
        msg[0].path = path;
        setloading(true)
        downloadFile(checkvData.substr(31, checkvData.length),path)
        setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
        fileChunks = []

      } else {
        fileChunks.push(e.data.substr(9, e.data.length))
      }

    }
    else {


      const msg = [{
        _id: Math.random(1000).toString(),
        text: e.data,
        createdAt: new Date(),
        user: {
          _id: 2,
        },
      }];
      setMessages(previousMessages => GiftedChat.append(previousMessages, msg))
    }
    // setMessages(messages => [...messages, {yours: false, value: e.data}]);
  };

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      }
      socketRef.current.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.current.addIceCandidate(candidate)
      .catch(e => console.log(e));
  }

  function sendMessage(messages = []) {

    sendChannel.current.send(messages[0].text);
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }

  const renderSend = props => {
    var tempmessage = [{ _id: md5.hex_md5(props.text + Date.now()), creeatedAt: Date.now(), text: props.text, user: { id: props.user.id } }]
    if (props.text.trim()) {
      // console.log(props)
      var tempmessage = [{ _id: md5.hex_md5(props.text + Date.now()), creeatedAt: Date.now(), text: props.text, user: { id: props.user.id } }]
      return (
        <TouchableOpacity onPress={() => sendMessage(tempmessage)}><Ionicons name="md-send-outline" color="grey" size={35}></Ionicons></TouchableOpacity>
      )
    }
    else {
      return (
        <View style={{ display: "flex", flexDirection: 'row', justifyContent: "space-around", alignItems: "center"}}>
          <TouchableOpacity style={{marginLeft:-80}} onPress={() => selectFile(props)} >
            <Ionicons name="camera-outline" color="grey" size={35}>
            </Ionicons>
          </TouchableOpacity>

          <TouchableOpacity style={{marginLeft:-40}} onPress={() => selectVideo(props)}>
            <Ionicons name="md-videocam-outline" color="grey" size={35} ></Ionicons>
          </TouchableOpacity>

        </View>
      )
    }
  }


  const sendVideo = (videoData, path) => {
    // console.log(videoData[0].video)
    var ans = "??video??" + videoData[0].video
    console.log(ans.length, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>byte length")

    const chunkSize = 1024 * 16;
    while (ans.length) {
      const chunk = ans.slice(0, chunkSize);
      ans = ans.slice(chunkSize, ans.length);
      // console.log("??video??"+chunk);
      sendChannel.current.send("??video??" + chunk);
    }

    sendChannel.current.send("??video??")
    videoData[0].video = path
    setMessages(previousMessages => GiftedChat.append(previousMessages, videoData))
  }


  const sendImage = (imageData) => {
    var ans = "??image??" + imageData[0].image
    const chunkSize = 1024 * 16;
    while (ans.length) {
      const chunk = ans.slice(0, chunkSize);
      ans = ans.slice(chunkSize, ans.length);
      // console.log("??video??"+chunk);
      sendChannel.current.send("??image??" + chunk);
    }
    sendChannel.current.send("??image??")

    setMessages(previousMessages => GiftedChat.append(previousMessages, imageData))
  }


  const selectFile = (props) => {
    ImagePicker.openPicker({
      multiple: true,
      includeBase64: true,
    }).then(images => {
      var tempmessage = [{ _id: md5.hex_md5("image" + Date.now()), createdAt: Date.now(), image: `data:${images[0].mime};base64,` + images[0].data, user: { id: props.user.id } }]
      sendImage(tempmessage)
      // console.log(images[0].path);
    });
  }

  const selectVideo = (props) => {
    ImagePicker.openPicker({
      mediaType: "video",
    }).then(video => {
      console.log(video.path, ">>>>>>>>>>>>>>>>>>>>>>>>>>>video path")
      RNFS.readFile(video.path, 'base64').then(ress => {
        // console.log(ress.length)
        var tempVideo = [{ _id: md5.hex_md5("video" + Date.now()), createdAt: Date.now(), video: `data:${video.mime};base64,${ress}`, user: { id: props.user.id } }]
        sendVideo(tempVideo, video.path)
        // console.log(">>>>>>>>>>>>>>>>>>>>>video received")

      }).catch(err => {
        console.log(err)
      })

    })
  }

  const generateFileName = () => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < LENGTH; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  const downloadFile = (file, path) => {
    RNFS.writeFile(path, file, "base64").then(success => {
      console.log("File Download Successfully to ", path);
      setloading(false)
      return "downloaded";
    }).catch(err => {
      console.log("File Download Error", err)
    })
  }


  const renderVideo = (props) => {
    var videoDownload =""
    const { currentMessage } = props;
    console.log(currentMessage.video.substr(0, 100), ">>>>>>>>>>>>>>>>>>>render video")
    if (currentMessage.user._id == 2) {
      return (

        <View style={{ height: 150, width: 250 }}>

          {/* <TouchableOpacity
            onPress={() => {
              downloadFile(currentMessage.video.substr(22, currentMessage.video.length), currentMessage.path)
              videoDownload = "downloaded"
              
            }} 
            style={{flex:1}}
            >
            
            <MaterialIcons name="file-download" size={30} style={{ position: "absolute", top: "50%", left: "50%" }} />
            <Text>Click here ! to download video fiel</Text>
          </TouchableOpacity> */}

          <Video
          style={{
            position:"absolute",
            top:0,
            left:0,
            bottom:0,
            right:0,
          }}

            // style={{
            //   position: 'absolute',
            //   left: 0,
            //   top: 0,
            //   height: 150,
            //   width: 250,
            // //   borderRadius: 20,
            // // }}
            // fullScreenOnLongPress={true}
            // // loop={true}
            // // resizeMode='cover'
            // // videoHeight={150}
            // // videoWidth={250}
            // disableFullscreen={false}
            source={{ uri: currentMessage.path }}
            // autoplay={true}
            // customStyles={{playIcon:true,playButton:true}}
          />
        

          
        </View>
      );
    } else {
      return (

        <View style={{ height: 150, width: 250 }}>
          <VideoPlayer
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: 150,
              width: 250,
              borderRadius: 20,
            }}
            loop={true}
            resizeMode='cover'
            videoHeight={150}
            videoWidth={250}
            video={{ uri: currentMessage.video }}
            onPlayPress={() => {
              console.log("dfdfd")
            }}
            autoplay={true}
            customStyles={{playIcon:true,playButton:true}}
          />
        </View>

      );
    }


  }

  const renderImage = (props) => {
    const { currentMessage } = props
    return (
      
        <View style={{ position: 'relative', height: 150, width: 250 }}>
          <Lightbox activeProps={{
            style:{flex:1,resizeMode:'contain'}
          }}>
          <Image
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              height: 150,
              width: 250,
              borderRadius: 20,
            }}
            source={{ uri: currentMessage.image }}
          ></Image>
          </Lightbox>
        </View>
     
    )
  }

  const rightButtons = [
    {
        id: 1,
        color: 'rgba(255, 255, 255, 0.15)',
        content: <Text>🤙</Text>,
        action: () => alert('First Right Button'),
    },
    {
        id: 2,
        color: 'rgba(255, 255, 255, 0.15)',
        content: <Text>🖐️</Text>,
        action: () => alert('Second Right Button'),
    },
];

const welcomeMsg = ()=>{
  return(
    

<View style={{flexDirection: 'row', alignItems: 'center',marginBottom:20,justifyContent:"center",transform:[{translateY:(Dimensions.get("window").height)/1.4}]}}>
  <View style={{flex: 1, height: 1, backgroundColor: 'grey',transform:[{translateY:8.5}]}} />
  <View>
    <Text style={{width: 300,color:"grey" ,textAlign: 'center',transform:[{rotateX:"180deg"}]}}>Welcome to the India's First Decentralised P2P Chat Application.</Text>
  </View>
  <View style={{flex: 1, height: 1, backgroundColor: 'grey',transform:[{translateY:8.5}]}} />
</View>
  )
}
  return (
<>
<Header
        isGradient={true}
        colors={['#6a11cb', '#2575fc']}
        isBack
        title={"Connected to Peer : "+roomID}
        height={60}
        isShowShadow={true}
        backButtonComponent={
  <TouchableOpacity onPress={()=>{navigation.navigate("P2P")}}
          style={{
            marginRight:20

          }}
  >
  <MaterialIcons name="arrow-back" size={20} />
  </TouchableOpacity>
}
    />
    <GiftedChat
      messages={messages}
      // onSend={(messages)=>sendMessage(messages)}
      user={{
        id: 1,
      }}
      renderSend={renderSend}
      renderMessageVideo={renderVideo}
      renderMessageImage={renderImage}
      renderChatEmpty={welcomeMsg}
    />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },

  textHeader: {
    fontFamily: "sans-serif",
    fontSize: 22,
    alignSelf: "center",
    marginTop: 20,
  }
})

export default Chat;