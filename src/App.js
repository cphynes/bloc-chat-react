import React, { Component } from 'react';
import * as firebase from 'firebase';
import './App.css';
import RoomList from './components/RoomList.js';
import MessageList from './components/MessageList.js';
import User from './components/User.js';

  var config = {
    apiKey: "AIzaSyAoyZ4iIR2lewDqpYNcS7jQBEq1POpxi4M",
    authDomain: "bloc-chat-react-ab411.firebaseapp.com",
    databaseURL: "https://bloc-chat-react-ab411.firebaseio.com",
    projectId: "bloc-chat-react-ab411",
    storageBucket: "bloc-chat-react-ab411.appspot.com",
    messagingSenderId: "415096214438"
  };
  firebase.initializeApp(config);
  var rootRef = firebase.database().ref();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoom: "",
      user: null
    };
    this.setActiveRoom = this.setActiveRoom.bind(this);
    this.setUser = this.setUser.bind(this);
  }

  setActiveRoom(room) {
    this.setState({ activeRoom: room });
  }

  setUser(user) {
    this.setState({ user: user });
  }

    render() {
      let showMessages = this.state.activeRoom;
      let currentUser = this.state.user === null ? "Guest" : this.state.user.displayName;

      return (
        <div>
          <User firebase={firebase} setUser={this.setUser} currentUser={currentUser}/>
          <h1>Bloc Chat React</h1>
          <h2>{this.state.activeRoom.name || "Choose a room or Create one"}</h2>
          <RoomList firebase={firebase} setActiveRoom={this.setActiveRoom} />
          { showMessages ?
            <MessageList firebase={firebase} activeRoom={this.state.activeRoom.key} currentUser={currentUser} />
          : null
          }
        </div>
      );
    }
  }
export default App;
