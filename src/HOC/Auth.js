import React from 'react';
import { Redirect } from 'react-router-dom';
import { firebase } from '../firebase';

const AuthGuard = (Component) => {
  const authHoc = (props) => {
    // props from Route
    const user = firebase.auth().currentUser;

    if (user) {
      return <Component {...props} />;
    } else {
      return <Redirect to="/signIn" />;
    }
  };
  return authHoc;
};

export default AuthGuard;
