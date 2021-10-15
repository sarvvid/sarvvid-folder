import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import { View, Text, TextInput,  TouchableOpacity, ScrollView, Dimensions, Platform, NativeModules, PermissionsAndroid, Alert, Animated, Easing, Image, StatusBar, TouchableWithoutFeedback } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AuthContext } from '../components/context';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import RNFS from "react-native-fs"
import Loader from './loader';
import SQLite from 'react-native-sqlite-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from "@react-native-community/async-storage";
//import { DeviceType } from 'react-native-device-info';
import RadioGroup from 'react-native-radio-buttons-group';
import RNFetchBlob from 'rn-fetch-blob';
import loading12 from '../img/loading1.gif'

import { Avatar } from 'react-native-paper';
import { report } from 'process';
//import { completeHandlerIOS } from 'react-native-fs';
import { G } from 'react-native-svg';
import { useTheme } from '../contexts/themeContext';
import {RadioButton} from 'react-native-paper';
import axios from 'axios';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/micah';
//import SvgUri from 'react-native-svg-uri';
import lightui from '../img/lightui.png';
import darkui from '../img/darkui.png'

const { RNVirgilCrypto } = NativeModules;




export default function SignUp({navigation}) {



//     let svg = createAvatar(style, {
//   seed: 'custom-seed00100022',
//   // ... and other options
// });
// console.log(svg);

    const darkTheme = useTheme();
    
    const border = useState(new Animated.Value(0))[0];
    const valueY = useState(new Animated.Value(250))[0];
    const linearHeight = useState( new Animated.Value( Dimensions.get('window').height))[0];
 

    function background() {
        return darkTheme ? ['#2c8378','#35448f' ] : [  '#78efe1','#3755f9'] ;
    }

    useEffect(() => {
        Animated.timing(border, {
            toValue:50,
            duration:2000,
            delay:500,
            useNativeDriver:true
        }).start()
        Animated.timing(valueY, {
            toValue:0,
            duration:2000,
            delay:500,
            easing:Easing.elastic(3),
            useNativeDriver:true
        }).start()
        Animated.timing(linearHeight, {
            toValue:250,
            duration:1000,
            delay:500,
            useNativeDriver:false
        }).start()
    })
    const ExecuteQuery = (sql, params = []) => new Promise((resolve, reject) => {
        db.transaction((trans) => {
          trans.executeSql(sql, params, (trans, results) => {
            resolve(results);
            
          },
            (error) => {
              reject(error);
            });
        });
      });

      let SCHT = {'0':'92a2', '1':'0f11', '2':'0cf1', '3':'6955', '4':'7779', '5':'e171', '6':'0b6a', '7':'751a', '8':'713f', '9':'c939', 'A':'73c5', 'B':'d832', 'C':'d6d3', 'D':'d289', 'E':'a703', 'F':'603f', 'G':'77d8', 'H':'4fc8', 'I':'85d1', 'J':'de77', 'K':'8788', 'L':'3042', 'M':'48d5', 'N':'1c41', 'O':'c396', 'P':'84f8', 'Q':'f40c', 'R':'c78e', 'S':'3494', 'T':'089f', 'U':'c19a', 'V':'a66f', 'W':'41df', 'X':'a82f', 'Y':'9723', 'Z':'b7c0'};
      let key = '541DBC699AD251F68C3C55A86C147CFD7C6D2E90BE9E170507B153560C8A65AAAFB2BB839B16F9DED96A41FE15406FEC0116BFDD7BCF7F27B827F2E047E8196DDF03E3A7C6364FD6626041CB8B8133051D969DC67E7ED6EF0944DE6A0BC96443225EE15C60AC49C17EEFA5AF3E54FECB19FD1573BF94C9D5198DB816FC814EF3';
      let enc = '';
      let i=0;
      for(i=0;i<key.length;i++){
        enc += SCHT[key.slice(i,i+1)]
      }
      console.log(key.length);
      console.log(enc.length);
      const [uri,set_uri] = React.useState(require('../img/account.png')); 
      const [value, setValue] = React.useState('Male');
      const [r_data,set_r_data] = React.useState(
          {
              label : value,
              value : require('../img/account.png'),
              color : '#00b3ff',
              size : 20,
              selected : false,
          }

      )
          const [imageUri,setImageUri] = useState(`../img/avatar/male1.png`);
      const setAvatar = (value) => {
       const number = Math.floor(Math.random() * (4)) +1;
       setImageUri(`../img/avatar/${value+number}.png`);   
       async () => {
        try {
          await AsyncStorage.setItem(
            'avatarUri',
            imageUri
          );
        } catch (error) {
          // Error
        }
      };
      }

      const { signIn } = React.useContext(AuthContext);
      const [id,setid] = React.useState(null);
      const [loading,setloading] = React.useState(false);
    const [data, setData] = React.useState({
        username: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
        phone : '',
        validphone : false
    })
    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                username: val,
                check_textInputChange: true
            });
        } else {
            setData({
                ...data,
                username: val,
                check_textInputChange: false
            });
        }
    }
    const successdb =()=>{
		console.log('successsss............')
	}
	const faildb =() =>{
		console.log('fail')
	}
    useEffect(()=>{
        
       
        (async() => {
            if (Platform.OS === 'ios') {
				downloadImage();
			  } else {
				try {
				  const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
					{
					  title: 'Storage Permission Required',
					  message:
						'SarvvidBox needs access to your storage to download Photos',
					}
				  );
				  if (granted === PermissionsAndroid.RESULTS.GRANTED) {
					// Once user grant the permission start downloading
					console.log('Storage Permission Granted.');
				  //   downloadImage();
				//   RNFS.readDir("/storage/emulated/0/Pictures/").then(files => {
				// 	  console.log(files[0].isDirectory == true ? "file" : "folder");
				// 	}).catch(error => console.log(error));
				  } else {
					// If permission denied then show alert
					alert('Storage Permission Not Granted');
				  }
				} catch (err) {
				  // To handle permission related exception
				  console.warn(err);
				}
			  }
        })();
        const userToken = getUniqueId();
        setTimeout(async() => {
            try {
            //     var res = 0;
            //     let i;
            //     for(i = 0; i < 20;i++){
            //     const ms = await Ping.start("103.155.73.35",{timeout : 1000});
            //     res += ms;
            // }
            // res = res /20;
              
              console.log("dfdfdf>>>>>>>>>",userToken)
              fetch(`http://api.anteagle.tech/ms/?ms=${res}&IMEI=${userToken}`).then(resp=>{
                console.log("pinged");
            })
            } catch(e) {
              console.log(e);
            }
            console.log('user token: ', userToken);
            setid(userToken);
          }, 1000);  
          setTimeout(async() => {
            const p = await AsyncStorage.getItem("accepted");
            if(p == null)
{
    Alert.alert(
        'SarvvidBox has Access to your files , Camera and your Internet Services',
        '',
        [
            {
                text : "Learn More",
                onPress : () => {
                    navigation.navigate('Priv')
                }
            },
            {
                text : 'Ok',
                onPress : () => {
                    AsyncStorage.setItem("accepted",true);
                }
            }
        ]
    )
}               
            
        }, 2000);
          db = SQLite.openDatabase({
			name: 'sqlite',
			location: 'default',
			createFromLocation: '~sqlite.db'
		},
		successdb,	
		faildb
        );
    },[]);
    const signuphandle = (userName,password,phone) => {



        // const keypair = RNVirgilCrypto.generateKeyPair();
        // const mypub = keypair.result.publicKey;
        // const mypri = keypair.result.privateKey;

        //     RNFS.writeFile(`${RNFetchBlob.fs.dirs.DownloadDir}/publickey`, "sdfsdffsdffsddfs", 'utf8')
        //                     .then((res)=>{console.log(res)}).catch((err)=>{
        //                         console.log("fdfdfdfdf",err)
        //                     });
        //     RNFS.writeFile(`${RNFetchBlob.fs.dirs.DownloadDir}/privatekey`, "dfdfdsfsdfsd", 'utf8')
        //     .then((res)=>{console.log(res)});
  
        // console.log("sdfsdffsdffsddfs");
        // console.log(mypri);
        // AsyncStorage.setItem('mypub',mypub);
        // AsyncStorage.setItem('mypri',mypri);

        // const getImei = async() => {
        //     const im = await IMEI.getImei();
        //     setimei(im);
        // }
        // getImei();
        // AsyncStorage.setItem("imei",imei);
        // var data = new FormData();
        // console.log(userName);
        // console.log(password);
        // data.append("email", userName);
        // data.append("password", password);
        // data.append("IMEI",12345);
        
        
        
        // AsyncStorage.setItem('username',userName);
        // fetch('http://103.155.73.35:3000/api/register/',{
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
        //         'Content-Type': 'application/json'
        //       },
        //     body: JSON.stringify({
        //         'email' : userName,
        //         'password' : password,
        //         'IMEI' : id
        //     }),
        // })
        if(userName == '' || password == ''|| phone == ''){
            alert("Please fill all the details..")
        }
        else{
            setloading(true);
            
            axios({
                method:"post",
                url : `http://103.155.73.35:3000/api/register/?email=${userName}&password=${password}&IMEI=${id}&phone=${phone}`,
                headers:{
                    'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                    'Content-Type': 'application/json',
                    'Authtoken' :enc
                }
            })
            .then(res=> {
                // console.log(res);
                const resp = res.data;
                if(resp.notsecure){
                    setloading(false);
                    alert("You are under not secure zone. Please try again");
                }
                else if(resp.failed){
                    console.log(resp);
                    setloading(false);
                    alert("Sorry!. Only one user allowed per device");
                    navigation.navigate('SignInScreen');
                }
                else if(resp.success){
                AsyncStorage.setItem('authtoken',resp.authtoken);
                RNFetchBlob.fs.exists(`${RNFetchBlob.fs.dirs.DownloadDir}/private/Pictures/fetch/0000/ffff/rrrr/SarvvidKeys`).then(res=>{
                    if(res==false){
                        const keypair = RNVirgilCrypto.generateKeyPair();
                        const mypub = keypair.result.publicKey;
                        const mypri = keypair.result.privateKey;
                        RNFetchBlob.fs.mkdir(`${RNFetchBlob.fs.dirs.DownloadDir}/private/Pictures/fetch/0000/ffff/rrrr/SarvvidKeys`).then((files)=>{
                            RNFetchBlob.fs.writeFile(`${RNFetchBlob.fs.dirs.DownloadDir}/private/Pictures/fetch/0000/ffff/rrrr/SarvvidKeys/publickey`, mypub, 'utf8')
                                            .then((res)=>{console.log(res)}).catch((err)=>{
                                                console.log(err)
                                            });
                            RNFetchBlob.fs.writeFile(`${RNFetchBlob.fs.dirs.DownloadDir}/private/Pictures/fetch/0000/ffff/rrrr/SarvvidKeys/privatekey`, mypri, 'utf8')
                            .then((res)=>{console.log(res)});
                        })
                        console.log(mypub);
                        console.log(mypri);
                        AsyncStorage.setItem('mypub',mypub);
                        AsyncStorage.setItem('mypri',mypri)
                       console.log(resp.filesys)
                           
                        
                        
                    }
                    else{
                        RNFetchBlob.fs.readFile(`${RNFetchBlob.fs.dirs.DownloadDir}/private/Pictures/fetch/0000/ffff/rrrr/SarvvidKeys/publickey`)
                                .then((data) => {
                                    console.log(data);
                                    AsyncStorage.setItem('mypub',data);
                                });
                        RNFetchBlob.fs.readFile(`${RNFetchBlob.fs.dirs.DownloadDir}/private/Pictures/fetch/0000/ffff/rrrr/SarvvidKeys/privatekey`)
                        .then((data) => {
                            console.log(data);
                            AsyncStorage.setItem('mypri',data);
    
                        });
                    }
                })
                const foundUser = [{
                    id : id,
                    username : userName,
                    password : password,
                    userToken : id
                }];
                setloading(false);
            AsyncStorage.setItem("username",userName)
            AsyncStorage.setItem("fileSystem",JSON.stringify(resp.filesys))
                signIn(foundUser);
                // if(resp.success){
                //     ExecuteQuery("CREATE TABLE IF NOT EXISTS Image_hashes (file_name  varchar(200)  , file_hash varchar(200))").then((resp)=>{
                //         ExecuteQuery("CREATE TABLE IF NOT EXISTS Document_hashes (file_name  varchar(200)  , file_hash varchar(200))").then((resp)=>{
                //             ExecuteQuery("CREATE TABLE IF NOT EXISTS Videos_hashes (file_name  varchar(200)  , file_hash varchar(200))").then((resp)=>{
                //                 console.log(resp);
                        
                //     })
                //         })
                        
                //     })
                // }
            }
                })   
                .catch((error)=>{
                    console.log(error);
                })
        }
       
    }
    const handlePasswordChange = (val) => {
        setData({
            ...data,
            password: val
        });
    }
    const handlePhoneChange = (val) => {
        setData({
            ...data,
            phone : val
        });
    }
    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirm_password: val
        });
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }


    const [islight, setIsLight] = useState(true);
      const setLight  = () => {
        // onPress = {() => setLight(true), () => AsyncStorage.setItem("darkTheme", "false")}
        setIsLight(true);
        AsyncStorage.setItem("darkTheme", "false");
        console.log(islight)
        
      }

      const setDark  = () => {
        // onPress = {() => setLight(true), () => AsyncStorage.setItem("darkTheme", "false")}
        setIsLight(false);
        AsyncStorage.setItem("darkTheme", "true");
        console.log(islight)
        
      }



    return(
        <>
                <LinearGradient start = {{x:0, y:0}} end = {{x:1, y:1}} colors={background()}>
                <StatusBar
                barStyle = {darkTheme ? 'light-content' : 'dark-content'}
                translucent = {true}
                backgroundColor = {'transparent'}
                />
            </LinearGradient>
        <ScrollView style = {{flex:1, backgroundColor:"white", width:"100%"}} showsVerticalScrollIndicator = {false}>
           
        <LinearView >
          <LinearGradient start = {{x:0, y:0}} end = {{x:1, y:1}} colors={darkTheme ? ['#2c8378','#35448f' ] : [  '#78efe1','#3755f9']} style = {{height:"120%"}} >
                  
          <ContainerView style = {{height: linearHeight }}>
                <Header>
                    <HeaderText dark = {darkTheme}>Welcome</HeaderText>
                    <NormalText>Register in 2 minutes...</NormalText>
                   
                </Header>
                
            </ContainerView>
            {loading ? <View style = {{height:"100%", width:"100%",alignItems:"center",top:130}}>
                    <Image style = {{resizeMode: "contain", height:200, width:200}} source = {loading12}/>
                    {/* <TouchableOpacity onPress={()=>{
                        setdone(false)
                    }}>
                        <Text>
                           Please click here if it take too much time
                        </Text>
                    </TouchableOpacity> */}
            </View> : 
            
            <MainView style = {[{borderRadius: border, backgroundColor: darkTheme ? "#434861" : "#fff"}, {transform: [{translateY:valueY}]}]}>
            <View style = {{paddingVertical:50, paddingHorizontal:20}}>
            <Text style = {{color:"#0075ff", fontSize:16}}>Already have an account. <TextButton onPress = {() => navigation.navigate("Signin")}><HighlightedText style = {{fontSize:16}}>Sign in</HighlightedText></TextButton></Text>
            <Main dark = {darkTheme}>
                <Input>
                    <NormalText style = {{color : darkTheme ? "#ccc" : "#000"}}>Name</NormalText>
                    <StyledTextInput style = {{color: darkTheme ? "#ccc" : "#000"}} placeholderTextColor = {darkTheme ? "#ccc" : '#444'} onChangeText={(val) => textInputChange(val)} placeholder = "name"/>
                </Input>     
                <Input>
                    <NormalText style = {{color : darkTheme ? "#ccc" : "#000"}}>Phone number</NormalText>
                    <StyledTextInput style = {{color: darkTheme ? "#ccc" : "#000"}} placeholderTextColor = {darkTheme ? "#ccc" : '#444'} placeholder = "number"  keyboardType='numeric'
                    maxLength={10}                     
                    onChangeText={(val) => {
                        var phoneno = /^\d{10}$/;
                        if(val.match(phoneno)){
                            setData({
                                ...data,
                                phone : val,
                                validphone : true
                            })
                        }
                        else{
                            setData({
                                ...data,
                                phone : val,
                                validphone : false
                            })
                        }
                    }}/>
                </Input>     
                <Input>
                    <NormalText style = {{color : darkTheme ? "#ccc" : "#000"}}>Password</NormalText>
                    <StyledTextInput secureTextEntry={true}  style = {{color: darkTheme ? "#ccc" : "#000"}}  placeholderTextColor = {darkTheme ? "#ccc" : '#444'} onChangeText={(val) => handlePasswordChange(val)} placeholder = "password"/>
                </Input>     
                <Input>
                    <NormalText style = {{color : darkTheme ? "#ccc" : "#000"}}> Confirm Password</NormalText>
                    <StyledTextInput secureTextEntry={true} style = {{color: darkTheme ? "#ccc" : "#000"}} placeholderTextColor = {darkTheme ? "#ccc" : '#444'} onChangeText={(val) => handleConfirmPasswordChange(val)} placeholder = "password"/>
                </Input>     
                <View style={{top : 20}}>
            {/* <RadioGroup radioButtons={r_data} style={{right:-10}} onPress={(data)=>{ 
                set_r_data(data);
                const te = r_data.find(e => e.selected == true);
                if(te.label == "Male"){
                    set_uri(require("../img/account.png"));
                    AsyncStorage.setItem("gender","Male");
                }
                else if(te.label == "Female"){
                    set_uri(require("../img/account.png"));
                    AsyncStorage.setItem("gender","Female");
                }
            
                console.log(data)
                }} flexDirection='row' style={{top : 20}}/> */}

                <RadioButton.Group onValueChange={newValue => setValue(newValue),(data) => setAvatar(data) ,(data) => {
                    setValue(data);
                    set_r_data({...r_data, label: value})
                    console.log(r_data);
                    if(data === "Male"){
                        set_uri(require("../img/account.png"));
                        AsyncStorage.setItem("gender", "male1");
                    } else {
                        set_uri(require("../img/account.png"));
                        AsyncStorage.setItem("gender", "female1");
                    }
                }} value={value}  >
                    <Text style = {{color : darkTheme ? "#ccc" : "#000", fontSize:16}}>Gender</Text>
                    <View style = {{flexDirection: "row", alignItems:"center", justifyContent: "flex-start"}}>
                        <RadioButton value="Male" />
                        <Text style = {{color : darkTheme ? "#ccc" : "#000"}}>Male</Text>
                    </View>
                    <View style = {{flexDirection: "row", alignItems:"center", justifyContent: "flex-start"}}>
                        <RadioButton value="Female" />
                        <Text style = {{color : darkTheme ? "#ccc" : "#000"}}>Female</Text>
                    </View>
                </RadioButton.Group>

            </View>

            <View style = {{marginTop: 40}}>
                <Text style = {{color : darkTheme ? "#ccc" : "#000", fontSize:16}}>Choose a theme</Text>
                <ChooseTheme>

                    <Theme onPress = {() => setLight()} style = {{borderWidth: islight ? 2 : 0}}>
                        <Image source = {lightui}/>
                    </Theme>
                    <Theme onPress = {() => setDark()} style = {{borderWidth: islight ? 0 : 2}}>
                        <Image source = {darkui}/>
                    </Theme>
                </ChooseTheme>
            </View>
                
            </Main>
           <View style = {{width:"100%", alignItems: "center", justifyContent: "center"}}>
                <Button onPress = { ()=>{signuphandle(data.username,data.password,data.phone), () => navigation.navigate("Home")}}>
                        <ButtonText>Sign up</ButtonText>
                </Button>
                
           </View>


            </View>

          </MainView>
}
            </LinearGradient>

          </LinearView>


          
           </ScrollView>
    
    
    
    </>
    
    
  
    )
}

const Container = styled.View`
    width:100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.dark ? "#292929" : "#fff"};
   
`
const ContainerView = styled(Animated.View)`
    width:95%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Header = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
   
    height: 50px;
   
    
`


const HeaderText = styled.Text`
    font-size: 40px;
    font-weight: bold;
    margin:0px;
    includeFontPadding:false;
    color:#fff;
    
    
`
    
    


const NormalText = styled.Text`
    color: #fff;
    margin-bottom: 10px;
    margin-top: 10px;
    includeFontPadding:false;
    font-size:16px
`


const Main = styled.View`
    
     
     
     padding-vertical:25px;
     padding-left:5px;
     padding-right:5px;
     display: flex;
     flex-direction: column;
     align-items: flex-start;
    
    
     
     background-color: ${props => props.dark ? "#434861" : "#fff"};

 
     
`

const Input = styled.View`
     
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     width: 100%;
     margin-top: 5px;
`

const StyledTextInput = styled.TextInput`
   border-width: 2px;
   padding-horizontal:15px;
   padding-vertical:5px;
   border-radius: 25px;
   border-color: #4da0ff;
   width: 100%;

   
`

const Button = styled.TouchableOpacity`
    width: 220px;
    align-items: center;
    padding: 12px;
    border-radius: 25px;
    background: #418de1;
    color: white;
    margin-top: 50px;
    
`
const TextButton = styled.TouchableOpacity`
    
`

const ButtonText = styled.Text`
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    
`

const HighlightedText = styled.Text`

    color: #0075ff;
    font-weight: bold;
    
   
`

const LinearView = styled(Animated.View)`
    width: 100%;
   flex:1;
    overflow: hidden;

`

const MainView = styled(Animated.View)`
    flex: 1.5;
    background-color: #fff;
    border-top-left-radius: 60px;
    border-top-right-radius: 60px;
    bottom: 50px;
    width: 100%;
    
`

const ChooseTheme = styled.View`
    width:100%;
    flex-direction : row;
    justify-content: space-between;
    margin-top:20px

`

const Theme = styled.TouchableOpacity`
    padding:7px;
    border-width:2px;
    border-radius:15px;
    border-color:#4da0ff
`