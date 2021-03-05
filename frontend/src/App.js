import React from 'react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import LoginPage from "./pages/login/LoginPage";
import ChatRoom from "./pages/chatroom/ChatRoom";


const App = () => {
  return <BrowserRouter>
    <Switch>
      <Route exact path="/chatroom" component={ChatRoom}/>
      <Route path="/login" component={LoginPage}/>
      <Route component={LoginPage}/>
    </Switch>
  </BrowserRouter>
};

export default App;