import React from "react";
import styled from 'styled-components';
import {View, Text, Image, TouchableOpacity, TextInput} from 'react-native';
import Footer from '../components/footer';
//import { StackActions } from '@react-navigation/routers';
import back from '../img/back.png';
import send from '../img/send.png';

export default function Chat({navigation}) {

    return (
        <View style = {{flex:1}}>
            <Container>
                <Header>
                    <BackButton onPress = {() => navigation.pop()}>
                        <Image source = {back}/>
                    </BackButton>
                    <HeaderText>Support chat</HeaderText>
                </Header>

                <Input>
                    <TextInput style = {{width:"80%"}} placeholder = "send message" returnKeyLabel = "send"/>
                    <TouchableOpacity>
                        <Image source = {send}/>
                    </TouchableOpacity>
                </Input>
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
    
    padding: 25px;
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
    
`

const Input = styled.View`
 position: absolute;
 bottom: 5px;
 width: 90%;
 margin-bottom:15px ;
 border-radius: 25px;
 border-width: 2px;
 border-color: #0092ff;
 padding:10px;
 display: flex;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
`
