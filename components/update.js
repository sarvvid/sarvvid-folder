import React,{useState, useEffect} from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    Dimensions,
    StyleSheet,
    StatusBar,
    Image,
    ImageBackground
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import updateGif from '../img/update2.gif';


const Update = ({navigation}) => {

    return (
      <View style={{flex:1,backgroundColor:'white'}}>
     <StatusBar backgroundColor='#00b3ff' barStyle="light-content" translucent={true}/>

       <View style={styles.header}>

       <Image
         source={updateGif}
         style={{top:10,height:Dimensions.get("screen").height/1.9,width:Dimensions.get("screen").width+40}}/>     
           
        
    
 <View>
 <Animatable.Text style={{ fontFamily:'Orbitron-Black',fontSize:20,top:30,textAlign:'center'}} animation="pulse" iterationCount={'infinite'} direction="alternate">Checking for Updates</Animatable.Text>

 <Animatable.View
 animation="fadeInUpBig"
   delay={3000} >
<Text style={{ top:90,fontFamily:'Orbitron-Black', fontSize:12,textAlign:'center',color:'black' }}>
Update Available : Version X.XX
 </Text>
 <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}

                >
                <LinearGradient
                    colors={['#05e395', '#00b3ff']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Click Here to Update</Text>
                </LinearGradient>
                </TouchableOpacity> 
                

            </View>
 </Animatable.View>
 </View>
           </View>
           
      </View>
    
    );
};

export default Update;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.14;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: '#00b3ff'
  },
  header: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'center'
  },
  footer: {
      backgroundColor: 'white',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      height:290,
      width:410,
      top:30
  },
  logo: {
      top:-20,
      width: (height_logo*1.7)*1.3,
     // left:-120,
      height: height_logo*1.0
  },
  title: {
      color: 'white',
      fontSize: 20,
      top:-100,
      fontFamily:"Orbitron-SemiBold",
      textAlign:'center',
  },
  text: {
      color: 'white',
      textAlign:'center',
      fontSize:15,
      fontFamily: 'sans-serif-thin',
      top:-135
      },
  button: {
      alignItems: 'center',
      height:100,
      top:140
      
  },
  signFooter: {
    width: 350,
    height: 180,
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    marginTop:-180
},
signFooterSub: {
    width: 350,
    height: 180,
    textAlign:'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
    marginTop:-120
},
  signIn: {
      width: 200,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 7,
      flexDirection: 'row',
      marginTop:-30,
      elevation:80
  },
  textSign: {
      color: 'white',
fontFamily:'Orbitron-Medium'
    }
});
