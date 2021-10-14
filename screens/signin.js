import React, { useState, useEffect } from "react";
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
    Animated, Easing
   
} from 'react-native';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import LinearGradient from 'react-native-linear-gradient';
import Loader from './loader';
import loading12 from '../img/loading1.gif'

import AsyncStorage from "@react-native-community/async-storage";
//import RNFetchBlob from 'rn-fetch-blob';
import { AuthContext } from '../components/context';
//import { useTheme } from 'react-navigation';

import styled from 'styled-components'
import { useTheme } from '../contexts/themeContext';
import axios from 'axios';
import { set } from 'react-native-reanimated';

// const deviceheight =  Dimensions.get("screen").height;
// const devicewidth =  Dimensions.get("screen").width;
// const image = { uri: "https://media.giphy.com/media/3o752oeUYz6S2SHi5W/giphy.gif" };

export default function SignIn({navigation}) {
    const darkTheme = useTheme();

    const border = useState(new Animated.Value(0))[0];
    const valueY = useState(new Animated.Value(250))[0];
    const linearHeight = useState( new Animated.Value( Dimensions.get('window').height))[0];
   

    // const newLinearHeight = linearHeight;
    // console.log(newLinearHeight);
    //console.log(typeof(Number(linearHeight)))
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
            easing:Easing.elastic(2),
            useNativeDriver:true
        }).start()
        Animated.timing(linearHeight, {
            toValue:350,
            duration:1000,
            delay:500,
            useNativeDriver:false
        }).start()
    })

    function background() {
        return darkTheme ? ['#2c8378','#35448f' ] : [  '#78efe1','#3755f9'] ;
    }

    const { colors } = useTheme();
    const [id,setid] = React.useState(null);
    const [loading,setloading] = React.useState(false);
    const [avatar_uri,seturi] = React.useState(require("../img/account.png"));
    const { signIn } = React.useContext(AuthContext);
    const userToken = getUniqueId();
  

    return(
        
        <ScrollView style = {{flex:1, backgroundColor: darkTheme ? "#434861" : "#fff"}} showsVerticalScrollIndicator = {false}>
           
        <LinearView >
          <LinearGradient start = {{x:0, y:0}} end = {{x:1, y:1}} colors={background()} style = {{height: "120%"}} >
                  
          <ContainerView style = {{height: linearHeight}}>
                <Header>
                    <HeaderText dark = {darkTheme}>Welcome Again</HeaderText>
                    <NormalText>We missed you so much</NormalText>
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
            <MainView style = {[{borderRadius: border, backgroundColor : darkTheme ? "#434861" : "#fff"}, {transform: [{translateY:valueY}]}]}>
            <View style = {{paddingVertical:50, paddingHorizontal:20,}}>
            <Text style = {{color:"#0075ff", fontSize:16}}>New to Sarvvid. <TextButton onPress = {() => navigation.navigate("Signup")}><HighlightedText style = {{fontSize:16}}>Sign Up</HighlightedText></TextButton></Text>
         
            <View style = {{width:"100%", alignItems: "center", justifyContent: "center"}}>
            <Button onPress = {async() =>{
                setloading(true)
                const id = await AsyncStorage.getItem("userToken")
                const userName = await AsyncStorage.getItem("username")
                if(id && userName){
                    const foundUser = [{
                        id : id,
                        username : userName,
                        password : "sdfds",
                        userToken : id
                    }];
                    setloading(false)
                     signIn(foundUser)
                }
                 else{
                     alert("Please Sign in First")
                     navigation.navigate("Signup")
                 }

            }}>
                <ButtonText>Sign in</ButtonText>
            </Button>
            </View>
            </View>
          </MainView>
}
                
            </LinearGradient>
          </LinearView>
         
           
           
            {/* <Container dark = {darkTheme}>
            <ContainerView>
                <Header>
                    <HeaderText dark = {darkTheme}>Welcome Again</HeaderText>
                    <NormalText>We missed you so much</NormalText>
                </Header>
                
            </ContainerView>
            <Main dark = {darkTheme}>
                <Input>
                    <NormalText>User name/Phone number</NormalText>
                    <StyledTextInput placeholder = "name/number"/>
                </Input>     
                <Input>
                    <NormalText>Password</NormalText>
                    <StyledTextInput placeholder = "password"/>
                </Input>     
                <ForgotText>Forgot password</ForgotText>
            </Main>
            <Button onPress = {() => navigation.navigate("Home")}>
                <ButtonText>Sign in</ButtonText>
            </Button>
            <NormalText>New to Sarvvid. <TextButton onPress = {() => navigation.navigate("Signup")}><HighlightedText>Sign Up</HighlightedText></TextButton></NormalText>
        </Container> */}
        </ScrollView>
    )
}

const Container = styled.View`
   
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.dark ? "#292929" : "#fff"};
    flex:1;
    
`
const ContainerView = styled(Animated.View)`
    width:95%;
    height:100%;
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
`
const MainView = styled(Animated.View)`
    flex: 1.5;
    background-color: #fff;
   elevation:1;
    bottom: 50px;
    
`

const ForgotText = styled.Text`
    color: #0075ff;
    margin-bottom: 10px;
    margin-top: 30px;
    opacity: .8;
    includeFontPadding:false;
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
   padding-vertical:10px;
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