import React, { useEffect, useState } from 'react';
import {
  matchesCollection,
  teamsCollection,
  firebase,
  positionsCollection,
} from '../../firebase';
import { showErrorToast, showSuccessToast } from '../utils/tools';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from '@material-ui/core';

const LeagueTable = () => {
  const [positions, setPositions] = useState(null);

  useEffect(() => {
    if (!positions) {
      positionsCollection
        .get()
        .then((snapshot) => {
          const positions = snapshot.docs
            .map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))
            .sort((a, b) => {
              const compA = +a.pts;
              const compB = +b.pts;

              let comparison = 0;
              if (compA > compB) {
                comparison = -1;
              } else if (compA < compB) {
                comparison = 1;
              }
              return comparison;
            });
          setPositions(positions);
        })
        .catch((err) => showErrorToast('Error load positions'));
    }
    console.log('table');
  }, [positions]);

  const showTeamPositions = () => {
    return positions
      ? positions.map((pos, i) => (
          <TableRow key={i}>
            <TableCell> {i + 1} </TableCell>
            <TableCell> {pos.team} </TableCell>
            <TableCell> {pos.w} </TableCell>
            <TableCell> {pos.d} </TableCell>
            <TableCell> {pos.l} </TableCell>
            <TableCell> {pos.pts} </TableCell>
          </TableRow>
        ))
      : null;
  };
  return (
    <div className="league_table_wrapper">
      <div className="title">League Table</div>
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Post</TableCell>
              <TableCell>Team</TableCell>
              <TableCell>W</TableCell>
              <TableCell>L</TableCell>
              <TableCell>D</TableCell>
              <TableCell>Pts</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{showTeamPositions()}</TableBody>
        </Table>
      </div>
    </div>
  );
};

export default LeagueTable;
