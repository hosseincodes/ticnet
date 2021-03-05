import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ThemeProvider from "@material-ui/styles/ThemeProvider";
import Themes from "./themes";
import CssBaseline from "@material-ui/core/CssBaseline";

ReactDOM.render(
  <ThemeProvider theme={Themes.default}>
    <CssBaseline/>
    <App/>
  </ThemeProvider>,
  document.getElementById('root')
);

