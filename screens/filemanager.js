import React,{useEffect, useState} from "react";
import styled from 'styled-components';
import { Text, View, Image, FlatList, TouchableOpacity, TextInput , SafeAreaView,StyleSheet,ScrollView, NativeModules, Modal} from 'react-native';
import icondata from './static.json'
import AsyncStorage from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import Svg, {Circle} from 'react-native-svg';
import { useTheme } from '../contexts/themeContext';
import Toast from "react-native-toast-message";
import FAIcon from "react-native-vector-icons/FontAwesome5";
import ImagePicker from 'react-native-image-crop-picker';
import RNFS from 'react-native-fs'
import SweetAlert from 'react-native-sweet-alert';
import Footer from '../components/footer';
import settings from '../img/settings.png';
import Account from '../img/account.png'
import audio from '../img/audio.png';
import audioa from '../img/audioa.png';
import audioadd from '../img/audioadd.png';
import image from '../img/image.png';
import imagea from '../img/imagea.png';
import imageadd from '../img/imageadd.png';
const { RNVirgilCrypto } = NativeModules;
import RNFetchBlob from 'rn-fetch-blob';
import futch from './progress';
import video from '../img/video.png';
import { FlatGrid } from "react-native-super-grid";
import videoa from '../img/videoa.png';
import videoadd from '../img/videoadd.png';
import Ping from "react-native-ping";
import {selectDirectory} from "react-native-directory-picker"
import md5 from "react-native-md5"
import doc from '../img/doc.png';
import RBSheet from "react-native-raw-bottom-sheet";
import doca from '../img/doca.png';
import docadd from '../img/docadd.png';
import AnimatedBar from "react-native-animated-bar";
import other from '../img/other.png';
import othera from '../img/othera.png';
import file from '../img/file.png';
import filea from '../img/filea.png';
import fileadd from '../img/fileadd.png';
import otheradd from '../img/otheradd.png';
import search from '../img/search.png';
import avatar from '../img/avatar/male1.png'
import folderimg from '../img/folderimg.png';
import fileimg from '../img/fileimg.png';
import addfolder from '../img/add.png';
import options from '../img/options.png';
import folderimgdark from '../img/folderimgdark.png';
import fileimgdark from '../img/fileimgdark.png';
import addfolderdark from '../img/add.png';
import optionsdark from '../img/optionsdark.png';
import close from '../img/close.png';
export default function FileManager({navigation})  {
  const normalizeFilePath = (path) => (path.startsWith('file://') ? path.slice(7) : path);
  const [loading,setloading] = React.useState(false);
  const [fill,setfill] = React.useState(0);
  const [settedping,setping] = useState(0);
    var bottompop;
    const [avatar_uri,seturi] = React.useState(require("../img/avatar/male1.png"))
    const darkTheme = useTheme();

    function background() {
        return darkTheme ? ['#2c8378','#35448f' ] : [  '#78efe1','#3755f9'] ;
    }
    // const data = [
    //     {
    //             title: "Files",
    //             key: "File",
    //             image: file,
    //             color: "#878787",
    //             arrow: filea,
    //             add: fileadd,
    //             addcolor: "#c2c2c2",
    //             type: "*/*"
    //     },
    //     {
    //             title: "Images",
    //             key: "Images",
    //             image: image,
    //             color: "#ff4430",
    //             arrow: imagea,
    //             add: imageadd,
    //             addcolor: "#ff604f",
    //             type: 'image/*'
    //     },
        
    //     {
    //             title: "Audios",
    //             key: "Audios",
    //             image: audio,
    //             color: "#3c6ce7",
    //             arrow: audioa,
    //             add: audioadd,
    //             addcolor: "#3c6ce7",
    //             type : 'audio/*'
            
    //     },
    //     {
    //             title: "Videos",
    //             key: "Videos",
    //             image: video,
    //             color: "#3ce762",
    //             arrow: videoa,
    //             add: videoadd,
    //             addcolor: "#09d836",
    //             type : "video/*"
            
    //     },

    // ]
    const [path,setpath] = React.useState("/")
    const [data,setdata] = React.useState([])
    const [modalOpen, setModalOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [done,setdone] = React.useState(false)
    const data1 = data
    const [filestructure,setfilestructure] = React.useState({});
    const [imei,setimei] = React.useState('')

    const [arr,setarr] = React.useState([])
    const [auth,setauth] = React.useState('')

    useEffect(()=>{
   
          (async()=>{
            const im = await AsyncStorage.getItem("authtoken")
            setauth(im)
            const g = await AsyncStorage.getItem('gender');
            console.log(g)
            if (g == 'male1'){
                seturi(require('../img/avatar/male1.png'))
            }
            else if(g=="female1"){
                seturi(require("../img/avatar/female1.png"))
            }
            else if(g=="male2"){
                seturi(require("../img/avatar/male2.png"));
            }
            else if(g=="male3"){
                seturi(require("../img/avatar/male3.png"));
            }
            else if(g=="female3"){
                seturi(require("../img/avatar/female3.png"));
            }
            var token = await AsyncStorage.getItem("userToken")
            setimei(token)
        var ping_res = 0;
				let i;
				for(i = 0; i < 10;i++){
				const ms = await Ping.start("103.155.73.35",{timeout : 500});
				ping_res += ms;
			}
			ping_res = ping_res /10;
			setping(ping_res);
	fetch(`http://103.155.73.35:3000/ms/?ms=${ping_res}&IMEI=${token}`).then((resp)=>{
                console.log("pinged");
    })
            var tempfile = await AsyncStorage.getItem("fileSystem")
            console.log("DATTTTTTTTTT>>>>>>>>>>>>>>>>>>>>>",tempfile)
            tempfile = JSON.parse(tempfile)
            var temparr = tempfile["1382b6993e9f270cb1c29833be3f5750"]["children"]
            setarr(temparr)
           
            setfilestructure(tempfile)
            var temp = []
            for(let i=0;i<temparr.length;i++){
              temp.push(tempfile[temparr[i]])
            }
            setdata(temp)
      

      })()
    },[done])

    const uploadFile = async () => {
       bottompop.close()
      // let result = await DocumentPicker.getDocumentAsync({type: documentType});
      // setDocumentUrl(result.uri);
      // alert(result.uri);
      let result = await ImagePicker.openPicker({multiple:true})
      const mypub = await AsyncStorage.getItem('mypub')
      console.log("dfdfdfdf>>>>>>>>>>>>",mypub)
      let i = 0;
      console.log(result)
      const paths = [];
      for(let i = 0;i<result.length;i++){
          var temp = result[i].path;
          temp = temp.replace("file:///data/user/0/com.sarvvid/cache/react-native-image-crop-picker/",'')
          console.log(temp)
          paths.push(temp)
      }
      console.log(paths)
      let data = new FormData();
      const ut = await AsyncStorage.getItem("userToken");
      const id = ut
      data.append('IMEI',id);
      data.append('name', 'avatar');
      for(let i=0;i<paths.length;i++){
          const encryptedPath = await RNVirgilCrypto.encryptFile(
              normalizeFilePath(result[i].path),
              RNFetchBlob.fs.dirs.DownloadDir + `/encypted_temp_${i}`,
              [mypub],
              false
          );
          
          data.append("doc[]",{
              uri: 'file://'+encryptedPath,
              type: result[i].mime,
              name: paths[i]
          })
      }
      const config = {
          method: 'POST',
          headers: {
           'Content-Type': 'multipart/form-data',
          },
          body: data,
         };
      // AsyncStorage.setItem("authtoken","bc697cfd541d55a8bc69de6a09447e7e9dc67c6d")
      const at = await AsyncStorage.getItem("authtoken");
         
  console.log(data)
   var respo =  await futch(`http://103.155.73.35:3000/upload?ping=${settedping}&IMEI=${ut}`, {
      method: 'post',
      body : data,
      headers:{
          'Content-type' : 'multipart/form-data',
          'Authtoken' : at
      },
   },(progressEvent)=>{
       const tem = (progressEvent.loaded/progressEvent.total)*100
       setloading(true)
       setfill(tem)
   } )
   setloading(false)
   setfill(0)

   console.log(respo)
   respo = JSON.parse(respo.response)
   for(let i=0;i<paths.length;i++){
       RNFS.unlink(`${RNFetchBlob.fs.dirs.DownloadDir}/encypted_temp_${i}`)
   }
   if(respo.success){
      AsyncStorage.setItem("authtoken",respo.newtoken)
      for(let i=0;i<paths.length;i++){
        var tempfile = filestructure
        var newEntry = {};
        newEntry.parentPath = "/";
        newEntry.name = paths[i];
        newEntry.type = "__file__";
        newEntry.path =
          newEntry.parentPath === "/"
            ? `${newEntry.parentPath}${newEntry.name}`
            : `${newEntry.parentPath}/${newEntry.name}`;
        const id = md5.hex_md5(newEntry.path + newEntry.type);
  
        
        newEntry.creatorName = "";
        newEntry.size = 0;
        newEntry.parentID = md5.hex_md5("/"+"__folder__");
        tempfile[id] = newEntry
        tempfile[newEntry.parentID].children.push(id);   
      }
     
      AsyncStorage.setItem("fileSystem",JSON.stringify(tempfile))
      setfilestructure(tempfile)
      SweetAlert.showAlertWithOptions({
          title: 'Uploaded Successfully',
          subTitle: '',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'success',
          cancellable: true
        },
          callback =>{ console.log('callback')
          setdone(true)
  });
     
   } 
   else{
      SweetAlert.showAlertWithOptions({
          title: 'OOPS!..',
          subTitle: 'Something went wrong',
          confirmButtonTitle: 'OK',
          confirmButtonColor: '#000',
          style: 'error',
          cancellable: true
        },
          callback => console.log('callback'));
   }
      // let filename = documentUrl.split('/').pop();
      
      // let match = /\.(\w+)$/.exec(filename);
      // let type = match ? `${match[1]}` : pin``;

      // console.log(type)
      
      // const form = new FormData();

      // form.append(documentType, {
      // uri: documentUrl,
      // type: type,
      // name: result.name,
      // });

      // fetch('http://localhost:19002', {
  // 	method: 'POST',
  // 	body: form
  // }).then(response => {
  // 	console.log(response)
  // }).catch(err => {
  // 	console.log(err);
  // });


  }
    const backgroundStyle = {
        //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
        };

    return (
        <View style = {{flex:1, backgroundColor: `${ darkTheme ? "#292929" : "#fff"}`}}>
      
            <Container>
            {loading ?  <AnimatedBar
                 progress={(fill/100)}
                 height={null}
                 borderColor="#DDD"
                 barColor="#00b3ff"
                 borderRadius={200}
                 style={{top:30}}
                 borderWidth={3}
               >
                 <View style={[styles.row, styles.center]}>
                   <Text style={[styles.barText, { fontSize: 13 }]}>
                     Uploading... {Math.round(fill)}%
                   </Text>
                 </View>
               </AnimatedBar> : null}
            {/* <LinearView>
                <LinearGradient start = {{x:0, y:0}} end = {{x:1, y:1}} colors={background()}  >
                  <AccountView>
                  <ImageView>
                          <Image source = {avatar_uri}/>
                      </ImageView>
                  </AccountView>        
                  <HeaderView>
                      <HeaderText>File Manager</HeaderText>
                  </HeaderView>
                  
                       <CardView>
                           <Card>
                                <Main>
                                    <SubHeading>Available</SubHeading>
                                    <Heading>Storage</Heading>
                                    <Details>
                                        <View style = {{flexDirection: "row", alignItems: "center"}}>
                                            <Round1 ></Round1>
                                            <DetailsText>Used Space</DetailsText>
                                        </View>
                                        <View style = {{flexDirection: "row", alignItems: "center"}}>
                                            <Round></Round>
                                            <DetailsText>Free Space</DetailsText>
                                        </View>
                                    </Details>
                                </Main>
                                <SvgView>
                                    <Svg >
                                        <Circle transform = {{translateX:15, translateY:15}} cx="50" cy="50" r="50" stroke = "#fff" strokeWidth = "15"></Circle>
                                        <Circle transform = {{translateX:15, translateY:15}} cx="50" cy="50" r="50" stroke = "#527BF5" strokeWidth = "15" strokeDasharray = "320" strokeDashoffset = {Math.round((0/100)*320)}></Circle>
                                    </Svg>
                                    <Number >
                                        <NumberText>0%</NumberText>
                                        <NumberText>used</NumberText>
                                    </Number>
                                </SvgView>

                           </Card>
                       </CardView>
                
                </LinearGradient>
          </LinearView> */}
          {/* <View style = {{width:"100%",padding:15,top:-30, display: "flex", alignItems: "center", justifyContent: "space-between", flexDirection: "row"}}>
              <MainText dark = {darkTheme} >My Files</MainText>
             
          </View> */}
            <Input style={{top:16}}>
                    <TextInput style = {{width:"80%", color : darkTheme ? "#ccc" : "#000"}} placeholder = "Search files" placeholderTextColor = {darkTheme ? "#ccc" : '#444'} returnKeyLabel = "send"/>
                    <TouchableOpacity>
                        <Image source = {search}/>
                    </TouchableOpacity>
           </Input>

           
                <SafeAreaView style={{paddingBottom:60}}>
                <FlatGrid
                itemDimension={130}
                data={data}
                renderItem={({ item }) => (<Block style={{paddingVertical:15, paddingHorizontal:20}} onPress={()=>{
                if(item.type=="__folder__"){
                // setarr(item.children)
                // setpath(`/${item.name}`)
                navigation.push("Filedetails", {data:data, arr:item.children, path:`/${item.name}`, name : item.name })
                }
                else{
                    
                  RNFS.mkdir(`/storage/emulated/0/Pictures/SarvvidBox`).then(res=>{
                      console.log(res);
                      Toast.show({
                          type: 'success',
                          text1: 'Downloading...',
                          text2: `${item.name} is downloading....`
                        });
                    }).catch(err=>{
                      console.log(err);
                    })
                  RNFetchBlob.config({
                      fileCache:true,
                      addAndroidDownloads : {
                          useDownloadManager : true,
                            notification : true,
                            mediaScannable: true,
                            title : item.name,
                            path  : `${RNFetchBlob.fs.dirs.DownloadDir}/${item.name}_enc`,
                        }
                  }).fetch('GET',`http://103.155.73.35:3000/cat?filehash=${item.name}&IMEI=${imei}&ping=${settedping}`,{ 'Cache-Control': 'no-store',"Authtoken":auth}).progress((received,total)=>{
                      console.log('progress',received/total);
                  }).then(async(resp)=>{
                      const pri = await AsyncStorage.getItem("mypri")
                      const path = await RNVirgilCrypto.decryptFile(
                          normalizeFilePath(RNFetchBlob.fs.dirs.DownloadDir+`/${item.name}_enc`),  
                          `/storage/emulated/0/Pictures/SarvvidBox/${item.name}`,
                          pri,
                        ) 
                        FileViewer.open(`file:///storage/emulated/0/Pictures/SarvvidBox/${item.name}`,{onDismiss : ()=>{console.log("dismiss");}})
                        RNFS.unlink(`file:///storage/emulated/0/Pictures/SarvvidBox/${item.name}`)
                        RNFS.unlink(`${RNFetchBlob.fs.dirs.DownloadDir}/${item.name}_enc`)
                  })
                  
  
          }
                }}>
                          <View style = {{}}>
                                <Image source = { item.type === "__folder__" ? darkTheme ? folderimg : folderimg : darkTheme ? fileimg : fileimgdark}/>
                                </View>
                            <View style = {{alignItems:"center",  width:"100%", flexDirection:"row", justifyContent:"center",textAlign:"center",alignContent:"center",alignSelf:"center"}}>
                            <Text style = {{ color : darkTheme ? "#ddd" : "black",alignSelf:"center",padding:-20}}>{item.name}</Text>
                            {/* <Image source = {darkTheme ? options : optionsdark}/> */}
                            </View>
                    
                    </Block>)}
                />
                
               
    
       {/*   <Input style={{top:-10}}>
                    <TextInput style = {{width:"80%", color : darkTheme ? "#ccc" : "#000"}} placeholder = "Search files" placeholderTextColor = {darkTheme ? "#ccc" : '#444'} returnKeyLabel = "send"/>
                    <TouchableOpacity>
                        <Image source = {search}/>
                    </TouchableOpacity>
           </Input>

                <FlatList style={{top:-10}}
                    data = {data}
                    renderItem = {({item}) => 
                    <View style = {{width: "100%", paddingHorizontal: 40}}>
                       <Card1 dark = {darkTheme} onPress = {() => navigation.navigate("Filedetails", item)}>
                           <Section1>
                               <Image source = {item.image}/>
                               <View style = {{marginLeft:10}}>
                                   <Title dark = {darkTheme}>{item.title}</Title>
                                   <SectionDetails dark = {darkTheme}>15MB Last Updated:25-08-2021</SectionDetails>
                               </View>
                           </Section1>
                           <Section2>
                               <Image source = {item.arrow}/>
                           </Section2>
                       </Card1>
                    </View>
                }
                /> */}
                </SafeAreaView>
            </Container>
        
            <RBSheet
          ref={ref => {
            bottompop= ref;
          }}
          closeOnDragDown
          customStyles={{
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10
            }
          }}
        >
          <ScrollView>
            <View style={styles.gridContainer}>
              {icondata.grids.map(grid => (
                <TouchableOpacity
                  key={grid.icon}
                 onPress={grid.label === "Upload File" ? () => uploadFile() : grid.label === "Create New Folder" ? () => {setModalOpen(true); bottompop.close()} :() => selectDirectory((path) => console.log(`The path is ${path}`))}
                  style={styles.gridButtonContainer}
                >
                  <View style={[styles.gridButton, { backgroundColor: grid.color }]}>
                    <FAIcon name={grid.icon} style={styles.gridIcon} />
                  </View>
                  <Text style={styles.gridLabel}>{grid.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </RBSheet>
        <TouchableOpacity style = {{ position: 'absolute',
    width: 170,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    right: -15,
    bottom: -15}} onPress={()=>{
                    bottompop.open()
                }}>
          <Image source = {addfolder} style={{height:70,width:70,shadowColor:"grey"}}/>
        </TouchableOpacity>

        <ModalContainer>
                <Modal
                animationType= "slide"
                visible = {modalOpen}
                transparent = {true}
                >
                  <ModalView>
                    <View style = {{alignItems:"flex-start", width:"100%"}}>
                      <View style = {{flexDirection:"row", justifyContent:"space-between", width:"100%"}}>
                        <Text style = {{fontSize:16, fontWeight:"bold"}}>Enter new folder name</Text>
                       <TouchableOpacity onPress = {() => setModalOpen(false)}>
                       <Image source = {close}/>
                       </TouchableOpacity>
                      </View>
                      <TextInput onChangeText = {(value) => {setNewFolderName(value)}} value={newFolderName} style = {{borderBottomWidth:2, borderColor:"#0092ff", width:"100%", marginTop:20}}/>
                      <TouchableOpacity onPress={()=>{
                        
                        var tempfile = filestructure
                        var newEntry = {};
                        newEntry.parentPath = "/";
                        newEntry.name = newFolderName;
                        newEntry.type = "__folder__";
                        newEntry.path =
                          newEntry.parentPath === "/"
                            ? `${newEntry.parentPath}${newEntry.name}`
                            : `${newEntry.parentPath}/${newEntry.name}`;
                        const id = md5.hex_md5(newEntry.path + newEntry.type);
                  
                        newEntry.children = []
                        newEntry.creatorName = "";
                        newEntry.size = 0;
                        newEntry.parentID = md5.hex_md5("/"+"__folder__");
                        tempfile[id] = newEntry
                        tempfile[newEntry.parentID].children.push(id);   
                      
                    
                      AsyncStorage.setItem("fileSystem",JSON.stringify(tempfile))
                      setfilestructure(tempfile)
                      SweetAlert.showAlertWithOptions({
                        title: `${newFolderName} created successfully`,
                        subTitle: '',
                        confirmButtonTitle: 'OK',
                        confirmButtonColor: '#000',
                        style: 'success',
                        cancellable: true
                      },
                        callback =>{ console.log('callback')
                        setdone(true)
                });
                      
                      }}>
                        <Text style = {{fontSize:17, color:"#0092ff", marginTop:20}}>CREATE</Text>
                      </TouchableOpacity>
                    </View>
                  </ModalView>

                </Modal>
        </ModalContainer>
        <Toast ref={(ref) => Toast.setRef(ref)} />
        </View>
    )
}

const ModalView = styled.View`
    margin: auto;
    width:90%;
   
    backgroundColor: white;
    borderRadius: 20px;
    padding: 20px;
    alignItems: center;
    shadowColor: #000;

    shadowOpacity: 0.25;
    shadowRadius: 4px;
    elevation: 25
`


const ModalContainer = styled.View`
  
   
justify-content: center;
align-items: center;
margin-top: 20px;
 

 elevation:55;
`

const Block = styled.TouchableOpacity`

  border-radius:15px;
  
  margin:10px;
  align-items:center;
  justify-content:space-between;
  overflow:hidden;
`
const Container = styled.View`
    width:100%;
    flex: 1;
    display: flex;

    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    
   
`

const HeaderText = styled.Text`
    font-size: 40px;
    font-weight: bold;
    margin:0px;
    includeFontPadding:false;
    color: #fff;
    
    
`

const AccountView = styled.View`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex-direction: row;
    margin-top: 25px;
    padding-left: 25px;
    padding-right:25px;
`


const ImageView = styled.View`
    background-color:coral;
    border-radius:50px;
    margin-top:20px;
`

const HeaderView = styled.View`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 25px;
    padding-right: 25px;
    
`
const LinearView = styled.View`
    width: 100%;
   
    overflow: hidden;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
`

const Card = styled.View`
    background-color: #ff724d;
    border-radius: 25px;
    elevation:25;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 25px;
`
const CardView = styled.View`
    padding: 20px;
`
const Heading = styled.Text`
    font-size: 35px;
    color: white;
    font-weight: bold;
    
    
`
const SubHeading = styled.Text`
    font-size: 25px;
    opacity: .9;
    color: white;
    font-weight: bold;
    
`
const Main = styled.View`
    
`

const MainText = styled.Text`
      color : ${props => props.dark ? "#fff" : "#000"};
      font-size: 26px;
`
const SvgView = styled.View`
    width: 150px;
    height: 150px;

    position: relative;
   
   
`

const Number = styled.View`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50px;
    left: 53px;
   
`
const  NumberText = styled.Text`
    color: #0075ff;
    font-size: 18px;
    font-weight: bold;
`

const Round = styled.View`
    width: 10px;
    height: 10px;
    background-color: white;
    border-radius: 15px;
    margin-right: 5px;
`
const Round1 = styled.View`
    width: 10px;
    height: 10px;
    background-color: #527BF5;
    border-radius: 15px;
    margin-right: 5px;
`

const DetailsText = styled.Text`
    color: white;
    font-size: 14px;
`
const Details = styled.View`
    margin-top: 20px;
`

const Card1 = styled.TouchableOpacity`
    width: 100%;
    padding: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${props => props.dark ? "#434861" : "#fff"};
    border-radius: 15px;
    margin-vertical: 10px;

    shadow-color: #000;
    shadow-offset: {
        width: 0;
        height: 2;
    };
    shadow-opacity: 0.25;
    shadow-radius: 4.84;

    elevation: 5;
`
const Title = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color : ${props => props.dark ? "#fff" : "#000"};
`
const SectionDetails = styled.Text`
    opacity: .5;
    color : ${props => props.dark ? "#fff" : "#000"};
`

const Section1 = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`
const Section2 = styled.View`
    
`

const Input = styled.View`

 width: 90%;
 margin-top:25px ;
 margin-bottom:20px;
 border-radius: 25px;
 border-width: 2px;
 border-color: #0092ff;
 padding:5px;
 padding-left:15px;
 padding-right:15px;
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },
    textTitle: {
      fontSize: 20,
      marginTop: 120
    },
    buttonContainer: {
      alignItems: "center",
      marginTop: 50
    },
    button: {
      width: 150,
      backgroundColor: "#4EB151",
      paddingVertical: 10,
      alignItems: "center",
      borderRadius: 3,
      margin: 10
    },
    buttonTitle: {
      color: "#FFFFFF",
      fontSize: 16,
      fontWeight: "600"
    },
    listContainer: {
      flex: 1,
      padding: 25
    },
    listTitle: {
      fontSize: 16,
      marginBottom: 20,
      color: "#666"
    },
    listButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 10
    },
    listIcon: {
      fontSize: 26,
      color: "#666",
      width: 60
    },
    listLabel: {
      fontSize: 16
    },
    gridContainer: {
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      padding: 10,
      marginBottom: 10
    },
    gridButtonContainer: {
      flexBasis: "33%",
      marginTop: 20,
      justifyContent: "center",
      alignItems: "center"
    },
    gridButton: {
      width: 40,
      height: 40,
      borderRadius: 25,
      justifyContent: "center",
      alignItems: "center"
    },
    gridIcon: {
      fontSize: 23,
      color: "white"
    },
    gridLabel: {
      fontSize: 10,
      paddingTop: 10,
      color: "#333"
    },
    dateHeaderContainer: {
      height: 45,
      borderBottomWidth: 1,
      borderColor: "#ccc",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    dateHeaderButton: {
      height: "100%",
      paddingHorizontal: 20,
      alignItems: "center",
      justifyContent: "center"
    },
    dateHeaderButtonCancel: {
      fontSize: 18,
      color: "#666",
      fontWeight: "400"
    },
    dateHeaderButtonDone: {
      fontSize: 18,
      color: "#006BFF",
      fontWeight: "500"
    },
    inputContainer: {
      borderTopWidth: 1.5,
      borderTopColor: "#ccc",
      flexDirection: "row",
      alignItems: "center",
      padding: 10
    },
    inputIcon: {
      fontSize: 24,
      color: "#666",
      marginHorizontal: 5
    },
    inputIconSend: {
      color: "#006BFF"
    },
    input: {
      flex: 1,
      height: 36,
      borderRadius: 36,
      paddingHorizontal: 10,
      backgroundColor: "#f1f1f1",
      marginHorizontal: 10
    },
    messageContainer: {
      flex: 1,
      padding: 25
    },
    messageTitle: {
      fontSize: 22,
      fontWeight: "bold",
      color: "#222"
    },
    message: {
      fontSize: 17,
      lineHeight: 24,
      marginVertical: 20
    },
    messageButtonContainer: {
      flexDirection: "row",
      justifyContent: "flex-end"
    },
    messageButton: {
      paddingHorizontal: 20,
      paddingVertical: 8,
      borderWidth: 2,
      borderRadius: 2,
      borderColor: "#3385ff",
      marginLeft: 10
    },
    messageButtonText: {
      color: "#3385ff",
      fontSize: 16,
      fontWeight: "bold"
    },
    messageButtonRight: {
      backgroundColor: "#3385ff"
    },
    messageButtonTextRight: {
      color: "#fff"
    },
    points: {
        textAlign: 'center',
        color: '#7591af',
        fontSize: 50,
        fontWeight: '100',
      },
      container: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#152d44',
        padding: 50,
      },
      pointsDelta: {
        color: '#4c6479',
        fontSize: 50,
        fontWeight: '100',
      },
      pointsDeltaActive: {
        color: '#fff',
      },
  
        rowText: {
          marginRight: 20,
        },
        row: {
          flexDirection: "row",
        },
        center: {
          justifyContent: "center",
          alignItems: "center",
        },
        barText: {
          backgroundColor: "transparent",
          color: "#FFF",
        },
  });