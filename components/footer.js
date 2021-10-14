import React, {useState, useEffect} from "react";
import styled from 'styled-components';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import home from '../img/home.png';
import files from '../img/files.png';
import acc from '../img/acc.png';
import settings from '../img/settings.png'
import LinearGradient from 'react-native-linear-gradient';
import { useTheme} from '../contexts/themeContext';

export default function Footer({navigation}) {

    const darkTheme = useTheme();

    function background() {
        return darkTheme ? ['#2c8378','#35448f' ] : [  '#78efe1','#3755f9'] ;
    }

    return (
        <FooterContainer>
            <FooterView >
            <LinearGradient start = {{x:0, y:0}} end = {{x:1, y:1}} colors={background()} style = {{height:250,}} >
                <MainFooter>
                    <Item onPress = {() => navigation.navigate("Home")}>
                        <Image source = {home}/>
                        <FooterText>Home</FooterText>
                    </Item>
                    <Item onPress = {() => navigation.navigate("FileManager")} >
                        <Image source = {files}/>
                        <FooterText>Files</FooterText>
                    </Item>
                    <Item onPress = {() => navigation.navigate("Account")}>
                        <Image source = {acc}/>
                        <FooterText>Account</FooterText>
                    </Item>
                    <Item onPress = {() => navigation.navigate("Settings")}>
                        <Image source = {settings}/>
                        <FooterText>Settings</FooterText>
                    </Item>
                </MainFooter>
            </LinearGradient>
            </FooterView>
        </FooterContainer>
    )
}

const FooterContainer = styled.View`
     position: absolute;
    flex:0.1;
    left: 0px;
    right: 0px;
    bottom: 0px;
   
    flex-direction:row;
    height:55px;
    align-items:center;
    overflow: hidden;
`

const FooterView = styled.View`
    width: 100%;
    height: 100%;
    
    overflow: hidden;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
`

const Item = styled.TouchableOpacity`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const MainFooter = styled.View`
    margin-top: 10px;
    padding-right: 15px;
    padding-left: 15px;
    
    flex-direction: row;
    display: flex;
    align-items: center;
    justify-content: space-between;

`

const FooterText = styled.Text`
    font-size: 12px;
    color: #fff;
`