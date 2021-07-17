import React from 'react';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { CityLogo, logOutHanlder } from '../utils/tools';
import { firebase } from '../../firebase';

const Header = (props) => {
  // user props received from Routes

  const { user } = props;

  return (
    <AppBar
      style={{
        position: 'fixed',
        backgroundColor: '#98c5e9',
        boxShadow: 'none',
        padding: '10px 0',
        borderBottom: '2px solid #00285e',
      }}
    >
      <Toolbar
        style={{
          display: 'flex',
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <div className="header_logo">
            <CityLogo link={true} linkTo="/" width={70} height={70} />
          </div>
        </div>

        <Link to="/">
          <Button color="inherit">The Team</Button>
        </Link>

        {user && (
          <>
            <Link to="/dashboard">
              <Button color="inherit">Dashboard</Button>
            </Link>

            <Button color="inherit" onClick={() => logOutHanlder()}>
              Log out
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
