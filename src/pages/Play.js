import React, { useContext, useEffect } from 'react';
import Formation from './Formation';
import Controls from '../components/Controls';
import { Context as GameContext } from '../context/GameContext';
import useTeam from '../hooks/useTeam';

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
