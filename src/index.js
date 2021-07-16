import React from 'react';
import ReactDOM from 'react-dom';
import { firebase } from './firebase';
import Routes from './Route';
import './Resources/css/app.css';

const App = (props) => {
  return (
    // send user information to routes. the props copy from onAuthStateChanged
    <Routes {...props} />
  );
};

//listener to check loggin user
firebase.auth().onAuthStateChanged((user) => {
  ReactDOM.render(<App user={user} />, document.getElementById('root'));
});
