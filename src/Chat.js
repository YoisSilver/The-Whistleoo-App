import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiEmotionsOutlinedIcon from '@mui/icons-material/EmojiEmotionsOutlined';
import MicNoneIcon from '@mui/icons-material/MicNone';
import { collection, getDoc, addDoc, onSnapshot, doc, orderBy, serverTimestamp, query } from 'firebase/firestore';
import { db } from './firebase.js';
import { useStateValue } from "./StateProvider";


function Chat() {
    const [input, setInput] = useState('')
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();


    useEffect(async () => {
        if (roomId) {
            onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
                setRoomName(snapshot.data().name);
            });

            const a = await query(collection(db, `rooms/${roomId}/messages`), orderBy("timestamp", "asc"))
            const messageCollection = onSnapshot(a, (snapshot) => {
                setMessages(snapshot.docs.map((doc) => (
                    doc.data())));
            });
        }
    }, [roomId]);




    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        addDoc(collection(db, `rooms/${roomId}/messages`), {
            message: input,
            name: user.displayName,
            timestamp: serverTimestamp(),
        });


        setInput('');
    };

    return (
        <div className="chat">

            <div className="chat-header">
                < Avatar src={`https://avatars.dicebear.com/api/micah/female/:${seed}.svg`} />
                <div className="chat-headerinfo">
                    <h3>{roomName}</h3>
                    <p>You are currently browsing as {user.displayName}
                        {/* {new Date(messages[messages.length - 1]?.timestamp?.toDate()
                        ).toUTCString()} */}
                    </p>
                </div>
                <div className="chat-headerright">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>

                </div>

            </div>

            <div className="chat-body">
                {messages.map(message => (
                    <p
                        className={`chat-message ${message.name === user.displayName && 'chat-receiver'}`}>
                        <span className="chat-name">{message.name}</span>
                        {message.message}
                        <span className="chat-timestamp">
                            {new Date(message.timestamp?.toDate()).toUTCString()}
                        </span>
                    </p>))}


            </div>

            <div className="chat-footer">
                <EmojiEmotionsOutlinedIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)}
                        placeholder='Type a message' type='text' />
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>
                <MicNoneIcon />
            </div>

        </div>
    )
}

export default Chat
