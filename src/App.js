import React, { Component } from 'react';
// eslint-disable-next-line
import logo from './logo.svg';
import './App.css';
import RoomList from './components/RoomList';
import * as firebase from 'firebase';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAoyZ4iIR2lewDqpYNcS7jQBEq1POpxi4M",
    authDomain: "bloc-chat-react-ab411.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-ab411.firebaseio.com",
    projectId: "bloc-chat-react-ab411",
    storageBucket: "bloc-chat-react-ab411.appspot.com",
    messagingSenderId: "415096214438"
  };
  firebase.initializeApp(config);


class App extends Component {
  render() {
    return (
      <div className="App">
            <RoomList firebase={firebase} />
        </div>
    );
  }
}

export default App;
