import React, { Component } from "react";

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-community/async-storage';

class ScanScreen extends Component {
  constructor(props){
    super(props)
  }
  onSuccess = async(e) => {
    const au = await AsyncStorage.getItem("authtoken");
    const IMEI = await AsyncStorage.getItem("userToken");
    console.log(e.data)
    fetch(`http://103.155.73.35/barcodeapp/?barcodehash=${e.data}&IMEI=${IMEI}&authtoken=${au}`,{
      method : 'post',
      headers : {
        'Content-type' : 'multipart/form-data'
      }
    }).then(res=>{
      res.json().then(resp=>{
        if(resp.success){
          alert("Login succesfull it will take few minutes to redirect.")
          this.props.navigation.navigate("Home")
        }
        else{
          alert("Please refresh your SarvvidWeb page in browser and try again");
        }

      })
      
    })
  };

  render() {
    return (
      <QRCodeScanner
        onRead={this.onSuccess}
        flashMode={RNCamera.Constants.FlashMode.off}
        topContent={
          <Text style={styles.centerText}>
            Go to{' '}
            <Text style={styles.textBold}>sarvvidweb</Text> on
            your computer and scan the QR code.
          </Text>
        }
        bottomContent={
          <TouchableOpacity style={styles.buttonTouchable}>
            <Text style={styles.buttonText}>OK. Got it!</Text>
          </TouchableOpacity>
        }
      />
    );
  }
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});
export default ScanScreen;