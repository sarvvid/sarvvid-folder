import React from "react";
import styled from 'styled-components';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Footer from '../components/footer';
import back from '../img/back.png';


export default function Referral({navigation}) {
    return (
        <View style = {{flex: 1}}>
        <Container >
        <Header>
                    <BackButton onPress = {() => navigation.pop()}>
                        <Image source = {back}/>
                    </BackButton>
                    <HeaderText>Steps to get Free Bitcoin👋</HeaderText>
                </Header>
                <View>
                    <Para>Step 1:- Copy your peer id from Accounts Section.</Para>
                    <Para>Step 2:- Mail your peer id to referral@sarvvid-ai.com.</Para>
                    <Para>Step 3:- Subject of your mail should be your peer id.</Para>
                    <Para>Step 4:- Congrats 🎉 now you will get mail from our company on how to redeem Bitcoin.</Para>
                    
                </View>
        </Container>
        </View>
    )
}

const Container = styled.View`
    width:100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
   
`

const BackButton = styled.TouchableOpacity`
    
`

const Header = styled.View`
    width: 100%;
    
    padding: 35px;
    padding-top: 55px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`

const HeaderText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    margin-left: 25px;
    color:black;
        
`

const Para = styled.Text`
    margin-top:10px;
    font-size: 16px;
    padding-horizontal:10px;
    padding-vertical:10px;
`