import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList.js';

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
        <h1>Bloc Chat React</h1>
         <RoomList firebase={firebase} />
      </div>
    );
  }
}

export default App;
