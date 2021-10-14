import React,{useEffect} from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    ImageBackground,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
} from 'react-native';
import Loader from './Loader';

import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '@react-navigation/native';
import AsyncStorage from "@react-native-community/async-storage";
import RNFetchBlob from 'rn-fetch-blob';
import { AuthContext } from '../components/context';
import DeviceInfo from 'react-native-device-info';
import Ping from 'react-native-ping';
// import Loader from './Components/Loader';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Col, Row, Grid } from "react-native-easy-grid";

const deviceheight =  Dimensions.get("screen").height;
const devicewidth =  Dimensions.get("screen").width;
const image = { uri: "https://media.giphy.com/media/3o752oeUYz6S2SHi5W/giphy.gif" };
const SplashScreen = ({navigation}) => {
    const { colors } = useTheme();
    const [id,setid] = React.useState(null);
    const [loading,setloading] = React.useState(false);
    const [avatar_uri,seturi] = React.useState(require("../src/images/other.png"));
    const { signIn } = React.useContext(AuthContext);
    useEffect(()=>{
        
        setTimeout(async() => {
            try {
              userToken = await DeviceInfo.getAndroidId();
            var res = 0;
        let i;
        for(i = 0; i < 20;i++){
        const ms = await Ping.start("103.155.73.35",{timeout : 1000});
        res += ms;
    }
    res = res /20;
    fetch(`http://api.anteagle.tech/ms/?ms=${res}&IMEI=${userToken}`).then(resp=>{
        console.log("pinged");
    })
            } catch(e) {
              console.log(e);
            }
            console.log('user token: ', userToken);
            AsyncStorage.setItem("userToken",userToken);
            setid(userToken);
          }, 1000);
                const fetchdata = async() =>{
                    
                    const token = await AsyncStorage.getItem("userToken");
                    setid(token);
                    console.log(token);
                    const userName = await AsyncStorage.getItem('username');
                    
                    // const resp = await  fetch('https://b797588889a05953f5e6bcf741a50f153190b29e381e9a5e8ed11389c.loca.lt/api/getdata/',{
                    //     method: 'POST',
                    //     headers: {
                    //         'Accept': 'application/json, text/plain, */*',  // It can be used to overcome cors errors
                    //         'Content-Type': 'application/json'
                    //       },
                    //     body: JSON.stringify({
                    //         'IMEI' : token
                    //     }),
                    // });
            
                    // const temp_1 = await resp.json();
                    // console.log(temp_1);
                    // const filled_temp = temp_1.filled_per;
                    // const remaining_temp = temp_1.remaining_temp;
                    // const current_temp = temp_1.current_storage;
                    // const rows = resp.rows;
                    // var item = rows.item(0);
                    // console.log(item);
                    // var result = resp.rows.item(0);
                    
                    // console.log(result);    
                    
                    const g = await AsyncStorage.getItem('gender');
                    console.log(g);
                    if (g == 'Male'){
                        seturi(require('../src/images/Male.png'))
                    }
                    else if(g=="Female"){
                        seturi(require("../src/images/Female.png"))
                    }
                    else{
                        seturi(require("../src/images/other.png"));
                    }
                    
                }
                fetchdata();
            // AsyncStorage.getItem('keypair').then((resp)=>{
            // })
            // Animated.timing(pan, {
            //     toValue: { x: 800, y: 0 },
            //     delay: 1000,
            //     useNativeDriver: false,
            // }).start();
            // Animated.timing(list, {
            //     toValue: { x: 0, y: -480 },
            //     delay: 1000,
            //     useNativeDriver: false,
            // }).start();
    },[])
    return (
        <View style={styles.container}>
             <Loader loading={loading}/>
        <ImageBackground source={require("./blue.jpeg")}
        style={{width: '100%', height: '100%'}}>
            <StatusBar backgroundColor='#00b3ff' barStyle="light-content"/>
            {/* <View style={styles.header}>
              <Text style={styles.text_header}>Avatar</Text>
          </View> */}
          
          
             
          <Animatable.Image 
                  animation="bounceIn"
                  
              source={require('./logo.png')}
              style={styles.logo}
              resizeMode="stretch"
              />
              <Animatable.View 
              animation="fadeInUpBig"
              duraton="10000"
              style={{flex:1}}
          >
              <Grid style={styles.after_space}>
              <Row style={styles.row1}>
              <Col>
                  <View style={styles.button}>
                  <TouchableOpacity
                      style={styles.signIn}
                      onPress={()=>{
                        setloading(true);
                                    const password = 'dff';
                                    AsyncStorage.getItem('authtoken').then(au=>{
                                    AsyncStorage.getItem('userToken').then(f=>{
                                        setTimeout(async()=>{
                    
                                            var res = 0;
                                            let i;
                                            for(i = 0; i < 20;i++){
                                            const ms = await Ping.start("103.155.73.35",{timeout : 1000});
                                            res += ms;
                                        }
                                        res = res /20;
                                        RNFetchBlob.fetch("POST",`http://api.anteagle.tech/api/login/?IMEI=${f}&ping=${res}`,{
                                        'Accept': 'application/json, text/plain, */*', 
                                        'Authtoken': au, // It can be used to overcome cors errors
                                        'Content-Type': 'application/json'
                                    }).then(res=>res.json()).then(resp=>{
                                        console.log(resp);
                                        if(resp.code==200){
                                            const foundUser = [{
                                                id : f,
                                                username : res,
                                                password : password,
                                                userToken : f
                                            }];
                                            setloading(false);
                                            signIn(foundUser);
                                        }
                                        else if(resp.code==206){
                                            setloading(false);
                                            alert("You are not registered try to register first");
                                            navigation.navigate("SignUpScreen");
                                        }
                                        else if(resp.code == 777){
                                            setloading(false);
                                            alert("You are not in the secure zone, Please try again later");
                                        }
                                        
                                    },[{
                                        name : 'logindata',
                                        data : JSON.stringify({
                                                    'email' : res,
                                                    'password' : password,
                                                    'IMEI' : f,
                                                })
                                    }]
                                    )
                                            },300)
                                    })
                                })
                      }}
  
                  >
                  <LinearGradient
                      colors={['#05e395', '#00b3ff']}
                      style={styles.signIn}
                  >
                      <Text style={[styles.textSign, {
                          color:'#fff'
                      }]}>Login</Text>
                  </LinearGradient>
  
                  </TouchableOpacity> 
                  </View>
  </Col>
  <Col>
                  <View style={styles.button}>
                  <TouchableOpacity
                      style={styles.signIn}
                      onPress={()=>navigation.navigate('SignUpScreen')}
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
  </Col>
  
              </Row>
              </Grid>
          </Animatable.View>
          </ImageBackground>
        </View>
    //   <View style={styles.container}>
    //       <Loader loading={loading}/>
    //       <StatusBar backgroundColor='#00b3ff' barStyle="light-content"/>
    //     <View style={styles.header}>
    //         <Animatable.Image 
    //             animation="bounceIn"
    //             duraton="1500"
    //         source={avatar_uri}
    //         style={{height:300,width:300}}
    //         />
    //     </View>
    //     <Animatable.View 
    //         style={[styles.footer, {
    //             backgroundColor: colors.background
    //         }]}
    //         animation="fadeInUpBig"
    //     >
    //         <Text style={[styles.title, {
    //             color: colors.text
    //         }]}>LOGIN!</Text>
    //         <Text style={styles.text}>Sign in with account</Text>
    //         <View style={styles.button}>
    //         <TouchableOpacity onPress={()=>{
    //             setloading(true);
    //             const password = 'dff';
    //             AsyncStorage.getItem('authtoken').then(au=>{
    //             AsyncStorage.getItem('userToken').then(f=>{
    //                 setTimeout(async()=>{

    //                     var res = 0;
    //                     let i;
    //                     for(i = 0; i < 20;i++){
    //                     const ms = await Ping.start("103.155.73.35",{timeout : 1000});
    //                     res += ms;
    //                 }
    //                 res = res /20;
    //                 RNFetchBlob.fetch("POST",`http://api.anteagle.tech/api/login/?IMEI=${f}&ping=${res}`,{
    //                 'Accept': 'application/json, text/plain, */*', 
    //                 'Authtoken': au, // It can be used to overcome cors errors
    //                 'Content-Type': 'application/json'
    //             }).then(res=>res.json()).then(resp=>{
    //                 console.log(resp);
    //                 if(resp.code==200){
    //                     const foundUser = [{
    //                         id : f,
    //                         username : res,
    //                         password : password,
    //                         userToken : f
    //                     }];
    //                     setloading(false);
    //                     signIn(foundUser);
    //                 }
    //                 else if(resp.code==206){
    //                     setloading(false);
    //                     alert("You are not registered try to register first");
    //                     navigation.navigate("SignUpScreen");
    //                 }
    //                 else if(resp.code == 777){
    //                     setloading(false);
    //                     alert("You are not in the secure zone, Please try again later");
    //                 }
                    
    //             },[{
    //                 name : 'logindata',
    //                 data : JSON.stringify({
    //                             'email' : res,
    //                             'password' : password,
    //                             'IMEI' : f,
    //                         })
    //             }]
    //             )
    //                     },300)
    //             })
    //         })
    //             }}>
    //             <LinearGradient
    //                 colors={['#05e395', '#00b3ff']}
    //                 style={styles.signIn}
    //             >
    //                 <Text style={styles.textSign}>Login</Text>
    //                 <MaterialIcons 
    //                     name="navigate-next"
    //                     color="#fff"
    //                     size={20}
    //                 />
    //             </LinearGradient>
    //         </TouchableOpacity>
    //         <TouchableOpacity
    //                 onPress={() => navigation.navigate('SignUpScreen')}
    //                 style={[styles.signIn, {
    //                     borderColor: '#00b3ff',
    //                     borderWidth: 1,
    //                     marginTop: 15
    //                 }]}
    //             >
    //                 <Text style={[styles.textSign_2, {
    //                     color: '#00b3ff'
    //                 }]}>Sign Up</Text>
    //             </TouchableOpacity>
    //         </View>
    //     </Animatable.View>
    //   </View>
    );
};

export default SplashScreen;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.14;

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
        paddingVertical: 30,
        marginRight:150,
        marginTop:230,
        marginBottom:400
    },
    row1:{
        top:400,
        alignContent:'center',
        justifyContent:'center',
        paddingLeft:20
         },
         row2:{
            top:130,
            alignContent:'center',
            justifyContent:'center',
            paddingLeft:80
             },
    text_header: {
        color: '#00b3ff',
        fontWeight: 'bold',
        fontSize: 35,
        textAlign:'center',
    },
    text_footer: {
        color: '#00b3ff',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#00b3ff',
        paddingBottom: 5
    },
    logo: {
        top:devicewidth*0.4,
        width: (height_logo*1.7)*1.2,
        height: height_logo*0.9,
        alignSelf:"center"
    },
    textInput: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : -12,
        paddingLeft: 10,
        color: '#00b3ff',
    },
    button: {
        alignItems: 'center',
    },
    signIn: {
        width: 150,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
        elevation:40,
        fontFamily:'Orbitron-Medium'

    },
    textSign: {
        fontSize: 18,
        fontFamily:'Orbitron-Medium'

    },
    textPrivate: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20
    },
    color_textPrivate: {
        color: 'grey'
    },
    after_space:{
        top:-10
    },
});