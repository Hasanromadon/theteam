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
import AdminPlayers from './components/Admin/players';
import AddEditPlayers from './components/Admin/players/addEditPlayers';
import TheTeam from './components/the_team';
import AdminMatches from './components/Admin/matches/index';
import AddEditMatch from './components/Admin/matches/addEditMatch';
import TheMatches from './components/theMatches';
import NotFound from './components/NotFound';
const Routes = ({ user }) => {
  //the props data received from index.js

  return (
    <Router>
      <Header user={user} />
      <Switch>
        <Route
          path="/admin_matches/edit_match/:matchid"
          exact
          component={AuthGuard(AddEditMatch)}
        />
        <Route
          path="/admin_matches/add_match"
          exact
          component={AuthGuard(AddEditMatch)}
        />
        <Route
          path="/Admin_matches"
          exact
          component={AuthGuard(AdminMatches)}
        />

        <Route
          exact
          path="/signin"
          component={(props) => <SignIn {...props} user={user} />}
        />
        <Route exact path="/dashboard" component={AuthGuard(Dashboard)} />
        <Route
          exact
          path="/Admin_players"
          component={AuthGuard(AdminPlayers)}
        />
        <Route
          exact
          path="/admin_players/add_player"
          component={AuthGuard(AddEditPlayers)}
        />
        <Route
          path="/admin_players/edit_player/:playerid"
          exact
          component={AuthGuard(AddEditPlayers)}
        />
        <Route path="/the_team" exact component={TheTeam} />
        <Route path="/the_matches" exact component={TheMatches} />
        <Route exact path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
      <ToastContainer />
      <Footer />
    </Router>
  );
};

export default Routes;
