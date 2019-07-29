import React from 'react';
import ReactDOM from 'react-dom';
import './stylesheets/index.css';
import App from './App';
import { BrowserRouter } from "react-router-dom";
import axios from "axios";

axios
  .get("/api/auth/loggedin")
  .then(res => {
    ReactDOM.render(
      <BrowserRouter>
        <App user={res.data}/>
      </BrowserRouter>,
      document.getElementById("root")
    )
  })
  .catch(err => {
    console.log(err)
  })