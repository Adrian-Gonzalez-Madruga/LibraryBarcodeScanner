
import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, Alert, Image} from 'react-native';
import {TextBox} from './TextBox';
import * as firebase from 'firebase';

export class ForgotPasswordScreen extends React.Component{

    constructor(props){
        super(props);
        this.state={username: ""};
        this.userForgotPasswordClick = this.userForgotPasswordClick.bind(this);
    }

    static navigationOptions={
        title:'Forgot Password',
        headerRight:<View/>
    }

    userForgotPasswordClick(){
        firebase.auth().sendPasswordResetEmail(this.state.username).then(()=> {
            Alert.alert("Reset link successfully sent.");
            this.props.navigation.goBack();
        },(error)=>{Alert.alert(error.message)});
    }

    render(){    
        //Retrieve Variables from login screen
        const {navigation} = this.props;
        const _username = JSON.stringify(navigation.getParam('username'));
        return(
            <View style={styles.container}>  
                <Image
                style={styles.logo}
                source={{uri: 'http://www.syromalabarcatechesis.org/files/media/uploadimages/1424934251books%20songs%20.png'}}
                />
                <TextBox  style={styles.border}placeholder={"eg name@domain.com"} onChangeText={(input)=>{this.setState({username:input})}}> Email </TextBox>
                <Button style={styles.button} title={"Back to Login"} onPress={() => {this.userForgotPasswordClick()}}/>
            </View>
         );
    }
}

const styles= StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        padding:20,
        alignItems:'center',
        alignContent:'stretch',
        fontSize:20,
        backgroundColor:"#eee"
    },
    logo:{
        margin:5,
        width:350,
        height:150,
    },
    button:{
        flex:1
    },
    title:{
        fontSize:20
    },
    border:{
        borderWidth:1,
        
    }
});