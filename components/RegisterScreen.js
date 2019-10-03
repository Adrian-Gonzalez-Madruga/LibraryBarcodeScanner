
import React, {Component} from 'react';
import {StyleSheet, Text, View,Button, Alert} from 'react-native';
import { createStackNavigator, createAppContainer } from "react-navigation";
import {TextBox} from './TextBox';
import * as firebase from 'firebase';

export class RegisterScreen extends React.Component{

    constructor(props){
        super(props);
        this.state={
            username:"",
            password:"",
            firstName:"",
            lastName:""
        };

        this.registerNewUser = this.registerNewUser.bind(this);
        this.insertNewUser = this.insertNewUser.bind(this);
        
    }
    static navigationOptions={
        title:'Register',
        headerRight:<View/>
    }

    insertNewUser(uID,fName,lName,email){
        firebase.database().ref('users/'+uID).set({firstName:fName,lastName:lName,username:email}).then(
            ()=>{},
            (error)=>{Alert.alert(error.message);
        });
    }

    registerNewUser(){
        firebase.auth().createUserWithEmailAndPassword(this.state.username,this.state.password)
        .then(data=>{
            //When successfull save data to firebase realtime database
            this.insertNewUser(data.user.uid,this.state.firstName,this.state.lastName,this.state.username);
            Alert.alert("Success, lets sign you in! ");
            

        },(error)=>{
            Alert.alert(error.message);
        });
    }

    render(){  
    //Retrieve Variables from login screen
    const {navigation} = this.props;
    let  _username = navigation.getParam('username');
    const _password = navigation.getParam('password');

        return(
            <View style={styles.container}>
            <View style={styles.title}>
                <Text styles={styles.welcome}>
                    Welcome! Provide your..
                </Text>

            </View>

            <View style={styles.form}>
                <TextBox defaultValue={_username} placeholder={"eg name@domain.com"} onChangeText={(input)=>{this.setState({username:input})}}> Email </TextBox>
                <TextBox placeholder={"eg. John"} onChangeText={(input)=>{this.setState({firstName:input})}}> First Name </TextBox>
                <TextBox placeholder={"eg. Doe"} onChangeText={(input)=>{this.setState({lastName:input})}}> Last Name </TextBox>
                <TextBox defaultValue={_password} onChangeText={(input)=>{this.setState({password:input})}} secureTextEntry > Password </TextBox>
            </View>

            <View style={styles.navigation}>
                <Button title="Register New User" onPress={()=> this.registerNewUser()}/>
                <Button title="Go Back" onPress={()=> this.props.navigation.goBack()}/>
                </View>
            </View>
        );
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        padding:20,
        justifyContent : 'center',
        alignContent:'center'
    },
    title:{
        fontSize:20,
        textAlign:'center',
        alignItems:"center",
    },
    form:{
        alignItems:'stretch'
    },
    navigation:{
        flexDirection:'row',
      justifyContent:'space-around',
      marginTop:20,
      alignContent:'center'

    },
});
