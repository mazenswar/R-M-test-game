import React from 'react';
import Draggable from 'react-draggable';

export default function PlayerCard({ cssClass, player, handleMove }) {
  // function onStop(e) {
  //   // debugger;
  //   return 0;
  // }
  return (
    <Draggable onStop={handleMove}>
      <div className={`player-card ${cssClass}`} id={player.name}>
        <img src={player.image} alt={player.name} />
        <h5>{player.name}</h5>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            height: '1px',
            width: '1px',
          }}
          className="centerMarker"
        ></div>
      </div>
    </Draggable>
  );
}
