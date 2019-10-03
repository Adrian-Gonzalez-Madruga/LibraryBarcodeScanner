import React from 'react';
import { View, Text, Button, Image, StyleSheet, FlatList} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation'; 
import * as firebase from 'firebase';

export class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {show: false, data: [{title:"f"},{title:"h"}]};
    }

    componentDidMount() {
      fetch("https://barcode-6ceab.firebaseio.com/users/" + firebase.auth().currentUser.uid + "/books.json" )
            .then((response) => response.json())
            .then((responseJson) => {
            var x = [];
            var count = 0;
            for(key in responseJson) {
              var textDate = new Date(responseJson[key].Date);
              var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "Spetember", "October", "November", "December"];
              var t = ("Title: " + responseJson[key].Name + ",\n Due: " + (months[textDate.getMonth()] + " " + textDate.getDate() + ", 20" + (textDate.getYear() % 100) + " " + textDate.getHours() + ":" + textDate.getMinutes() + ":" + textDate.getSeconds()));
              var c = (((new Date()).getTime() <= textDate.getTime()) ? "black" : "red");
              x.push({title: t, key: key, color: c, index: count++});
            }
            this.setState({data: x, show: true});
        }).catch((error) => {});
    }

    _keyExtractor = (item, index) => item.key;

    _onPressItem = (index: string) => {
      this.props.navigation.navigate({routeName: "BookInfo", params: ({key: this.data[index].key, date: (this.data[index].title.split("\n")[1])})});
    };

    _renderItem = ({item}) => (
      <BookItem
        id={item.id}
        title={item.title}
        color={item.color}
        key={item.key}
        index={item.index}
      />
    );

    static navigationOptions = ({ navigation }) => {
      return {
        headerTitle: "Home",
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
      if(this.state.show) {
        return (
          <View style={[styles.container, {flex: 1}]}>
            <View style={styles.container}>
              <Text style={styles.introText}>Checked Books</Text>
            </View>
            <View style={[styles.container, {flex: 2}]}>
              <FlatList data={this.state.data} onPressItem={this._onPressItem} keyExtractor={this._keyExtractor} renderItem={this._renderItem}/>
            </View>
            <View style={[styles.container, {flex: 2, width: 200}]}>
              <Button style={styles.button} title="Scan" onPress={() => {this.props.navigation.navigate("Scanner");}} />
            </View>
          </View>
        );
      }
      return (
        <View style={styles.container}>
          <Text style={styles.introText}>Loading</Text>
        </View>
      );
    }  
}

class BookItem extends React.Component {
  _onPress = () => {
    this.props.onPressItem(this.props.index);
  };

  render() {
    return (
      <View>
        <Text style={[styles.textSpacing, {borderColor: this.props.color, color: this.props.color}]}>{this.props.title}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 15
    },
    introText: {
        fontSize: 30,
        margin: 40
    },
    button: {
        fontSize: 60,
        padding: 30,
        width:200
    },
    error: {
        color: "red"
    },
    textSpacing: {
      fontSize: 18,
      margin: 10,
      alignItems: "center",
      borderRadius: 5,
      borderWidth: 1,
      padding: 7,
      paddingLeft: 30,
      paddingRight: 30
    }
});