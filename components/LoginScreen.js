
import React, {Component} from 'react';
import {StyleSheet, Text, View, Image, TextInput, Button,Alert} from 'react-native';
import {TextBox} from './TextBox';
import * as firebase from 'firebase';

export class LoginScreen extends React.Component{

  constructor(props){
    super(props);
    this.state={
      username:"",
      password:"",
      value:"",
      colorUsername:"",
      colorPassword:"",
      authenticating:false,
      empty:"",
    }; 
    this.userLoginClick = this.userLoginClick.bind(this);
  }

  static navigationOptions={title:'Login'}
    
userLoginClick(){
   firebase.auth().signInWithEmailAndPassword(this.state.username,this.state.password).then(()=>{},(error)=>{Alert.alert(error.message);});
}

render() {
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{uri: 'http://www.syromalabarcatechesis.org/files/media/uploadimages/1424934251books%20songs%20.png'}}
      />
      <View style={styles.form}>
      <View style={styles.input}>
      <TextBox placeholder="Enter your Email" onChangeText={text =>this.setState({username:text})} value={this.state.username}>
        Email
      </TextBox>
      </View>
      <View style={styles.input}>
      <TextBox placeholder="Enter your Password" secureTextEntry onChangeText={text =>this.setState({password:text})} value={this.state.password}>
        Password
      </TextBox>
      </View>
    <Button
      title={"Login"} 
      onPress = {this.userLoginClick}/>

      <View style={styles.navigation}>
        <Button
            title={"Register Here"} 
            onPress = {()=> this.props.navigation.navigate('Register', {username:this.state.username, password:this.state.password})}/>
        <Button title={"Forgot Password"} onPress = {()=> this.props.navigation.navigate('Forgot',{username:this.state.username})}/>
      </View>
      
      <Text style={styles.result}>{this.state.value}</Text>
      </View>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent : 'center',
    flexDirection:"column",
    alignItems:'stretch',
    backgroundColor:'#eee'
  },
  logo:{
    marginLeft:30,
    width:350,
    height:150,
  },
  form:{
    flex:1,
    margin:20,
  },
  input:{
    borderWidth:2,
    borderRadius:10,
    marginBottom:10,
  },
  navigation:{
      flexDirection:'row',
      justifyContent:'space-between',
      marginTop:20
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
});
