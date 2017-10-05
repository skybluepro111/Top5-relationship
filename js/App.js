import React, { Component } from "react";
import { StyleSheet } from "react-native";

import { Container, Content, Text, View } from "native-base";
import Modal from "react-native-modalbox";
import MainStackRouter from "./Routers/MainStackRouter";
import ProgressBar from "./components/loaders/ProgressBar";

import theme from "./themes/base-theme";
import * as firebase from 'firebase';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null
  },
  modal: {
    justifyContent: "center",
    alignItems: "center"
  },
  modal1: {
    height: 300
  }
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDownloadingModal: false,
      showInstalling: false,
      downloadProgress: 0
    };
    this.initializeFirebase();
  }

  initializeFirebase(){
    // Initialize Firebase
       firebase.initializeApp({
      apiKey: "AIzaSyBmTU1ew32ZBdatU1gJIeX12o9o0bP7u8g",
      authDomain: "topfive-clone.firebaseapp.com",
      databaseURL: "https://topfive-clone.firebaseio.com",
      storageBucket: "topfive-clone.appspot.com"

    });
  }



  render() {
    
console.disableYellowBox = true;    

    return <MainStackRouter />;
  }
}

export default App;
