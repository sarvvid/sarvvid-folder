import React from "react";
import styled from 'styled-components';
import {View, Text, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native';
import Footer from '../components/footer';
import back from '../img/back.png';
import down from '../img/down.png';
import FaqItem from '../components/faqItem';

export default function Faq({navigation}) {

    const faqData = [
        {
            question: "this is question1?",
            answer: "this is answer1 sdg ad w efdhve4f jahvd jahveduyv xcajhdv adjad asshdgf qajsx ajdva jvc nvjuvcxajvdg ajvduqgd ayasd hvwhg",
            key:"1"
        },
        {
            question: "this is question2?",
            answer: "this is answer2 sdg ad w efdhve4f jahvd jahveduyv xcajhdv adjad asshdgf qajsx ajdva jvc nvjuvcxajvdg ajvduqgd ayasd hvwhg",
            key:"2"
        },
        {
            question: "this is question3?",
            answer: "this is answer3 sdg ad w efdhve4f jahvd jahveduyv xcajhdv adjad asshdgf qajsx ajdva jvc nvjuvcxajvdg ajvduqgd ayasd hvwhg",
            key:"3"
        },
        {
            question: "this is question4?",
            answer: "this is answer4 sdg ad w efdhve4f jahvd jahveduyv xcajhdv adjad asshdgf qajsx ajdva jvc nvjuvcxajvdg ajvduqgd ayasd hvwhg",
            key:"4"
        },
        {
            question: "this is question5?",
            answer: "this is answer5 sdg ad w efdhve4f jahvd jahveduyv xcajhdv adjad asshdgf qajsx ajdva jvc nvjuvcxajvdg ajvduqgd ayasd hvwhg",
            key:"5"
        },
        {
            question: "this is question6?",
            answer: "this is answer6 sdg ad w efdhve4f jahvd jahveduyv xcajhdv adjad asshdgf qajsx ajdva jvc nvjuvcxajvdg ajvduqgd ayasd hvwhg",
            key:"6"
        },

    ]

    return (
        <View style = {{flex:1}}>
           <Container>
            <Header>
                        <BackButton onPress = {() => navigation.pop()}>
                            <Image source = {back}/>
                        </BackButton>
                        <HeaderText>Frequently asked questions</HeaderText>
            </Header>

            <View style = {{width:"100%"}}>
                <FlatList
                    data = {faqData}
                    renderItem = {({item}) => 
                        <FaqItem item = {item}/>
                }
                />
                <View style = {{width: "95%", margin:10}}>
                    <Section onPress = {() => navigation.navigate("ChatIntro")}>
                        <Text style = {{fontSize:16, fontWeight:"bold"}}>Didn't find the answer</Text>
                        <Image source = {down} style = {[{transform : [{rotate:"270deg"}]}]}/>
                    </Section>
                </View>
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
    padding-bottom:95px
   
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

const Main = styled.View`
    width:95%;
    margin:auto;
`
const Question = styled.TouchableOpacity`
    padding:10px;
    background-color:#c1ddf2;
    border-radius:10px;
    margin-vertical:10px;
    flex-direction:row;
    justify-content:space-between;

`
const Answer = styled.View`
padding:10px;
background-color:#c1ddf2;
border-radius:10px;
`

const Section = styled.TouchableOpacity`
    
    
    width:100%;
    align-items:center;
    padding:10px;
    background-color:#c1ddf2;
    border-radius:10px;
    margin-vertical:10px;
    flex-direction:row;
    justify-content:space-between;
    border-width:2px;
    border-color:#0092ff;
    
`