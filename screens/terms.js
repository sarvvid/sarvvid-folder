import React from "react";
import styled from 'styled-components';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Footer from '../components/footer';
import back from '../img/back.png';


export default function Terms({navigation}) {
    return (
        <View style = {{flex: 1}}>
        <Container >
        <Header>
                    <BackButton onPress = {() => navigation.pop()}>
                        <Image source = {back}/>
                    </BackButton>
                    <HeaderText>Terms and condition</HeaderText>
                </Header>
                <View>
                    <Para>abc shd shj sdxw dw dw dsa dkbd ad edfhed abc shd shj sdxw dw dw dsa dkbd ad edfhed  abc shd shj sdxw dw dw dsa dkbd ad edfhed </Para>
                    <Para>abc shd shj sdxw dw dw dsa dkbd ad edfhed abc shd shj sdxw dw dw dsa dkbd ad edfhed  abc shd shj sdxw dw dw dsa dkbd ad edfhed </Para>
                    <Para>abc shd shj sdxw dw dw dsa dkbd ad edfhed abc shd shj sdxw dw dw dsa dkbd ad edfhed  abc shd shj sdxw dw dw dsa dkbd ad edfhed </Para>
                    <Para>abc shd shj sdxw dw dw dsa dkbd ad edfhed abc shd shj sdxw dw dw dsa dkbd ad edfhed  abc shd shj sdxw dw dw dsa dkbd ad edfhed </Para>
                </View>
        </Container>
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
    color:black;
        
`

const Para = styled.Text`
    margin-top:10px;
    padding-horizontal:10px
`