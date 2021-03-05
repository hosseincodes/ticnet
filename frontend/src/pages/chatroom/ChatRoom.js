import React, { useEffect, useRef, useState } from 'react';
import SocketIOClient from 'socket.io-client';
import Paper from '@material-ui/core/Paper';
import useStyle from './style';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SendIcon from '@material-ui/icons/Send';
import classNames from 'classnames';
import { Done as SentIcon, DoneAll as SeenIcon } from '@material-ui/icons';
import {
  AttachFileRounded,
  Delete as DeleteIcon,
  Edit as EditIcon,
  MicRounded as MicIcon,
} from '@material-ui/icons';
import axios from 'axios';
import { ReactMic } from 'react-mic';

const MessageBody = ({ message, classes }) => {
  if (message.type === 'voice')
    return (
      <audio controls>
        <source src={message.path} type={'audio/mpeg'} />
      </audio>
    );
  if (message.type === 'file')
    return (
      <div>
        <a target={'_blank'} href={message.path} className={classes.attachLink}>
          <Typography>
            {message.path.substring(message.path.lastIndexOf('-') + 1)}
          </Typography>
          <AttachFileRounded className={classes.attachIcon} />
        </a>
      </div>
    );
  else return <Typography>{message.msg}</Typography>;
};

const ChatRoom = (props) => {
  const classes = useStyle();
  const scrollableGrid = useRef();
  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState([]);
  const [users, setUsers] = React.useState([]);
  const [user, setUser] = React.useState('');
  const [record, setRecord] = React.useState(false);
  const [messageForEdit, setMessageForEdit] = React.useState();
  const [attachment, setAttachment] = React.useState();
  const [isTyping, setIsTyping] = useState();
  const [isTypingReceiver, setIsTypingReceiver] = useState();

  const inputFileRef = useRef();
  const userRef = useRef();
  const isTypingTimeoutId = useRef();

  const socket = React.useRef();

  useEffect(() => {
    socket.current = SocketIOClient.connect('http://localhost:3010/socket');
    return () => {
      if (socket.current) socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    axios
      .get('http://localhost:3010/getUsers')
      .then((res) => {
        setUsers(
          res.data.filter(
            (item) => item.username !== props.location.state.name,
          ),
        );
      })
      .catch((err) => {
        alert('یک مشکلی هست تو لیست کاربرا');
      });
  }, []);

  React.useEffect(() => {
    console.log('render use effect', props.location.state);
    socket.current.on('newMessage', (message) => {
      console.log(message);
      setMessages((messages) => messages.concat(message));
      scrollableGrid.current.scroll(0, scrollableGrid.current.scrollHeight);
      if (message.sender.name !== props.location.state.name)
        socket.current.emit('seenMessage', {
          id: message.id,
          sender: props.location.state.name,
          receiver: userRef.current,
        });
    });
    socket.current.on('deleteMsg', (id) => {
      setMessages(function (messages) {
        let findIndex = -1;
        messages.forEach((message, index) => {
          if (message.id == id) {
            findIndex = index;
          }
        });
        return removeItemWithSlice(messages, findIndex);
      });
    });
    socket.current.on('editMsg', ({ msg, id }) => {
      setMessages((messages) => {
        const index = messages.findIndex((item) => item.id == id);
        console.log(id, index);
        if (index !== -1) {
          return [
            ...messages.slice(0, index),
            { ...messages[index], msg: msg },
            ...messages.slice(index + 1),
          ];
        } else return messages;
      });
    });
    socket.current.on('seenMessage', (id) => {
      setMessages((messages) => {
        const index = messages.findIndex((item) => item.id == id);
        console.log(id, index);
        if (index !== -1) {
          return [
            ...messages.slice(0, index),
            { ...messages[index], seen: true },
            ...messages.slice(index + 1),
          ];
        } else return messages;
      });
    });
    socket.current.on('isTyping', ({ username, isTyping }) => {
      if (props.location.state.name !== username) {
        console.log('user : ' + username + ' isTyping:' + isTyping);
        setIsTypingReceiver(isTyping);
      }
    });
  }, []);

  const handleChangeMessage = (e) => {
    setNewMessage(e.target.value);
    if (!isTyping) setIsTyping(true);
    if (isTypingTimeoutId.current) clearTimeout(isTypingTimeoutId.current);
    isTypingTimeoutId.current = setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  useEffect(() => {
    console.log('change isTyping:', isTyping);
    socket.current.emit('isTyping', {
      sender: props.location.state.name,
      receiver: user,
      isTyping,
    });
  }, [isTyping]);

  const removeItemWithSlice = (items, index) => {
    if (index === -1) return items;
    return [...items.slice(0, index), ...items.slice(index + 1)];
  };

  const startRecordVoice = () => {
    if (record) setRecord(false);
    else setRecord(true);
  };
  const attachFile = () => {
    inputFileRef.current.click();
  };
  const onChangeFile = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setAttachment(files[0]);
      const data = new FormData();
      data.append('file', files[0]);
      axios
        .post('http://localhost:3010/uploadFile', data)
        .then((res) => {
          const filePath = res.data.filePath;
          socket.current.emit('uploadFile', {
            path: filePath,
            sender: {
              name: props.location.state.name,
              gender: props.location.state.gender,
            },
            receiver: {
              name: userRef.current,
            },
          });
        })
        .catch((err) => {
          alert('فایل شما ارسال نشد متاسفانه');
        });
    }
  };
  const sendMessage = () => {
    if (!newMessage) return;
    if (messageForEdit) {
      socket.current.emit('editMessage', {
        id: messageForEdit,
        msg: newMessage,
        sender: props.location.state.name,
        receiver: user,
      });
      setMessageForEdit(undefined);
    } else
      socket.current.emit('newMessage', {
        id: '',
        msg: newMessage,
        sender: {
          name: props.location.state.name,
          gender: props.location.state.gender,
        },
        receiver: {
          name: user,
        },
      });
    setNewMessage('');
  };

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  const onData = (recordedBlob) => {
    // console.log('chunk of real-time data is: ', recordedBlob);
  };

  const onStop = (recordedBlob) => {
    console.log('recordedBlob is: ', recordedBlob);
    const formData = new FormData();
    formData.append('voiceMessage', recordedBlob.blob);
    axios
      .post('http://localhost:3010/uploadVoice', formData)
      .then((res) => {
        console.log(res.data);
        console.log({
          filePath: res.data.filePath,
          sender: {
            name: props.location.state.name,
            gender: props.location.state.gender,
          },
          receiver: {
            name: userRef.current,
          },
        });
        socket.current.emit('uploadVoice', {
          path: res.data.filePath,
          sender: {
            name: props.location.state.name,
            gender: props.location.state.gender,
          },
          receiver: {
            name: userRef.current,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        alert('ارسال نشد ویس شما');
      });
  };

  const joinChatWithUser = (username) => {
    setMessages([]);
    if (user)
      socket.current.emit('leftChat', {
        username: user,
        myUsername: props.location.state.name,
      });
    setUser(username);
    socket.current.emit('joinChat', {
      username,
      myUsername: props.location.state.name,
    });
  };
  const onDeleteClick = (id) => {
    socket.current.emit('deleteMsg', id);
  };
  const onEditClick = (id, msg) => {
    // socket.current.emit("deleteMsg", id);
    setNewMessage(msg);
    setMessageForEdit(id);
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <Grid container direction={'column'}>
          <Grid item container>
            {users.map((userItem) => (
              <div
                className={classNames(
                  classes.userItem,
                  userItem.username === user && classes.userItemActive,
                )}
                onClick={() => joinChatWithUser(userItem.username)}
              >
                {userItem.username}
              </div>
            ))}
          </Grid>
          <Grid
            item
            className={classes.header}
            container
            alignItems={'center'}
            justify={'center'}
          >
            <Typography className={classes.headerText}>
              {`چت با ${user} ${isTypingReceiver ? '(درحال نوشتن)' : ''}`}
            </Typography>
          </Grid>
          <Grid
            item
            className={classes.middle}
            direction={'column'}
            ref={scrollableGrid}
          >
            {messages.map((message) => {
              return (
                <Grid
                  item
                  container
                  className={classNames(
                    classes.messageParent,
                    message.sender.name !== props.location.state.name &&
                      classes.message_reverse,
                  )}
                  alignItems={'center'}
                >
                  <Grid item>
                    <img
                      title={message.sender.name}
                      src={
                        message.sender.gender == 0
                          ? '/images/male_user.png'
                          : '/images/famale_user.png'
                      }
                      alt={message.sender.name}
                      className={classes.avatar}
                    />
                  </Grid>
                  <Grid item>
                    <div
                      className={classNames(
                        classes.message,
                        message.sender.name !== props.location.state.name
                          ? classes.messageHe
                          : classes.messageMe,
                      )}
                    >
                      <Typography className={classes.sender}>
                        {message.sender.name}
                      </Typography>
                      <MessageBody message={message} classes={classes} />
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        {message.sender.name === props.location.state.name &&
                          (message.seen ? (
                            <SeenIcon style={{ marginLeft: '0.5rem' }} />
                          ) : (
                            <SentIcon style={{ marginLeft: '0.5rem' }} />
                          ))}
                        <Typography className={classes.date}>
                          {message.date.split('T')[1].split('.')[0]}
                        </Typography>
                        {message.sender.name === props.location.state.name && (
                          <>
                            <IconButton
                              style={{ marginRight: '1rem' }}
                              onClick={() =>
                                onEditClick(message.id, message.msg)
                              }
                            >
                              <EditIcon className={classes.deleteBtn} />
                            </IconButton>
                            <IconButton
                              style={{ marginRight: '1rem' }}
                              onClick={() => onDeleteClick(message.id)}
                            >
                              <DeleteIcon className={classes.deleteBtn} />
                            </IconButton>
                          </>
                        )}
                      </div>
                    </div>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
          <Grid
            item
            className={classes.footer}
            container
            justify={'center'}
            alignItems={'center'}
          >
            <Grid item>
              <IconButton
                className={classes.btnSend}
                onClick={startRecordVoice}
              >
                <MicIcon style={{ color: record ? 'green' : 'initial' }} />
              </IconButton>
            </Grid>
            <Grid item xs>
              <InputBase
                value={newMessage}
                onChange={handleChangeMessage}
                className={classes.input}
                onKeyDown={_handleKeyDown}
              />
            </Grid>
            <Grid item>
              <IconButton className={classes.btnSend} onClick={attachFile}>
                <AttachFileRounded />
              </IconButton>
              <input
                ref={inputFileRef}
                type={'file'}
                style={{ display: 'none' }}
                onChange={onChangeFile}
              />
            </Grid>
            <Grid item>
              <IconButton className={classes.btnSend} onClick={sendMessage}>
                <SendIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <ReactMic
        record={record}
        className={classes.soundWave}
        onStop={onStop}
        onData={onData}
        strokeColor="#000000"
        backgroundColor="#FF4081"
      />
    </div>
  );
};

export default ChatRoom;
