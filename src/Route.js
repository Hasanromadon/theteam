import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Header from './components/Header_footer/Header';
import Home from './components/Home';
import Footer from './components/Header_footer/Footer';
import SignIn from './components/Signin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Admin/Dashboard';
import AuthGuard from './HOC/Auth';

const Routes = ({ user }) => {
  //the props data received from index.js
  console.log(user);

  return (
    <Router>
      <Header user={user} />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route
          exact
          path="/signin"
          component={(props) => <SignIn {...props} user={user} />}
        />
        <Route exact path="/dashboard" component={AuthGuard(Dashboard)} />
      </Switch>
      <ToastContainer />
      <Footer />
    </Router>
  );
};

export default Routes;
