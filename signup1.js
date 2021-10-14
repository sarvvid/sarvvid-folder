import React,{useEffect} from "react";
import { 
    View, 
    Text, 
    Button, 
    TouchableOpacity, 
    Dimensions,
    TextInput,
    Platform,
    StyleSheet,
    ScrollView,
    StatusBar,
    NativeModules,
    PermissionsAndroid,
    ImageBackground,
    Alert
} from 'react-native';
import Ping from 'react-native-ping';
import Loader from './Loader';
import { AuthContext } from '../components/context';
import SQLite from 'react-native-sqlite-storage';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from "@react-native-community/async-storage";
import DeviceInfo from 'react-native-device-info';
import RNFetchBlob from 'rn-fetch-blob';
import RadioGroup from 'react-native-radio-buttons-group';
import { Avatar } from 'react-native-paper';
import { report } from 'process';
import { consumePurchaseAndroid } from 'react-native-iap';
import { completeHandlerIOS } from 'react-native-fs';
import { G } from 'react-native-svg';
const { RNVirgilCrypto } = NativeModules;

// const IMEI = 
const SignInScreen = ({navigation}) => {
    
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
      var SCHT = {'0':'92a2', '1':'0f11', '2':'0cf1', '3':'6955', '4':'7779', '5':'e171', '6':'0b6a', '7':'751a', '8':'713f', '9':'c939', 'A':'73c5', 'B':'d832', 'C':'d6d3', 'D':'d289', 'E':'a703', 'F':'603f', 'G':'77d8', 'H':'4fc8', 'I':'85d1', 'J':'de77', 'K':'8788', 'L':'3042', 'M':'48d5', 'N':'1c41', 'O':'c396', 'P':'84f8', 'Q':'f40c', 'R':'c78e', 'S':'3494', 'T':'089f', 'U':'c19a', 'V':'a66f', 'W':'41df', 'X':'a82f', 'Y':'9723', 'Z':'b7c0'};
      var key = '541DBC699AD251F68C3C55A86C147CFD7C6D2E90BE9E170507B153560C8A65AAAFB2BB839B16F9DED96A41FE15406FEC0116BFDD7BCF7F27B827F2E047E8196DDF03E3A7C6364FD6626041CB8B8133051D969DC67E7ED6EF0944DE6A0BC96443225EE15C60AC49C17EEFA5AF3E54FECB19FD1573BF94C9D5198DB816FC814EF3';
      var enc = '';
      let i=0;
      for(i=0;i<key.length;i++){
        enc += SCHT[key.slice(i,i+1)]
      }
      console.log(key.length);
      console.log(enc.length);
      const [uri,set_uri] = React.useState(require('../src/images/Male.png')); 
      const [r_data,set_r_data] = React.useState([
          {
              label : 'Male',
              value : require('../src/images/Male.png'),
              color : '#00b3ff',
              size : 20,
              selected : true
          },
          {
              label : 'Female',
              value : require('../src/images/Male.png'),
              color : '#00b3ff',
              size : 20
          }
      ])
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
        
       
        setTimeout(async() => {
            if (Platform.OS === 'ios') {
				downloadImage();
			  } else {
				try {
				  const granted = await PermissionsAndroid.request(
					PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
					{
					  title: 'Storage Permission Required',
					  message:
						'App needs access to your storage to download Photos',
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
        }, 4000);
        setTimeout(async() => {
            try {
                var res = 0;
                let i;
                for(i = 0; i < 20;i++){
                const ms = await Ping.start("103.155.73.35",{timeout : 1000});
                res += ms;
            }
            res = res /20;
              userToken = await DeviceInfo.getAndroidId();
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
        'SarvvidBox has Access to your files , Camera and your Intenet Services',
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
    const singuphandle = (userName,password,phone) => {
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
        
        
        AsyncStorage.setItem('username',userName);
        // fetch('http://api.anteagle.tech/api/register/',{
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
        if(data.username == '' || data.password == '' || data.confirm_password == '' || data.phone == ''){
            alert("Please fill all the details..")
        }
        else{
            setloading(true);
            RNFetchBlob.fetch("POST",`http://api.anteagle.tech/api/register/?email=${userName}&password=${password}&IMEI=${id}&phone=${phone}`,{
                'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                'Content-Type': 'application/json',
                'AuthToken' :enc
            })
            .then(res=> res.json())        
            .then(resp=>{
                console.log(resp);
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
                RNFetchBlob.fs.exists('/stotage/emulated/0/private/download/fetch/0000/ffff/rrrr/SarvvidKeys').then(res=>{
                    if(res==false){
                        const keypair = RNVirgilCrypto.generateKeyPair();
                        const mypub = keypair.result.publicKey;
                        const mypri = keypair.result.privateKey;
                        RNFetchBlob.fs.mkdir('/storage/emulated/0/private/download/fetch/0000/ffff/rrrr/SarvvidKeys').then((files)=>{
                            RNFetchBlob.fs.writeFile('/storage/emulated/0/private/download/fetch/0000/ffff/rrrr/SarvvidKeys/publickey', mypub, 'utf8')
                                            .then((res)=>{console.log(res)});
                            RNFetchBlob.fs.writeFile('/storage/emulated/0/private/download/fetch/0000/ffff/rrrr/SarvvidKeys/privatekey', mypri, 'utf8')
                            .then((res)=>{console.log(res)});
                        })
                        console.log(mypub);
                        console.log(mypri);
                        AsyncStorage.setItem('mypub',mypub);
                        AsyncStorage.setItem('mypri',mypri);
                    }
                    else{
                        RNFetchBlob.fs.readFile('/storage/emulated/0/private/download/fetch/0000/ffff/rrrr/SarvvidKeys/publickey')
                                .then((data) => {
                                    console.log(data);
                                    AsyncStorage.setItem('mypub',data);
                                });
                        RNFetchBlob.fs.readFile('/storage/emulated/0/private/download/fetch/0000/ffff/rrrr/SarvvidKeys/privatekey')
                        .then((data) => {
                            console.log(data);
                            AsyncStorage.setItem('mypri',data);
    
                        });
                    }
                })
                
                if(resp.success){
                    ExecuteQuery("CREATE TABLE IF NOT EXISTS Image_hashes (file_name  varchar(200)  , file_hash varchar(200))").then((resp)=>{
                        ExecuteQuery("CREATE TABLE IF NOT EXISTS Document_hashes (file_name  varchar(200)  , file_hash varchar(200))").then((resp)=>{
                            ExecuteQuery("CREATE TABLE IF NOT EXISTS Videos_hashes (file_name  varchar(200)  , file_hash varchar(200))").then((resp)=>{
                                console.log(resp);
                        const foundUser = [{
                            id : id,
                            username : userName,
                            password : password,
                            userToken : id
                        }];
                        setloading(false);
                        signIn(foundUser);
                    })
                        })
                        
                    })
                }
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

    return (
    //   <View style={styles.container}>
    //       <Loader loading={loading}/>
    //       <StatusBar backgroundColor='#00b3ff' barStyle="light-content"/>
    //     <View style={styles.header} flexDirection='row'>
    //         <Text style={styles.text_header}>Register Now!</Text>
    //         <Avatar.Image size={70}  style={{left : 95}} source={uri} />
    //     </View>
        // <Animatable.View 
        //     animation="fadeInUpBig"
        //     style={styles.footer}
        // >
        //     <ScrollView>
        //     <Text style={styles.text_footer}>Username</Text>
        //     <View style={styles.action}>
        //         <FontAwesome 
        //             name="user-o"
        //             color="#00b3ff"
        //             size={20}
        //         />
        //         <TextInput 
        //             placeholder="Your Username"
        //             style={styles.textInput}
        //             autoCapitalize="none"
        //             onChangeText={(val) => textInputChange(val)}
        //         />
        //         {data.check_textInputChange ? 
        //         <Animatable.View
        //             animation="bounceIn"
        //         >
        //             <Feather 
        //                 name="check-circle"
        //                 color="red"
        //                 size={20}
        //             />
        //         </Animatable.View>
        //         : null}
        //     </View>

        //     <Text style={[styles.text_footer, {
        //         marginTop: 35
        //     }]}>Password</Text>
        //     <View style={styles.action}>
        //         <Feather 
        //             name="lock"
        //             color="#00b3ff"
        //             size={20}
        //         />
        //         <TextInput 
        //             placeholder="Your Password"
        //             secureTextEntry={data.secureTextEntry ? true : false}
        //             style={styles.textInput}
        //             autoCapitalize="none"
        //             onChangeText={(val) => handlePasswordChange(val)}
        //         />
        //         <TouchableOpacity
        //             onPress={updateSecureTextEntry}
        //         >
        //             {data.secureTextEntry ? 
        //             <Feather 
        //                 name="eye-off"
        //                 color="grey"
        //                 size={20}
        //             />
        //             :
        //             <Feather 
        //                 name="eye"
        //                 color="grey"
        //                 size={20}
        //             />
        //             }
        //         </TouchableOpacity>
        //     </View>

        //     <Text style={[styles.text_footer, {
        //         marginTop: 35
        //     }]}>Confirm Password</Text>
        //     <View style={styles.action}>
        //         <Feather 
        //             name="lock"
        //             color="#00b3ff"
        //             size={20}
        //         />
        //         <TextInput 
        //             placeholder="Confirm Your Password"
        //             secureTextEntry={data.confirm_secureTextEntry ? true : false}
        //             style={styles.textInput}
        //             autoCapitalize="none"
        //             onChangeText={(val) => handleConfirmPasswordChange(val)}
        //         />
        //         <TouchableOpacity
        //             onPress={updateConfirmSecureTextEntry}
        //         >
        //             {data.secureTextEntry ? 
        //             <Feather 
        //                 name="eye-off"
        //                 color="grey"
        //                 size={20}
        //             />
        //             :
        //             <Feather 
        //                 name="eye"
        //                 color="grey"
        //                 size={20}
        //             />
        //             }
        //         </TouchableOpacity>
        //     </View>
        //     <Text style={[styles.text_footer, {
        //         marginTop: 35
        //     }]}>Phone Number</Text>
        //     <View style={styles.action}>
        //         <Feather 
        //             name="lock"
        //             color="#00b3ff"
        //             size={20}
        //         />
        //         <TextInput 
        //             placeholder="Enter your Phone Number"
        //             style={styles.textInput}
        //             autoCapitalize="none"
        //             keyboardType='numeric'
        //             maxLength={10}
        //             onChangeText={(val) => {
        //                 var phoneno = /^\d{10}$/;
        //                 if(val.match(phoneno)){
        //                     setData({
        //                         ...data,
        //                         phone : val,
        //                         validphone : true
        //                     })
        //                 }
        //                 else{
        //                     setData({
        //                         ...data,
        //                         phone : val,
        //                         validphone : false
        //                     })
        //                 }
        //             }}
        //         />
        //          {data.validphone ? 
        //         <Animatable.View
        //             animation="bounceIn"
        //         >
        //             <Feather 
        //                 name="check-circle"
        //                 color="green"
        //                 size={20}
        //             />
        //         </Animatable.View>
        //         : <Animatable.View
        //         animation="bounceIn"
        //     >
        //         <Feather 
        //             name="x-circle"
        //             color="red"
        //             size={20}
        //         />
        //     </Animatable.View>}
        //     </View>
        //     <View style={styles.textPrivate}>
        //         <Text style={styles.color_textPrivate}>
        //             By signing up you agree to our
        //         </Text>
        //         <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
        //         <Text style={styles.color_textPrivate}>{" "}and</Text>
        //         <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
        //     </View>
        //     <View style={{top : 20}}>
        //     <RadioGroup radioButtons={r_data} onPress={(data)=>{ 
        //         set_r_data(data);
        //         const te = r_data.find(e => e.selected == true);
        //         if(te.label == "Male"){
        //             set_uri(require("../src/images/Male.png"));
        //             AsyncStorage.setItem("gender","Male");
        //         }
        //         else if(te.label == "Female"){
        //             set_uri(require("../src/images/Female.png"));
        //             AsyncStorage.setItem("gender","Female");
        //         }
        //         else{
        //             set_uri(require("../src/images/other.png"));
        //             AsyncStorage.setItem("gender","Other");
        //         }
        //         console.log(data)
        //         }} flexDirection='row' style={{top : 20}}/>
        //     </View>
        //     <View style={styles.button}>
        //         <TouchableOpacity
        //             style={styles.signIn}
        //             onPress={()=>{singuphandle(data.username,data.password,data.phone)}}
        //         >
        //         <LinearGradient
        //             colors={['#05e395', '#00b3ff']}
        //             style={styles.signIn}
        //         >
        //             <Text style={[styles.textSign, {
        //                 color:'#fff'
        //             }]}>Sign Up</Text>
        //         </LinearGradient>
        //         </TouchableOpacity>

        //         <TouchableOpacity
        //             onPress={() => navigation.goBack()}
        //             style={[styles.signIn, {
        //                 borderColor: '#00b3ff',
        //                 borderWidth: 1,
        //                 marginTop: 15
        //             }]}
        //         >
        //             <Text style={[styles.textSign, {
        //                 color: '#00b3ff'
        //             }]}>Sign In</Text>
        //         </TouchableOpacity>
        //     </View>
        //     </ScrollView>
            
        // </Animatable.View>
    //   </View>
    <View style={styles.container}>
      <ImageBackground source={require("./filter-bg.jpeg")}
      style={{width: '100%', height: '100%'}}>
          <StatusBar backgroundColor='#00b3ff' barStyle="light-content"/>
        
        <View style={styles.header}>
            <Text style={styles.text_header}>Register Yourself !</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={styles.footer}
        >
            <ScrollView>
            <Text style={styles.text_footer}>Username</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color="#00b3ff"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Username"
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="red"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#00b3ff"
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>

            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#00b3ff"
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color="grey"
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            <Text style={[styles.text_footer, {
                marginTop: 35
            }]}>Phone Number</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color="#00b3ff"
                    size={20}
                />
                <TextInput 
                    placeholder="Enter your Phone Number"
                    style={styles.textInput}
                    autoCapitalize="none"
                    keyboardType='numeric'
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
                    }}
                />
                 {data.validphone ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : <Animatable.View
                animation="bounceIn"
            >
                <Feather 
                    name="x-circle"
                    color="red"
                    size={20}
                />
            </Animatable.View>}
            </View>
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>
            <View style={{top : 20}}>
            <RadioGroup radioButtons={r_data} style={{right:-10}} onPress={(data)=>{ 
                set_r_data(data);
                const te = r_data.find(e => e.selected == true);
                if(te.label == "Male"){
                    set_uri(require("../src/images/Male.png"));
                    AsyncStorage.setItem("gender","Male");
                }
                else if(te.label == "Female"){
                    set_uri(require("../src/images/Female.png"));
                    AsyncStorage.setItem("gender","Female");
                }
            
                console.log(data)
                }} flexDirection='row' style={{top : 20}}/>
            </View>
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={()=>{singuphandle(data.username,data.password,data.phone)}}
                >
                <LinearGradient
                    colors={['#05e395', '#00b3ff']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

               
            </View>
            </ScrollView>
            
        </Animatable.View>
        </ImageBackground>
      </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: '#00b3ff'
      },
      header: {
          flex: 1,
          justifyContent: 'flex-end',
          paddingHorizontal: 20,
          paddingBottom: 120,
          paddingTop:40
      },
      footer: {
          flex: Platform.OS === 'ios' ? 3 : 5,
          backgroundColor: 'white',
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderBottomLeftRadius:15,
          borderBottomRightRadius:15,
          paddingHorizontal: 40,
          paddingVertical: 40,
          marginLeft:20,
          marginRight:20,
          marginTop:-20,
          marginBottom:20,
      },
      text_header: {
          color: '#fff',
  fontFamily:'Orbitron-Medium',
          fontSize: 30,
          textAlign:'center',
          top:45
      },
      text_footer: {
          color: '#00b3ff',
          fontSize: 18,
          fontFamily:'Orbitron-Medium'
  
      },
      action: {
          flexDirection: 'row',
          marginTop: Dimensions.get("screen").height*0.005 ,
          borderBottomWidth: 1,
          borderBottomColor: '#00b3ff',
          paddingBottom: 5
      },
      textInput: {
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 0 : -12,
          paddingLeft: 10,
          color: '#00b3ff',
          fontFamily:'Orbitron-Medium'
  
      },
      button: {
          alignItems: 'center',
          marginTop: 50,
      },
      signIn: {
          width: '100%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 10,
          elevation:60
      },
      textSign: {
          fontSize: 18,
  fontFamily:'Orbitron-Medium'
      },
      textPrivate: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginTop: 20,
          fontFamily:'Orbitron-Medium'
  
      },
      color_textPrivate: {
          color: 'grey',
          fontFamily:'Orbitron-Medium'
      }
  });