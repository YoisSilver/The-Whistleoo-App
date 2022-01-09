import React, {useState, useEffect} from 'react';
import './Sidebar.css';
import SidebarChat from './SidebarChat';
import Avatar from '@mui/material/Avatar';
import { doc, collection, setDoc, data, where, onSnapshot, query } from "firebase/firestore";
import { useStateValue } from './StateProvider';
import { IconButton } from '@mui/material';
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import {db, auth, provider} from './firebase.js';

function Sidebar() {

    const [rooms,setRooms] = useState([]);
    const[{ user }, dispatch] = useStateValue();
     


    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, 'rooms'), snapshot => {
            setRooms(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
              }))
            );
          });
      
          return () => {
            unsubscribe();
          };
        }, []);
  


    // useEffect(() => {
    //     const unsubscribe = onSnapshot(collection(db, "rooms"), (snapshot) => {
    //       setRooms(

    return (
    <div className='sidebar'>
        <div className="sidebar-header">
        <Avatar src = {user?.photoURL} />
        <div className="sidebar-header-right">
        <IconButton>
        <DonutLargeIcon />
        </IconButton>
        <IconButton>
        <ChatIcon />
        </IconButton>
        <IconButton>
        <MoreVertIcon />
        </IconButton>
        </div>
        </div>

        <div className="sidebar-search">
        <div className="search-container">
        <SearchIcon />
        {/* TO BE FIXED TO EXTEND ENTIRE AREA */}
        <input placeholder='Enter search term' type='text' />
        </div>
        </div>

        <div className="sidebar-chat">
            <SidebarChat addNewChat />
            {rooms.map(room => (
                <SidebarChat key={room.id} id={room.id} name={room.data.name} />
            ))}
        </div>

        </div>);
}

export default Sidebar
