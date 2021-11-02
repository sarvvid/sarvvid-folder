import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Text, View, Button, TextInput, StyleSheet, FlatList, TouchableOpacity , Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import  Ionicons from "react-native-vector-icons/Ionicons"
import io from "socket.io-client";
import Clipboard from '@react-native-community/clipboard';
import { useIsFocused } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import AntDesign from "react-native-vector-icons/AntDesign"
import { SafeAreaView } from 'react-native-safe-area-context';
const BLUE = "#007AFF";
const BLACK = "#000000";
const LENGTH = 6;
var socketRef = io.connect("http://103.155.73.36:8480");
socketRef.open()
export default function Home() {
    const isfocused = useIsFocused()
    const navigation = useNavigation();
    const [roomID, setRoomId] = useState('');
    const [bg, setBg] = useState('#000'); // for changing the border color of text input
    const [err, setErr] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: '#fff',
                height: 75,
            },
            headerTintColor: '#000',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
            headerLeft: () => (
                <Icon
                    style={{ marginLeft: 15 }}
                    name="menufold"
                    size={28}
                    color="#000"
                    onPress={() => navigation.openDrawer()}
                />
            ),
        })
    })

    // navigation.openDrawer();
    const onFocus = () => {
        setBg(BLUE);
    }

    const onBlur = () => {
        setBg(BLACK);
    }

    const generateID = () => {
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i = 0; i < LENGTH; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    const handleSubmit = () => {
        if (roomID !== '') {
            sendRequest(roomID);
        }
        else {
            setErr("Room ID cannot be empty!")
            setBg('#ff0000');

        }
    }

    const handleCreateSubmit = () => {
        navigation.navigate('Chat', { roomID: roomID, socket: socketRef });
    }

    const mypeer = getUniqueId();
    console.log(mypeer)

    const Item = ({ title }) => (
        <View onPress={navigation.navigate("chat", { roomID: title })}>
            <Text>{title}</Text>
        </View>
    );

    const [data, setData] = useState('')

    const chatRequest = (request) => {
        <Item title={request.id} key={request.id} />
    }

    const sendRequest = async (id) => {
        console.log("request call")
        socketRef.emit("requestcall", id)
        await socketRef.emit('force')
        navigation.navigate('Chatroom', { roomID: id });
    }


    socketRef.on("usercalling", (data) => {
        console.log("dfdfdfdfdfdfd>>>>>>>>>>>>>", data)
        setData(data)


    })


    useEffect(() => {
        socketRef.on("connect", () => {
            console.log(socketRef.id)
            const dt = {}
            dt[mypeer] = socketRef.id
            socketRef.emit("request user", dt)
            // callRequest()
        })

    }, [isfocused])
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.inputContainer}>
                <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginBottom:20}}>
                <Image source={require("../img/logop2p.jpeg")} style={{height:50,width:50,borderRadius:10}}/>
                <Text style={{ alignSelf: 'center', fontSize: 24, margin: 8, fontWeight: 'bold' }}>Sarvvid  P2P</Text>
        </View>
                <View 
                style={{
                    display:"flex",
                    flexDirection:"row",
                    alignItems:"center",
                    justifyContent:"space-around"
            }} >  
                    <Text >My Peer id : <Text style={{fontWeight:"bold"}}> {mypeer}</Text></Text>
                   <TouchableOpacity onPress = {() => {Clipboard.setString(mypeer)
                             Toast.show({
                                type: 'success',
                                text1: 'Copied',
                                text2: 'Peer Id copied Successfully'
                              });
                            }}>
                   <Ionicons name="copy-outline" style={{marginLeft:-70}} size={20} color="black" />
                   </TouchableOpacity>
                </View>

                <Text style={styles.errorStyle}>{err}</Text>
                <TextInput
                    placeholder="Enter Peer ID"
                    selectionColor="#DDD"
                    onChangeText={(text) => setRoomId(text)}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    style={[styles.textInput, { borderColor: bg }]}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    color='#007AFF'
                    onPress={handleSubmit}
                    title="Connect"
                />
            </View>

            {/* <TouchableOpacity onPress={async () => {
                navigation.navigate('Chat', { roomID: data });
            }}
            >
                <Text>{data}</Text>
            </TouchableOpacity> */}

<View style={{flexDirection: 'row', alignItems: 'center',marginBottom:20}}>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
  <View>
    <Text style={{width: 260, textAlign: 'center'}}>Request from Peers will be shown below</Text>
  </View>
  <View style={{flex: 1, height: 1, backgroundColor: 'black'}} />
</View>
            {data ?


                <View style={{backgroundColor:'lightgrey',borderRadius:20,alignSelf:'center',width:'90%',paddingVertical:10}}>
                    <Text style={{ alignSelf: "center",marginBottom:30 }} >Peer Id : <Text style={{fontWeight:"bold"}}>{data}</Text></Text>

                    <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>

                        <TouchableOpacity onPress={async () => {
                            
                            navigation.navigate('Chatroom', { roomID: data });
                        }}
                            style={{ 
                                backgroundColor: "green",
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"space-around",
                                flexDirection:"row",
                                borderRadius:20,
                                padding:13
                            }}
                        >
                            <AntDesign name="checkcircle" color="white" size={23} />
                            <Text style={{ 
                                color: "white",
                                marginLeft:15
                                }}>Accept</Text>

                        </TouchableOpacity>



                        <TouchableOpacity onPress={() => {
                            setData("");
                            socketRef.emit("user decline",{peer:data,roomID})
                        }}
                            style={{ 
                                backgroundColor: "red",
                                display:"flex",
                                alignItems:"center",
                                justifyContent:"center",
                                flexDirection:"row",
                                padding:13,
                                borderRadius:20
                        
                        }}
                        >
                            <AntDesign name="closecircle" color="white" size={23} />
                            <Text style={{ color: "white",marginLeft:15 }} >Decline</Text>
                            </TouchableOpacity>

                    </View>

                </View>
                :
                <View></View>
            }
            <Toast ref={(ref) => Toast.setRef(ref)} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F8FF',
        marginTop:-20
    },
    textInput: {
        height: 55,
        paddingLeft: 15,
        paddingRight: 15,
        fontSize: 18,
        backgroundColor: '#fff',
        borderWidth: .5,
    },
    inputContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        margin: 10,
    },
    buttonContainer: {
        padding: 15,
        borderRadius:20
    },
    textStyle: {
        alignSelf: 'center',
        color: '#D3D3D3',
        marginTop: 5,
    },
    errorStyle: {
        alignSelf: 'center',
        color: '#ff0000',
        marginBottom: 5,
        fontSize: 12,
    }
});