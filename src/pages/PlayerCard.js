import React from 'react';
import Draggable from 'react-draggable';

export default function PlayerCard({ cssClass, player }) {
  function onStop(e) {
    debugger;
    return 0;
  }
  return (
    <Draggable onStop={onStop}>
      <div className={`player-card ${cssClass}`}>
        <img src={player.image} alt={player.name} />
        <h5>{player.name}</h5>
      </div>
    </Draggable>
  );
}