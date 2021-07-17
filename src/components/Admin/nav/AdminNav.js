import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import firebase from '../../../firebase';
import { ListItem } from '@material-ui/core';
import {
  showSuccessToast,
  showErrorToast,
  logOutHanlder,
} from '../../utils/tools';

const AdminNav = () => {
  const links = [
    { title: 'Matches', linkTo: '/admin_mathes' },
    { title: 'Player', linkTo: '/admin_player' },
  ];

  const renderItem = () =>
    links.map((link) => (
      <Link to={link.linkTo}>
        <ListItem button className="admin_nav_link">
          {link.title}
        </ListItem>
      </Link>
    ));

  return (
    <div>
      {renderItem()}
      <ListItem
        onClick={() => logOutHanlder()}
        button
        className="admin_nav_link"
      >
        Logout
      </ListItem>
    </div>
  );
};

// with route berfungsi untuk ambil props di route
export default withRouter(AdminNav);
