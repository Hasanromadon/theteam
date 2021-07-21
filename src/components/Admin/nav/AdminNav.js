import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { ListItem } from '@material-ui/core';
import { logOutHanlder } from '../../utils/tools';

const AdminNav = () => {
  const links = [
    { title: 'Matches', linkTo: '/Admin_Matches' },
    { title: 'Player', linkTo: '/Admin_players' },
  ];

  const renderItem = () =>
    links.map((link) => (
      <Link key={link.title} to={link.linkTo}>
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
