import React, { useState, useEffect } from 'react';
import { Slide } from 'react-awesome-reveal';
import { matchesCollection } from '../../../firebase';

const Blocks = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    if (!matches.length > 0) {
      matchesCollection
        .get()
        .then((snapshoot) => {
          const matches = snapshoot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setMatches(matches);
          // id terpisah jadi tidak terkonstrak
        })
        .catch((error) => console.error(error));
    }
  }, [matches]);

  return <div>hello</div>;
};

export default Blocks;
