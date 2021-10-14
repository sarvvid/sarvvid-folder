import React, {useState} from "react";
import styled from 'styled-components';
import {View, Text, Image, TouchableOpacity, Animated} from 'react-native';
import down from '../img/down.png';

export default function FaqItem({item}) {

    const valueY = useState(new Animated.Value(0))[0];
   
    const [faqOpen,setFaqOpen] = useState(false);
    const [spin, setSpin] = useState("0deg");

        


    const openAnswer = () => {
        if(faqOpen){
            Animated.timing(valueY, {
                toValue:0,
                duration:300,
                useNativeDriver:true
            }).start();
            setFaqOpen(!faqOpen);
            setSpin("0deg")
        } else {
            Animated.timing(valueY, {
                toValue:1,
                duration:300,
                useNativeDriver:true
            }).start();
            setFaqOpen(!faqOpen);
            setSpin("180deg")
        }  
    }

    

    return(
        <View>
            <Main>
                <Question onPress = {() => openAnswer()}><Text style = {{fontSize:16, fontWeight:"bold"}}>{item.question}</Text><Image  style = {[{marginRight:10}, {transform : [{rotate:spin}]}]} source = {down}/></Question>
                {faqOpen && <Answer style = {[ {transform: [{scaleY: valueY}]}]}><Text style = {{fontSize:15}}>{item.answer}</Text></Answer>}
            </Main>
        </View>
    )
}


const Main = styled.View`
    width:95%;
    margin:auto;
`
const Question = styled.TouchableOpacity`
    width:100%;
    padding:10px;
    background-color:#c1ddf2;
    border-radius:10px;
    margin-vertical:10px;
    flex-direction:row;
    justify-content:space-between;

`
const Answer = styled(Animated.View)`
width:100%;
padding:10px;
background-color:#c1ddf2;
border-radius:10px;
`