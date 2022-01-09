import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import Avatar from '@mui/material/Avatar';
import { db } from './firebase.js';
import { getFirestore, collection, addDoc, query, getDocs, setDoc, Firestore, onSnapshot, orderBy } from "firebase/firestore";
import { Link } from 'react-router-dom';
import AddCommentIcon from '@mui/icons-material/AddComment';

function SidebarChat({ addNewChat, id, name }) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState("");

    useEffect(async () => {
        if (id) {
            const a = await query(collection(db, `rooms/${id}/messages`), orderBy("timestamp", "desc"))
            const messageCollection = onSnapshot(a, (snapshot) => {
                setMessages(snapshot.docs.map((doc) => (
                    doc.data()
                )));
            });
        }
    }, [id]);


    useEffect(() => {
        Math.floor(
            setSeed(Math.random() * 5000))
    }, []);


    const createChat = () => {
        const roomName = prompt("Enter name for your new chatroom");

        if (roomName) {
            addDoc(collection(db, "rooms"), {
                name: roomName,
            });
        }
    };


    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
            <div className="sidebarChat">
                <Avatar src={`https://avatars.dicebear.com/api/micah/female/:${seed}.svg`} />
                <div className="sidebarChat-info">
                    <h2>{name}</h2>
                    <p> {messages[0]?.message}</p>
                </div>

            </div>
        </Link>

    ) : (
        <div onClick={createChat} className='sidebarChat'>
            <div className="sidebarChat-addroom">
                <AddCommentIcon />
            </div>

        </div>

    );
}

export default SidebarChat
