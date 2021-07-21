import React, { useEffect, useState } from 'react';
import { playersCollection, firebase } from '../../firebase';
import { showErrorToast } from '../utils/tools';
import PlayerCard from '../utils/playerCard';
import { Promise } from 'core-js';
import { Slide } from 'react-awesome-reveal';
import { CircularProgress } from '@material-ui/core';

const TheTeam = () => {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    if (!players) {
      playersCollection
        .get()
        .then((snapshot) => {
          // 1 get data from database
          const players = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          //2. get image id using promise karena loading server , fetch data ga bisa langsung di loop
          let promises = [];
          players.forEach((player, index) => {
            promises.push(
              new Promise((resolve, reject) => {
                firebase
                  .storage()
                  .ref('players')
                  .child(player.image)
                  .getDownloadURL()
                  .then((url) => {
                    players[index].url = url;
                    resolve();
                  })
                  .catch((err) => {
                    reject();
                  });
              })
            );
          });

          // 3. setalah promises selesai update
          Promise.all(promises).then(() => {
            setPlayers(players);
          });

          console.log(players);
        })
        .catch((err) => {
          showErrorToast('The team cant load');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [players]);

  // render player

  const showPlayerByCategory = (category) => {
    console.log('show player', players);

    return players
      ? players.map((player) => {
          return (
            player.position === category && (
              <Slide left key={player.id}>
                <div className="item">
                  <PlayerCard
                    number={player.number}
                    name={player.name}
                    lastname={player.lastname}
                    bck={player.url}
                  />
                </div>
              </Slide>
            )
          );
        })
      : null;
  };

  return (
    <div className="the_team_container">
      {loading ? (
        <div className="progress">
          <CircularProgress />{' '}
        </div>
      ) : (
        <div className="team_category_wrapper">
          <div className="title">Keeper</div>
          <div className="team_cards"> {showPlayerByCategory('Keeper')} </div>
        </div>
      )}
    </div>
  );
};

export default TheTeam;
