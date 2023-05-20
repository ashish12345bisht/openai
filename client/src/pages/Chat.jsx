import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import { useEffect } from 'react';
// import SendIcon from '@material-ui/icons/SendIcon';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    chatSection: {
        width: '75vw',
        height: '80vh',
        margin: "auto"
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: '70vh',
        overflowY: 'auto'
    }
});

const Chat = () => {
    const classes = useStyles();
    const [chat, setChat] = useState([]);
    const [prompt, setPrompt] = useState([]);

    const sendMessage = () => {
        if (prompt) {
            let tempChat = chat;
            tempChat.push({ content: prompt, role: "user" })
            setChat(tempChat)
            setPrompt("")
            fetch('http://localhost:8000/chat', {
                method: "POST",
                body: JSON.stringify({
                    prompt
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res => res.json()).then(json => {
                let tempChat = chat;
                tempChat.push(json.result)
                setChat([...tempChat])
                var objDiv = document.getElementById("message-box");
                objDiv.scrollIntoView();
            })
        }
    }

    const handleChange = (e) => {
        setPrompt(e.target.value)
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12} >
                    <Typography variant="h5" className="header-message">Chat</Typography>
                </Grid>
            </Grid>
            <Grid container sm={12} component={Paper} className={classes.chatSection}>
                <Grid item xs={12}>
                    <List className={classes.messageArea}>
                        {chat.map((msg, i) => (
                            <ListItem key={i}>
                                <Grid container>
                                    <Grid item xs={12}>
                                        <ListItemText align={msg.role === "user" ? "right" : "left"} primary={msg?.content || "NA"}></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))}
                        <div id="message-box"></div>
                    </List>
                    <Divider />
                    <Grid container style={{ padding: '20px' }}>
                        <Grid item xs={11}>
                            <TextField value={prompt} onKeyDown={e => {
                                if (e.key === "Enter") {
                                    sendMessage()
                                }
                            }} onChange={handleChange} id="outlined-basic-email" label="Type Something" fullWidth />
                        </Grid>
                        <Grid xs={1} align="right" onClick={sendMessage}>
                            <Fab color="primary" aria-label="add">Send</Fab>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    );
}

export default Chat;