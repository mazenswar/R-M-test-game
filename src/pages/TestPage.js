import React, { useEffect, useState } from 'react';
import characters from '../testData';
import PlayerCard from '../pages/PlayerCard';
import makeLevel from '../notes/playerCard';
import TeamSheet from './TeamSheet';
export default function TestPage() {
  const [players, setPlayers] = useState([])
  useEffect(() => {
    const playersArr = characters.map((c) => makeLevel(c));
    setPlayers(playersArr)
  }, []);
  return (
    <div>
      <TeamSheet ground='Home' />
      <TeamSheet ground='Away' />
    </div>
  );
}
