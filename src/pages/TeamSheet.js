import React, { createRef, useEffect } from 'react';
import PlayerCard from './PlayerCard';
function reducer(state, { type, payload }) {
  switch (type) {
    case 'ADD_PLAYER':
      return;
    case 'MOVE_PLAYER':
      return;
    default:
      return state;
  }
}

export default function TeamSheet({ team, cssClass }) {
  const matrix = [];
  const gridRef = createRef();
  //////
  function makeRanges() {
    const width = gridRef.current.clientWidth;
    const height = gridRef.current.clientHeight;
    const widthFr = width / 3;
    const heightFr = height / 3;
    const xRange1 = [0, widthFr];
    const xRange2 = [widthFr, widthFr * 2];
    const xRange3 = [widthFr * 2, widthFr * 3];
    const yRange1 = [0, heightFr];
    const yRange2 = [heightFr, heightFr * 2];
    const yRange3 = [heightFr * 2, heightFr * 3];
    debugger;
    return 0;
  }

  ///////
  function renderSheet() {
    return team.map((p) => {
      return <PlayerCard player={p} cssClass={cssClass} key={p.id} />;
    });
  }
  useEffect(() => {
    let num = document.getElementsByClassName('defense');
    console.log(num[0]);
    makeRanges();
  }, []);

  function submitTeam() {
    // if()
  }
  return (
    <>
      <div className="team-sheet">{renderSheet()}</div>
      <div className="grid" ref={gridRef}>
        <div className="defense line">
          <div className="defense-left position">Defense-Left</div>
          <div className="defense-middle position">Defense-Middle</div>
          <div className="defense-right position">Defense-Right</div>
        </div>
        <div className="midfield line">
          <div className="midfield-left position">Mid-Left</div>
          <div className="midfield-middle position">Mid-Middle</div>
          <div className="midfield-right position">Mid-Right</div>
        </div>
        <div className="attack line">
          <div className="attack-left position">Attack-Left</div>
          <div className="attack-middle position">Attack-Middle</div>
          <div className="attack-right position">Attack-Right</div>
        </div>
      </div>
    </>
  );
}
