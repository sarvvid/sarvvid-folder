import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createAppContainer } from 'react-navigation';

import Intro from '../screens/intro';
import SignIn from '../screens/signin';
import SignUp from '../screens/signup';
import Home from '../screens/home';
import FileManager from '../screens/filemanager';
import Settings from '../screens/settings';
import Account from '../screens/account';
import FileDetails from '../screens/filedetails';
import Chat from '../screens/chat';
import ChatIntro from '../screens/chatIntro';
import Scanner from '../screens/scanner';
import Faq from '../screens/faq';
import Terms from '../screens/terms';
 
const screens = {
   Intro:{
       screen: Intro,
       navigationOptions: {
        headerShown: false,
        headerMode: 'none',
        
    }
       
   },
   Signin: {
       screen: SignIn,
       navigationOptions: {
        headerShown: false,
    }
   },
   Signup: {
       screen: SignUp,
       navigationOptions: {
        headerShown: false,
    }
   },
   Home: {
       screen: Home,
       navigationOptions: {
           headerShown: false,
           headerMode: 'none',
 
       },

   },
   Filemanager: {
       screen: FileManager,
       navigationOptions: {
        headerShown: false,
    }
   },
   Settings: {
       screen: Settings,
       navigationOptions: {
        headerShown: false,
    }
   },
   Account: {
       screen: Account,
       navigationOptions: {
        headerShown: false,
    }
   },
   Filedetails : {
       screen: FileDetails,
       navigationOptions: {
        headerShown: false,
    }
   },
   ChatIntro : {
       screen: ChatIntro,
       navigationOptions: {
        headerShown: false,
    }
   },
   Chat : {
       screen: Chat,
       navigationOptions: {
        headerShown: false,
    }
   },
   Scanner : {
       screen: Scanner,
       navigationOptions: {
        headerShown: false,
    }
   },
   Terms : {
    screen: Terms,
    navigationOptions: {
     headerShown: false,
    }
    },
    Faq : {
        screen: Faq,
        navigationOptions: {
        headerShown: false,
    }
    },
}

const Stack = createStackNavigator();
const screenOptionStyle = {
	headerShown: false,
    headerMode: 'none'
};
const HomeStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name='Intro' component={Intro} />
			<Stack.Screen name='Signin' component={SignIn}/>
			<Stack.Screen name='Signup' component={SignUp}/>

        
		</Stack.Navigator>
	);
};
export default HomeStackNavigator;