import React, {Component} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createAppContainer, createStackNavigator, StackActions, NavigationActions, Image } from 'react-navigation'; 
import {ScannerScreen} from "./components/ScannerScreen.js";
import {InformationScreen} from "./components/InformationScreen.js";
import {HomeScreen} from "./components/HomeScreen.js";
import {LoginScreen} from "./components/LoginScreen.js";
import {RegisterScreen} from "./components/RegisterScreen.js";
import {ForgotPasswordScreen} from "./components/ForgotPasswordScreen.js";
import APIKeys from './constants/APIKeys';
import * as firebase from 'firebase';
import {YellowBox} from 'react-native';
console.disableYellowBox = true;

const AppNavigator = createAppContainer(createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Scanner: {
    screen: ScannerScreen,
  },
  Information: {
    screen: InformationScreen,
  }
}, {
    initialRouteName: 'Home',
}));

const AuthNavigator = createAppContainer(createStackNavigator({
  Login: {
    screen: LoginScreen,
  },
  Register: {
    screen: RegisterScreen, 
  },
  Forgot: {
    screen: ForgotPasswordScreen,
  }
}, {
    initialRouteName: 'Login',
}));

export default class App extends React.Component{
  constructor(props){
      super(props);
      this.state={
        isLoadingComplete:false,
        isAuthenticationReady:false,
        isAuthenticated:false
      };
      if(!firebase.apps.length){
        firebase.initializeApp(APIKeys.FirebaseConfig);
      }
      firebase.auth().onAuthStateChanged(this.onAuthStateChanged);
  }

  onAuthStateChanged = (user) =>{
    this.setState(() => ({isAuthenticationReady:true, isAuthenticated:!!user}), this.nextScreen);
  }

  render(){  
    if(!this.state.isLoadingComplete && !this.state.isAuthenticationReady){
      return(
        <View style={styles.splash}>
          <Text>App Loading</Text>
        </View>
      );
    } else {  
      return(<View style={styles.container}>
        {(this.state.isAuthenticated)? <AppNavigator/> : <AuthNavigator/>}
    </View>);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent : 'center',
    alignItems:'center',
    flexDirection:'row'
  },
  form:{
    flex:1
  },
  inputStyle:{
    borderColor:"black",
    borderStyle : "solid",
    borderWidth:5,
    marginBottom: 20
  },
  result:{
    marginTop:15,
    fontSize:20,
     textAlign:'center'
  },
  logo:{
    marginLeft:30,
    width:350,
    height:150,
  },
  splash:{
  flex:1,
  justifyContent:'center',
  textAlign:'center'
  
  }   
  
}); 