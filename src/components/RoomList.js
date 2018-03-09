import React, { Component } from 'react';


class RoomList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: [],
      roomName: ''
    };

    this.roomsRef = this.props.firebase.database().ref('rooms');
  }

 componentDidMount() {
    this.roomsRef.on('child_added', snapshot => {
       const room = snapshot.val();
       room.key = snapshot.key;
       this.setState({ rooms: this.state.rooms.concat( room ) })
     });
   }

 handleChange(e) {
    this.setState({ name: e.target.value });
 }

 componentWillUnmount(){
    this.roomsRef.off();
  }

 createRoom(e){
  e.preventDefault();
  const newRoom = this.state.name;
  this.roomsRef.push({
    name: newRoom
  });
  this.setState({ name: ' '});
}

 render () {
     return (
         <div>
            <ul className='roomList'>
            {this.state.rooms.map( ( room  ) =>
                <li key={room.key}>{room.name}</li>
               )
              }
            </ul>
          <form onSubmit={(e) => this.createRoom(e)}>
            <input type="text" value={this.state.name} onChange={(e) => this.handleChange(e)}/>
            <input type="submit"/>
          </form>

        </div>
     );
   }
 }

export default RoomList;
