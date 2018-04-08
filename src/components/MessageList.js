import React, { Component } from 'react';
import * as firebase from 'firebase';
import './MessageList.css';

class MessageList extends Component {
  constructor (props){
  super(props);
  this.state = {
    username: "",
    content: "",
    sentAt: "",
    roomId: "",
    messages: []
  };
  this.messagesRef = this.props.firebase.database().ref('messages');
  this.createMessage = this.createMessage.bind(this);
  this.messageContent = this.messageContent.bind(this);

};

componentDidMount() {
  this.messagesRef.on('child_added', snapshot => {
    const message = snapshot.val();
    message.key = snapshot.key;
    this.setState({ messages: this.state.messages.concat( message ) })
  });
}

messageContent(e) {
  e.preventDefault();
  this.setState(
    {
    content: e.target.value,
    sentAt: firebase.database.ServerValue.TIMESTAMP,
    roomId: this.props.activeRoom,
    username: this.props.currentUser
  })
}

createMessage(e) {
  e.preventDefault();
  this.messagesRef.push(
    {
      content: this.state.content,
      sentAt: this.state.sentAt,
      roomId: this.state.roomId,
      username: this.props.currentUser
    }
  );
   this.setState ({
     message: "",
     sentAt: "",
     roomId: ""
  })
  e.target.reset()
 };

 render() {

   let activeRoom = this.props.activeRoom

   let currentMessages = (
     this.state.messages.map((message)=> {
       if (message.roomId === activeRoom) {
         return <li key={message.key}>{message.content}
         </li>
       }
       return null;
     })
   );

   let messageWindow= (
      <div>
       <ul>
       <form className="newMessage" onSubmit={this.createMessage}>
         <h2>Message Form</h2>
         <textarea type='text' placeholder="Type message here" onChange={this.messageContent}/>
         <input type='submit' value="Submit"/>
       </form>
       </ul>
      </div>
   )
   return (
     <div id='messages'>
       <div>
          {messageWindow}
      </div>
       <div id='current-messages'>
         {currentMessages}
       </div>


     </div>
   );
 }
}


export default MessageList;
