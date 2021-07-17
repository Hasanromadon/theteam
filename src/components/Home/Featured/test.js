import React, { Fragment, useState } from 'react';
import { Animate } from 'react-move';
import { easePolyOut } from 'd3-ease';
const Test = () => {
  const [show, setShow] = useState(true);
  const [bck, setBck] = useState('red');

  return (
    <Fragment>
      <button onClick={() => setBck('blue')}>update</button>
      <button
        onClick={() => {
          setBck('white');
          setShow(false);
        }}
      >
        Remove
      </button>

      <Animate
        show={show}
        start={{
          backgroundColor: bck,
          width: 500,
          height: 500,
          opacity: 1,
        }}
        enter={{
          backgroundColor: bck,
          width: [100], // gunakan kurung siku untuk agar animasi berjalan dari width start ke enter
          height: [100],
          opacity: 1,
          timing: {
            duration: 1000,
            delay: 1000,
            ease: easePolyOut,
          },
        }}
        update={{
          backgroundColor: bck,
          width: [100], // update akan berjalan jika value style nya ada yg berubah / di trigger
          height: [100],
          opacity: 0.5,
          timing: {
            duration: 1000,
            ease: easePolyOut,
          },
        }}
        leave={[
          {
            backgroundColor: bck,
            width: [1000], // untuk dua langka tinggal buat array aja
            opacity: [1],
            timing: {
              duration: 500,
              ease: easePolyOut,
            },
          },
          {
            backgroundColor: bck,
            opacity: [0],
            timing: {
              duration: 500,
              delay: 600,
              ease: easePolyOut,
            },
          },
        ]}
      >
        {({ backgroundColor, width, height, opacity }) => (
          <div style={{ backgroundColor, width, height, opacity }}>hello</div>
        )}
      </Animate>
    </Fragment>
  );
};

export default Test;

// element animated (child) harus di return lagi
