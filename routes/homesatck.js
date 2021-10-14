// import React from "react";


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
import Referral from '../screens/Referral'
import { useTheme } from '../contexts/themeContext';
// const screens = {
//    Intro:{
//        screen: Intro,
//        navigationOptions: {
//         headerShown: false,
//         headerMode: 'none'
//     }
       
//    },
//    Signin: {
//        screen: SignIn,
//        navigationOptions: {
//         headerShown: false,
//     }
//    },
//    Signup: {
//        screen: SignUp,
//        navigationOptions: {
//         headerShown: false,
//     }
//    },
//    Home: {
//        screen: Home,
//        navigationOptions: {
//            headerShown: false,
//        }
//    },
//    Filemanager: {
//        screen: FileManager,
//        navigationOptions: {
//         headerShown: false,
//     }
//    },
//    Settings: {
//        screen: Settings,
//        navigationOptions: {
//         headerShown: false,
//     }
//    },
//    Account: {
//        screen: Account,
//        navigationOptions: {
//         headerShown: false,
//     }
//    },
//    Filedetails : {
//        screen: FileDetails,
//        navigationOptions: {
//         headerShown: false,
//     }
//    },
//    ChatIntro : {
//        screen: ChatIntro,
//        navigationOptions: {
//         headerShown: false,
//     }
//    },
//    Chat : {
//        screen: Chat,
//        navigationOptions: {
//         headerShown: false,
//     }
//    },
//    Scanner : {
//        screen: Scanner,
//        navigationOptions: {
//         headerShown: false,
//     }
//    },
// }








import React from 'react'
import { Text, TouchableOpacity, Image } from 'react-native'
import { AnimatedTabBarNavigator } from 'react-native-animated-nav-tab-bar'
import Icon from 'react-native-vector-icons/Feather'

import { createStackNavigator } from "@react-navigation/stack";

import styled from 'styled-components/native'
// import FileManager from '../screens/filemanager'

const Tab = AnimatedTabBarNavigator()





const TabBarIcon = props => {
	return (
		<Icon
			name={props.name}
			size={props.size ? props.size : 24}
			color={props.tintColor}
		/>
	)
}



 const Bottomnavigator = () => {
	const darkTheme = useTheme();
     return(
        <Tab.Navigator 
		
		tabBarOptions = {{
			activeTintColor:"#333",
			inactiveTintColor:darkTheme ? "#ccc" : "#000",
			tabStyle:{
				backgroundColor:darkTheme ? "#555" : "#fff"
			}
		}}
          initialRouteName="Home">
		<Tab.Screen
			name="Home"
			component={Home}
			options={{
				tabBarIcon: ({ focused, color }) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="home"
						
					/>
				),
			}}
		/>
		<Tab.Screen
			name="FileManager"
			component={FileManager}
			options={{
				tabBarIcon: ({ focused, color, size }) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="file"
					/>
				),
			}}
		/>
		<Tab.Screen
			name="Account"
			component={Account}
			options={{
				tabBarIcon: ({ focused, color }) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="user"
					/>
				),
			}}
		/>
		<Tab.Screen
			name="Settings"
			component={Settings}
			options={{
				tabBarIcon: ({ focused, color }) => (
					<TabBarIcon
						focused={focused}
						tintColor={color}
						name="settings"
					/>
				),
			}}
		/>
	</Tab.Navigator>
     )
 }

 const Stack = createStackNavigator();
const screenOptionStyle = {
	headerShown: false,

};
const HomeStackNavigator = () => {
	return (
		<Stack.Navigator screenOptions={screenOptionStyle}>
			<Stack.Screen name='Home' component={Bottomnavigator}/>
			<Stack.Screen name='Filedetails' component={FileDetails}/>
			<Stack.Screen name='ChatIntro' component={ChatIntro}/>
			<Stack.Screen name='Chat' component={Chat}/>
			<Stack.Screen name='Scanner' component={Scanner}/>
			<Stack.Screen name='Faq' component={Faq}/>
			<Stack.Screen name='Terms' component={Terms}/>
            <Stack.Screen name='Referral' component={Referral}/>
		</Stack.Navigator>
	);
};
export default HomeStackNavigator;
