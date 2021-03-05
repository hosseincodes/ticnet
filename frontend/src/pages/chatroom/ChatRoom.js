import React, {useRef} from 'react';
import SocketIOClient from 'socket.io-client'
import Paper from "@material-ui/core/Paper";
import useStyle from './style'
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SendIcon from '@material-ui/icons/Send';
import classNames from 'classnames';
import DeleteIcon from '@material-ui/icons/Delete';

// const messages = [
//   {
//     id: "",
//     msg: "سلام خوب هستید ؟",
//     sender: {
//       name: "علی",
//       gender: 0,
//     },
//   },
//   {
//     id: "",
//     msg: "خیلی ممنون",
//     sender: {
//       name: "محمد",
//       gender: "0",
//     },
//   },
//   {
//     id: "",
//     msg: "خبببببببب",
//     sender: {
//       name: "علی",
//       gender: "0",
//     },
//   },
//   {
//     id: "",
//     msg: "چیکار داری ؟!",
//     sender: {
//       name: "علی",
//       gender: "0",
//     },
//   },
//   {
//     id: "",
//     msg: "فردا امتحان چی داریم ؟",
//     sender: {
//       name: "محمد",
//       gender: "0",
//     },
//   },
//   {
//     id: "",
//     msg: "امتحان کنسله",
//     sender: {
//       name: "زهرا",
//       gender: "1",
//     },
//   },
// ];
const ChatRoom = (props) => {

  const classes = useStyle();
  const scrollableGrid = useRef();
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState([]);
  const socket = React.useRef(SocketIOClient.connect("http://localhost:3010/socket"));
  React.useEffect(() => {
    console.log("render use effect", props.location.state);
    socket.current.on("newMessage", (message) => {
      console.log(message);
      setMessages(messages => messages.concat(message));
      scrollableGrid.current.scroll(0, scrollableGrid.current.scrollHeight);
    })
    socket.current.on("deleteMsg", id => {
      setMessages(function (messages) {
        let findIndex = -1;
        messages.forEach((message, index) => {
          if (message.id == id) {
            findIndex = index;
          }
        });
        return removeItemWithSlice(messages, findIndex);
      });
    })
  }, []);

  const removeItemWithSlice = (items, index) => {
    if (index === -1) return items;
    return [...items.slice(0, index), ...items.slice(index + 1)];
  };

  const sendMessage = () => {
    if (!newMessage)
      return;
    socket.current.emit("newMessage", {
      id: "",
      msg: newMessage,
      sender: {
        name: props.location.state.name,
        gender: props.location.state.gender,
      },
    });
    setNewMessage("");
  }

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  }

  const onDeleteClick = (id) => {
    socket.current.emit("deleteMsg", id);
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container direction={"column"}>
          <Grid item className={classes.header} container alignItems={"center"} justify={"center"}>
            <Typography className={classes.headerText}>
              چت روم
            </Typography>
          </Grid>
          <Grid item className={classes.middle} direction={"column"} ref={scrollableGrid}>
            {
              messages.map((message) => {
                return <Grid item container
                             className={classNames(classes.messageParent,
                               message.sender.name !== props.location.state.name && classes.message_reverse)}
                             alignItems={"center"}>
                  <Grid item>
                    <img title={message.sender.name}
                         src={message.sender.gender == 0 ? "/images/male_user.png" : "/images/famale_user.png"}
                         alt={message.sender.name} className={classes.avatar}/>
                  </Grid>
                  <Grid item>
                    <div className={classNames(classes.message,
                      message.sender.name !== props.location.state.name ? classes.messageHe : classes.messageMe)}>
                      <Typography className={classes.sender}>
                        {message.sender.name}
                      </Typography>
                      <Typography>
                        {message.msg}
                      </Typography>
                      <div style={{display: 'flex', alignItems: 'center'}}>
                        <Typography className={classes.date}>
                          {message.date.split("T")[1].split(".")[0]}
                        </Typography>
                        {
                          message.sender.name === props.location.state.name &&
                          <IconButton style={{marginRight: '1rem',}} onClick={() => onDeleteClick(message.id)}>
                            <DeleteIcon className={classes.deleteBtn}/>
                          </IconButton>
                        }
                      </div>
                    </div>
                  </Grid>
                </Grid>
              })
            }
          </Grid>
          <Grid item className={classes.footer} container justify={'center'} alignItems={"center"}>
            <Grid item xs>
              <InputBase value={newMessage} onChange={e => setNewMessage(e.target.value)}
                         className={classes.input} onKeyDown={_handleKeyDown}/>
            </Grid>
            <Grid item>
              <IconButton className={classes.btnSend} onClick={sendMessage}>
                <SendIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default ChatRoom;