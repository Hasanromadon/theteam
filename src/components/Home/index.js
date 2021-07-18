import React from 'react';
import Promotion from '../promotion';
import Featured from './Featured';
import MatchesHome from './matches';
import MeetPlayers from './meetPlayers';

const Home = () => {
  return (
    <div className="bck_blue">
      <Featured />
      <MatchesHome />
      <MeetPlayers />
      <Promotion />
    </div>
  );
};

export default Home;
