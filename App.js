import Navigator from './routes/stack'
import Homestack from './routes/homesatck'
import React, {useEffect, useState} from "react";
import {View, ActivityIndicator, Image} from 'react-native';
import Home from './screens/home'
import Update from './components/update';
import { AuthContext } from './components/context';
import Loading from 'react-native-dynamic-text-loading';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotification from "react-native-push-notification";
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { Notifications,PermissionsAndroid } from "react-native";
import PushController from './PushController';
import { ThemeProvider } from './contexts/themeContext';
import { useNetInfo } from '@react-native-community/netinfo';
import acc from './img/acc.png';
import { StatusBar } from 'react-native';


export default function App() {


  const netinfo = useNetInfo();
  const [isLoading, setIsLoading] = useState(true);
  const [upd,setupd] = useState(false);
  const [userToken, setUserToken] = useState(null); 
  const [isConnected,setisConnected] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [showalert,setshow] = useState(false);

  const initialLoginState = {
    isLoading: true,
    userName: null,
    userToken: null,
  };

  const loginReducer = (prevState, action) => {
    switch( action.type ) {
      case 'RETRIEVE_TOKEN': 
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT': 
        return {
          ...prevState,
          userName: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER': 
        return {
          ...prevState,
          userName: action.id,
          userToken: action.token,
          isLoading: false,
        };
    }
  };

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({
    signIn: async(foundUser) => {
      // setUserToken('token123');
      // setIsLoading(false);
      console.log(foundUser)
      const userToken = String(foundUser[0].userToken);
      const userName = foundUser[0].username;
      
      try {
        await AsyncStorage.setItem('userToken', userToken);
      } catch(e) {
        console.log(e);
      }
      console.log('user token: ', userToken);
      dispatch({ type: 'LOGIN', id: userName, token: userToken });
    },
    signOut: async() => {
      // setUserToken(null);
      setIsLoading(false);
      // try {
      //   await AsyncStorage.removeItem('userToken');
      // } catch(e) {
      //   console.log(e);
      // }
      dispatch({ type: 'LOGOUT' });
    },
    signUp: () => {
      // setUserToken('fgkj');
      // setIsLoading(false);
    },
    toggleTheme: () => {
      setIsDarkTheme( isDarkTheme => !isDarkTheme );
    }
  }), []);

  useEffect(() => {
    
    // registerForPushNotifications();
    // StatusBar.setHidden(true);
    (async() => {
      setTimeout(async() => {
        setIsLoading(false);
         
        let userToken;
        userToken = null;
        try {
          userToken = await AsyncStorage.getItem('userToken');
        } catch(e) {
          console.log(e);
        }
        console.log('user token: ', userToken);
        dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
      }, 1000);
    })();
  }, []);

  if( loginState.isLoading ) {
    return(
      <View style={{flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00b3ff'}}>
        <Image
        source={acc}
        style={{width: '90%', resizeMode: 'contain'}}
      />
      </View>
    );
  }

  return (
    <ThemeProvider>

    {upd ? <Update/> : 
    <AuthContext.Provider value = {authContext}>
      <NavigationContainer>
      { loginState.userToken !== null ? <Homestack/> :
      <Navigator/> }
      </NavigationContainer>
      {netinfo.isConnected.toString() ? null: <Loading list = {[
       "Searching for Internet Connection..",
     ]}/> }
     
    </AuthContext.Provider>
      }
    <PushController/>
      </ThemeProvider>    
  );
}