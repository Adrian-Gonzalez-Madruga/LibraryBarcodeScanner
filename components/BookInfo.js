import React from 'react';
import {ScrollView, View, Text, Button, Image, StyleSheet} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import * as firebase from 'firebase'; 

export class InformationScreen extends React.Component {
    constructor() {
        super();
        this.state = {mainText: "Loading...", subText: "", imageSrc: "https://ak6.picdn.net/shutterstock/videos/7512106/thumb/1.jpg", btnTitle: "Waiting", errors: "\n"};
        this.goHome = this.goHome.bind(this);
        this.stock = 0;
        this.counter = 0;
        this.isChecked = false;
    }

    componentDidMount() {
        fetch('https://barcode-6ceab.firebaseio.com/Books/' + this.props.navigation.getParam("key", 0) + '.json')
            .then((response) => response.json())
            .then((responseJson) => {
            if(responseJson === null) {
                this.setState({btnTitle: "Home", btnFunc: this.goHome, mainText: "\nCould not Access Book", subText: "\nScan Again or Bring to Librarian", errors: "Book Not Found\n", imageSrc: "https://banner2.kisspng.com/20180402/kzw/kisspng-red-x-letter-computer-icons-red-x-5ac2fb7587dc52.5179004815227277975565.jpg"});
            } else {
                this.stock = responseJson.Stock;
                this.setState((prevState) => ({btnTitle: "Home", btnFunc: this.goHome, mainText: responseJson.Name, subText: ("\nAuthor:\n " + responseJson.Author + "\n\nISBN:\n " + responseJson.ISBN + "\n\nPublisher:\n " + responseJson.Publisher + "\n\nReturn Date:\n" + this.props.navigation.getParam("date", "now")), imageSrc: responseJson.Image}));
            }
            this.timeCounter();
        }).catch((error) => {
            this.setState({btnTitle: "Home", btnFunc: this.goHome, mainText: "Could Not Connect", subText: "Please Connect To Wifi", imageSrc: "https://banner2.kisspng.com/20180402/kzw/kisspng-red-x-letter-computer-icons-red-x-5ac2fb7587dc52.5179004815227277975565.jpg"});
        });
    }

    goHome() {
        this.props.navigation.dispatch(StackActions.reset({index: 0,actions: [NavigationActions.navigate({ routeName: 'Home' })],}));
    }

    static navigationOptions = ({ navigation }) => {
        return {
          headerTitle: "View",
          headerRight: (
            <View style={{margin: 10}}>
              <Button
                onPress={() => {firebase.auth().signOut();}}
                title="Logout"
              />
            </View>
          ),
        };
      };

    render() {
      return (
        <ScrollView style={styles.scroll} keyboardDismissMode='on-drag'>
            <View style={styles.container}>
            <Text style={styles.introText}>{this.state.mainText}</Text>
            <Image style={{width: 175, height: 300}} source={{uri: this.state.imageSrc}}/>
            <Text>{this.state.subText}</Text> 
            <Text style={styles.error}>{this.state.errors}</Text>
            <View style={styles.button}>
                <Button title={this.state.btnTitle} onPress={this.state.btnFunc}/>
            </View>
            </View>
        </ScrollView>
        );
    }  
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical:0,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        margin: 15
    },
    introText: {
        fontSize: 30,
        margin: 20
    },
    button: {
        fontSize: 60,
        padding: 30,
        width:200
    },
    error: {
        color: "red"
    }
});