import React, { useEffect } from 'react';
import characters from '../testData';
import PlayerCard from '../pages/PlayerCard';
import makeLevel from '../notes/playerCard';

export default function TestPage() {
  useEffect(() => {
    const players = characters.map((c) => makeLevel(c));
    console.table(players);
    // console.log(makeLevel(characters[10]));
  }, []);
  return (
    <div>
      <h1>Hi</h1>
    </div>
  );
}
