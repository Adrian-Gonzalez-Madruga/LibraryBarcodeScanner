import React, { Component } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import {createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import * as firebase from 'firebase'; 

export class ScannerScreen extends Component {

  constructor(props) {
    super(props);
    this.camera = null;
    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
	      flashMode: RNCamera.Constants.FlashMode.auto,
	      barcodeFinderVisible: true
      }
    };
    this.goHome = this.goHome.bind(this);
  }

  onBarCodeRead(scanResult) {
    this.props.navigation.navigate({routeName: "Information" ,params: ({barcodeNum: scanResult.data})});
    return;
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Scanning",
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
      <View style={styles.container}>
        <RNCamera
            ref={ref => {this.camera = ref;}}
            barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
            barcodeFinderWidth={280}
            barcodeFinderHeight={220}
            barcodeFinderBorderColor="white"
            barcodeFinderBorderWidth={2}
            defaultTouchToFocus
            flashMode={this.state.camera.flashMode}
            mirrorImage={false}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            onFocusChanged={() => {}}
            onZoomChanged={() => {}}
            permissionDialogTitle={'Permission to use Camera'}
            permissionDialogMessage={'Do you allow "Library" to use Camera'}
            style={styles.preview}
            type={this.state.camera.type}>
        <View style={[styles.boxContainer]}>
        <View style={[styles.finder, {width: 300, height: 600}]}>
          <View style={[{ borderColor: "green" }, styles.topLeftEdge, {borderLeftWidth: 3, borderTopWidth: 3}]}/>
          <View style={[{ borderColor: "green" }, styles.topRightEdge, {borderRightWidth: 3, borderTopWidth: 3}]}/>
          <View style={[{ borderColor: "green" }, styles.bottomLeftEdge, {borderLeftWidth: 3, borderBottomWidth: 3}]}/>
          <View style={[{ borderColor: "green" }, styles.bottomRightEdge, {borderRightWidth: 3, borderBottomWidth: 3}]}/>
        </View>
        </View>
        </RNCamera>
        <View style={[styles.overlay, styles.topOverlay]}>
	        <Text style={styles.scanScreenMessage}>Please Scan Book Barcode</Text>
	      </View>
      </View>
    );
  }

  goHome() {
    console.warn("home");
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 28,
    color: 'white',
    textAlign: 'center',
    flex:1,
    alignItems: "center",
    justifyContent: "center",
  },
  topLeftEdge: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 60,
    height: 40
  },
  topRightEdge: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 60,
    height: 40
  },
  bottomLeftEdge: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 60,
    height: 40
  },
  bottomRightEdge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 40
  },
  boxContainer: {
    flex:1,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  finder: {
    alignItems: "center",
    justifyContent: "center"
  },
  });