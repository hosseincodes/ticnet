import React from 'react';
// import Grid from "@material-ui/core/div";
// import Typography from "@material-ui/core/Typography";
// import TextField from "@material-ui/core/TextField";
// import FormControl from "@material-ui/core/FormControl";
// import div from "@material-ui/core/div";
// import div from "@material-ui/core/div";
// import Button from "@material-ui/core/Button";
import './style.css'
// import classNames from 'classnames';
import axios from 'axios'

const LoginPage = (props) => {

  const [name, setName] = React.useState("");

  //methods
  const validation = (user) => {
    console.log("validation", user);
    if (!user.name)
      return "You must enter a name"
    return null;
  }
  const submit = () => {
    console.log(name);
    const error = validation({name});
    if (error)
      return alert(error);
    axios.post("http://localhost:3010/login", {
      username: name,
    }).then(res => {
      props.history.push({
        pathname: "chatroom",
        state: {
          name,
        }
      });
    }).catch(err => {
      console.log(err);
      alert("There is a problem :/")
    });
  }

  return (
    <div className="login-page-container">
      <div className="login-box">
      <div className="header">
        <h1>Ticnet</h1>
      </div>
      <div className="name-input">
        <input
          id="outlined-basic"
          placeholder="Enter your name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>
      <div className="login-button">
        <button variant="contained" color="primary" onClick={submit}>Login to the chat room</button>
      </div>
      </div>
    </div>
  );
};

export default LoginPage;