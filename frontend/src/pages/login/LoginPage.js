import React from 'react';
import axios from 'axios';
import './style.css';

const LoginPage = (props) => {

  const [name, setName] = React.useState("");

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

  const _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      submit();
    }
  };

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
              onKeyDown={_handleKeyDown}
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