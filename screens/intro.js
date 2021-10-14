import React, { useState, useEffect } from "react";
import gif from '../img/screen3.gif';
import logo from '../img/logo.png';
import logo1 from '../img/logo1.png';
import styled from 'styled-components';
import { View, Text, Image, TouchableOpacity, Animated, Easing , StatusBar} from 'react-native';
import congrats from '../img/congrats.png';
import right from '../img/right.png';


export default function Intro({navigation}){

    const gifOpacity = useState(new Animated.Value(0))[0];
    const logoOpacity = useState(new Animated.Value(1))[0];
    const valueY = useState(new Animated.Value(150))[0];
    const scale = useState(new Animated.Value(1.5))[0];
    const gifScale = useState(new Animated.Value(.5))[0];
    const introScale = useState(new Animated.Value(1))[0];
    const buttonZ = useState(new Animated.Value(0));
    const rightX = useState(new Animated.Value(0))[0];
    const introOpacity = useState(new Animated.Value(1))[0];

    const [width, setWidth] = useState("100%");

    useEffect(() => {
        Animated.loop(Animated.timing(rightX, {
            toValue:10,
            duration:1000,
            easing:Easing.elastic(4),
            useNativeDriver:true,
        })).start()
            
        
    })

    function closeIntro() {
        Animated.timing(introScale, {
            toValue:5,
            duration:1000,
            
            useNativeDriver: true
        }).start();
        Animated.timing(introOpacity, {
            toValue:0,
            duration:1000,
            
            useNativeDriver: true
        }).start();
        // Animated.timing(introY, {
        //     toValue:1000,
        //     duration:1000,
        //     delay:1000,
        //     useNativeDriver:true,
        // })
        
        Animated.timing(valueY, {
            toValue: 0,
            duration: 1000,
            delay:1500,
            useNativeDriver: false
        }).start();
        Animated.timing(scale, {
            toValue: 1,
            duration: 1000,
            delay:1500,
            useNativeDriver: false
        }).start();
        Animated.timing(gifOpacity, {
            toValue:1,
            duration:1000,
            delay:2000,
            useNativeDriver: true
        }).start();
        Animated.timing(gifScale, {
            toValue:1,
            duration:1000,
            delay:2000,
            useNativeDriver: true
        }).start();
        // Animated.timing(buttonZ, {
        //     toValue:5,
        //     duration:0,
        //     delay:0,
        //     useNativeDriver: false
        // }).start();
        setTimeout(() => {
            setWidth('0');
        },1000);
    }


    return(
        <Container>
             <StatusBar barStyle='light-content'/>
            <ContainerView style = {{height:"60%"}}>
                <Logo style = {[{opacity: logoOpacity}, {transform: [{translateY: valueY}, {scale:scale}]}]} source = {logo}/>
                <StyledImage style = {[{opacity : gifOpacity}, {transform:[{scale:gifScale}]}]} source = {gif}/>
            </ContainerView>
            <ContainerView style = {{height:"40%"}}>
                <Details>
                    <NormalText>New to Sarvvid, create an account for free</NormalText>
                    <Button onPress = {() => navigation.navigate('Signup')}  >
                        <ButtonText >Get Started</ButtonText>
                    </Button>
                    <NormalText>Already have an user.</NormalText>
                    <Button onPress = {() => navigation.navigate('Signin')}>
                        <ButtonText>Sign In</ButtonText>
                    </Button>
                </Details>
            </ContainerView>
            <IntroView width = {width} style = {[{opacity:introOpacity},{transform: [{scale:introScale}]}]}>
                <Image style = {{marginBottom:40}} source = {logo1}/>
                <Image source = {congrats}/>
                <IntroHead>Well done</IntroHead>
                <IntroSub>You have taken one step forward to the future</IntroSub>
                <Button style = {{marginTop: 50, width:200}} onPress = {() => closeIntro()}>
                        <ButtonText style = {{fontSize:20 , fontWeight: "bold"}}>Continue</ButtonText>
                        <Animated.Image  style = {[{ marginLeft:15}, {transform: [{translateX: rightX}]}]} source = {right}/>
                </Button>
            </IntroView>
        </Container>
    )

} 

const Container = styled.View`
    width:100%;
    height: 100%;

    flex:1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #00B3fe;
`
const ContainerView = styled.View`
    width:95%;
    height:100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const Details = styled.View`
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`


const StyledImage = styled(Animated.Image)`
    width: 100%;
    height: 400px;
    
    resize-mode: contain;
`

const Button = styled.TouchableOpacity`
 
   width:150px;
    padding: 10px;
    border-radius: 25px;
    background: #1e75d8;
    color: white;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-direction: row;
   

`

const ButtonText = styled.Text`
    color: white;
    
`


const NormalText = styled.Text`
    color: #ffffff;
    font-size: 16px;
    margin-bottom: 10px;
    margin-top: 25px;
`

const Logo = styled(Animated.Image)`
    width: 150px;
    height: 150px;
    margin-top: 50px;
    resize-mode: contain;
`

const IntroView = styled(Animated.View)`
    background-color: #fff;
    position: absolute;
    top: 0;
    width: ${props => props.width ? props.width : "100%"};
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

   
    
   
`

const IntroHead = styled.Text`
    font-size: 30px;
    font-weight: bold;
    margin-top: 45px;
    margin-horizontal:25px;
`

const IntroSub = styled.Text`
    font-size: 18px;
    text-align: center;
    margin-top: 25px;
    margin-horizontal:25px;
`