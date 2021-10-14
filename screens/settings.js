import React, {useState, useEffect} from "react";
import { useThemeUpdate, useTheme } from '../contexts/themeContext';
import styled from 'styled-components';
// import { BarCodeScanner } from 'expo-barcode-scanner';
import { Text, View, Image, TouchableOpacity, Button,StyleSheet, TextInput, Animated , StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import account from '../img/account.png';
import Footer from '../components/footer';
import { AuthContext } from '../components/context';
import AsyncStorage from '@react-native-community/async-storage';
import chat from '../img/chat.png';
import avatar from '../img/avatar/male1.png'
import Toast from 'react-native-toast-message';
import close from '../img/close.png'
import closedark from '../img/closedark.png';
import Modal from 'react-native-modal';
import moon from '../img/moon.png';
import sun from '../img/sun.png';

export default function Settings({navigation})  {

    const { signOut } = React.useContext(AuthContext);
    const [avatar_uri,seturi] = React.useState(require("../img/avatar/male1.png"))
    const darkTheme = useTheme();
    const toggleTheme = useThemeUpdate();

    function background() {
        return darkTheme ? ['#2c8378','#35448f' ] : [  '#78efe1','#3755f9'] ;
    }


    const [abc, setAbc] = useState("");
    const [edit,setedit] = useState(false)
    const [newName, setNewName] = useState('')  
    const [oldName, setOldName] = useState("")
    useEffect(() => {
        (async()=>{
            const temp = await AsyncStorage.getItem("username")
            setOldName(temp)
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

            const a = await AsyncStorage.getItem("darkTheme");
            console.log("hi", a)

        })()
    })

    const valueX = useState(new Animated.Value(0))[0];

    const toggleAnimation = () => {
        if(darkTheme){
            Animated.timing(valueX,{
                toValue:0,
                duration:300,
                
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(valueX,{
                toValue:23,
                duration:300,
               
                useNativeDriver: true,
            }).start();
        }
    }

    return (
        <View style = {{flex:1, backgroundColor: `${ darkTheme ? "#292929" : "#fff"}` }} >
            <Container>
                 <LinearView>
                    <LinearGradient start = {{x:0, y:0}} end = {{x:1, y:1}} colors={background()}  >
                        <Header>
                            <HeaderText>Settings </HeaderText>
                            
                            <ImageView style = {{position:"absolute", top:45, right:25}}>
                          <Image source = {avatar_uri}/>
                      </ImageView>
                        </Header>
                    </LinearGradient>
                </LinearView>
                <Card dark = {darkTheme}>
                    <View style = {{width: "100%"}}>
                        <Head>Account Settings</Head>
                        <Item><ItemText dark = {darkTheme} onPress={()=>{
                            setedit(true)
                        }}>Edit profile</ItemText></Item>
                        {/* <Item><ItemText dark = {darkTheme}>Change password</ItemText></Item> */}

                        {/* <Item><ItemText dark = {darkTheme}>Enable notifications</ItemText></Item> */}
                    </View>
                    <View style = {{width: "100%"}}>
                        <Head>Others</Head>
                        <Item><ItemText  dark = {darkTheme} onPress = {() => navigation.navigate("Scanner")}>Sarvvid web</ItemText></Item>
                        <Item><ItemText  dark = {darkTheme}>Privacy policy</ItemText></Item>
                        <Item  onPress={
                                        () => { toggleTheme(); toggleAnimation(); }
                                        } >
                            <ItemText dark = {darkTheme}>Dark theme</ItemText>
                            <ToggleButton>
                                <Image source = {moon}/>
                                <Image source = {sun}/>
                                <Round  style = {[{transform: [{translateX: valueX}]}]}></Round>
                            </ToggleButton>
                        </Item>

                        <Item><ItemText onPress = {() => navigation.navigate("Faq")} dark = {darkTheme}>FAQ</ItemText></Item>
                        <Item><ItemText onPress = {() => navigation.navigate("Referral")} dark = {darkTheme}>Get Free Bitcoin👋</ItemText></Item>
                        <Item><ItemText onPress = {() => signOut()} dark = {darkTheme} onPress={()=>{
                            alert("Will be available in Future Release")
                        }}>Sarvvid P2P</ItemText></Item>
                        <Item><ItemText onPress = {() => signOut()} dark = {darkTheme}>Logout</ItemText></Item>
                        
                    </View>
                </Card>
               <Chat onPress = { () => {navigation.navigate("ChatIntro")}}>
                    <ChatImage source = {chat} />
                    <Text style = {{color : darkTheme ? "#ccc" : "#444" }}>Support</Text>
               </Chat>

                
            </Container>
          
            <ModalView>
            <Modal isVisible={edit}>
    <View style={{backgroundColor: darkTheme ? "#434861" : "#fff",padding:20, flexDirection:"row", justifyContent:"space-between", borderTopLeftRadius:25, borderTopRightRadius:25}}>
    <Text style={{fontSize:20,fontFamily:"Orbitron", color : darkTheme ? "#ccc" : "#444"}}>
        Choose your Fav Avatar
        {/* <Image source={require("../img/edit.png")} style={{left:40,right:-40,height:30,width:30}}></Image> */}
            
        </Text>
        <TouchableOpacity onPress = {() => setedit(false)}><Image source = {darkTheme ? closedark : close}/></TouchableOpacity>
        </View>
    
    <View style={{backgroundColor:darkTheme ? "#434861" : "#fff",padding:30,flexDirection:"row",paddingHorizontal:30}}>
    <TouchableOpacity onPress={()=>{
            console.log("Fdffdfdfd")
            AsyncStorage.setItem("gender","female1")
            setedit(false)
            Toast.show({
                type:"success",
                text1:"Updated!",
                text2:"Avatar Updated Successfully"
            })
        }}>
        <Image source={require("../img/avatar/female1.png")} style={{backgroundColor:"orange",borderRadius:100,marginRight:20}}>

</Image>
            </TouchableOpacity>
       
            <TouchableOpacity onPress={()=>{
            console.log("Fdffdfdfd")
            AsyncStorage.setItem("gender","male1")
            setedit(false)
            Toast.show({
                type:"success",
                text1:"Updated!",
                text2:"Avatar Updated Successfully"
            })
        }}>
        <Image source={require("../img/avatar/male1.png")} style={{backgroundColor:"orange",borderRadius:100,marginRight:20}}>

</Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
            console.log("Fdffdfdfd")
            AsyncStorage.setItem("gender","female3")
            setedit(false)
            Toast.show({
                type:"success",
                text1:"Updated!",
                text2:"Avatar Updated Successfully"
            })
        }}>
        <Image source={require("../img/avatar/female3.png")} style={{backgroundColor:"orange",borderRadius:100,marginRight:20}}>

</Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
            console.log("Fdffdfdfd")
            AsyncStorage.setItem("gender","male2")
            setedit(false)
            Toast.show({
                type:"success",
                text1:"Updated!",
                text2:"Avatar Updated Successfully"
            })
            
        }}>
        <Image source={require("../img/avatar/male2.png")} style={{backgroundColor:"orange",borderRadius:100,marginRight:20}}>

</Image>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{
            console.log("Fdffdfdfd")
            AsyncStorage.setItem("gender","male3")
            setedit(false)
            Toast.show({
                type:"success",
                text1:"Updated!",
                text2:"Avatar Updated Successfully"
            })
        }}>
        <Image source={require("../img/avatar/male3.png")} style={{backgroundColor:"orange",borderRadius:100,marginRight:20}}>

</Image>
            </TouchableOpacity>
    </View>
    <View style = {{backgroundColor:darkTheme ? "#434861" : "#fff", padding:20, borderBottomLeftRadius:25, borderBottomRightRadius:25}}>
        <Text style = {{fontSize:20,color: darkTheme ? "#ccc" : "#444"}}>Edit name </Text>
        <TextInput onChangeText = {(event) => setNewName(event)} placeholder = {oldName} placeholderTextColor = {darkTheme ? "#ccc" : '#444'}   style = {{borderBottomWidth:2, borderColor:"#aaa", marginTop:25, color: darkTheme ? "#ccc" : "#444"}}></TextInput>
        <TouchableOpacity onPress = {() => {
            console.log(newName)
            AsyncStorage.setItem("username", newName)
            setedit(false)
            Toast.show({
                type:"success",
                text1:"Updated!",
                text2:"Name Updated Successfully"
            })
            }}>
            <Text style = {{color:"#0075ff", marginTop:20, fontSize:18}}>CHANGE</Text>
        </TouchableOpacity>
    </View>
</Modal>
            </ModalView>

<Toast ref={(ref) => Toast.setRef(ref)} />

        </View>
    )
}

const Container = styled.View`
    width:100%;
    flex: .9;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
   
`
const LinearView = styled.View`
    width: 100%;
   
    overflow: hidden;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
`

const ModalView = styled.View`
    background-color:coral;
    width:100%;
`

const HeaderText = styled.Text`
    font-size: 35px;
    font-weight: bold;
    margin:0px;
    includeFontPadding:false;
    color: #fff;
   
    
    
`
const ImageView = styled.View`
    background-color:coral;
    border-radius:50px;
`

const Header = styled.View`
    padding: 25px;
    padding-bottom: 35px;
    padding-top:55px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
`

const Card = styled.View`
     border-radius: 15px;
     padding-vertical:25px;
     padding-left:10px;
     padding-right:10px;
     display: flex;
     flex-direction: column;
     align-items: flex-start;
     width: 90%;
     margin-top: 30px;
     elevation:5;
     background-color: ${props => props.dark ? "#434861" : "#fff"};
`

const Head = styled.Text`
    color: #0075ff;
    margin-top: 15px;
    font-weight: bold;
    border-bottom-width: 2px;
    padding-bottom: 2px;
    border-color: #ccc;
   
    
`

const Item = styled.TouchableOpacity`
   
    padding-left: 8px;
    margin-top: 10px;
    display: flex;
    alignItems: center;
    flex-direction: row;
    justify-content: space-between;
`

const ItemText = styled.Text`
    font-size: 16px;
    color: ${props => props.dark ? "#fff" : "#000"};
`
const Chat = styled.TouchableOpacity`
    position: absolute;
    bottom: 5px;
    right: 25px;
    elevation:12;
`

const ChatImage = styled.Image`
   
` 

const ToggleButton = styled.View`
    height:20px;
    width:45px;
    border-radius:25px

    background-color:white;
    border-width:1px;
    border-color:#ccc;
    padding:3px;
    flex-direction:row;
    align-items:center;
    justify-content: space-between;
    position:relative;

`

const Round = styled(Animated.View)`
    width:14px;
    height:14px;
    border-radius:14px;
    background-color:gray;
    position:absolute;
    top:2;
    left:3;
`