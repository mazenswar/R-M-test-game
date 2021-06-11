import React, { useContext } from 'react';
import Formation from './Formation';
import Controls from '../components/Controls';
import { Context as GameContext } from '../context/GameContext';

export default function Play({ ground }) {
  const { gameOver } = useContext(GameContext);
  if (!gameOver) {
    return (
      <section className={ground + '-team-container'}>
        <Controls ground={ground} />
        <Formation ground={ground} />;
      </section>
    );
  } else {
    return <div>GAME OVER</div>;
  }
}
