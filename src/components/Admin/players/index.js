import React, { useEffect, useState } from 'react';
import AdminLayout from '../../../HOC/AdminLayout';
import { Link } from 'react-router-dom';
import { playersCollection } from '../../../firebase';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from '@material-ui/core';
const AdminPlayers = () => {
  const [lastVisible, setLastVisible] = useState(null);
  const [loading, setLLoading] = useState(false);
  const [players, setPlayers] = useState(null);

  useEffect(() => {
    if (!players) {
      setLLoading(true);
      playersCollection
        .limit(2)
        .get()
        .then((snapshoot) => {
          const lastVisible = snapshoot.docs[snapshoot.docs.length - 1]; //mencari data terakhir, bentuk data aneh tapi firebase tau
          const players = snapshoot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLastVisible(lastVisible);
          setPlayers(players);
        })
        .catch((err) => console.error(err))
        .finally(setLLoading(false));
    }

    console.log(players);
    console.log(lastVisible);
  }, [players]);

  const loadMorePlayers = () => {
    if (lastVisible) {
      setLLoading(true);
      playersCollection
        .startAfter(lastVisible)
        .limit(2)
        .get()
        .then((snapshoot) => {
          const lastVisible = snapshoot.docs[snapshoot.docs.length - 1]; //mencari data terakhir, bentuk data aneh tapi firebase tau
          const newPlayers = snapshoot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setLastVisible(lastVisible);
          setPlayers([...players, ...newPlayers]);
          setLLoading(false);
        });
    }
  };

  return (
    <AdminLayout title="The players">
      <div className="mb-5">
        <Button
          disableElevation
          variant="outlined"
          component={Link}
          to={'/admin_players/add_player'}
        >
          Add player
        </Button>
      </div>

      <Paper className="mb-5">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>First name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Number</TableCell>
              <TableCell>Position</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {players
              ? players.map((player, i) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <Link to={`/admin_players/edit_player/${player.id}`}>
                        {player.name}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link to={`/admin_players/edit_player/${player.id}`}>
                        {player.lastname}
                      </Link>
                    </TableCell>
                    <TableCell>{player.number}</TableCell>
                    <TableCell>{player.position}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </Paper>

      <Button
        variant="contained"
        color="primary"
        onClick={() => loadMorePlayers()}
        disabled={loading}
      >
        Load more
      </Button>

      <div className="admin_progress">
        {loading ? (
          <CircularProgress thickness={7} style={{ color: '#98c5e9' }} />
        ) : null}
      </div>
    </AdminLayout>
  );
};

export default AdminPlayers;
