import React, { createRef, useEffect, useState } from 'react';
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
  const refs = {
    defenseLeftRef: createRef(),
    defenseMiddleRef: createRef(),
    defenseRightRef: createRef(),
    midfieldLeftRef: createRef(),
    midfieldMiddleRef: createRef(),
    midfieldRightRef: createRef(),
    attackLeftRef: createRef(),
    attackMiddleRef: createRef(),
    attackRightRef: createRef(),
  };
  const [ranges, setRanges] = useState({});
  //////
  function makeRanges() {
    // how to range

    return {
      defenseLeft: refs.defenseLeftRef.current.getBoundingClientRect(),
      defenseMiddle: refs.defenseMiddleRef.current.getBoundingClientRect(),
      defenseRight: refs.defenseRightRef.current.getBoundingClientRect(),
      midfieldLeft: refs.midfieldLeftRef.current.getBoundingClientRect(),
      midfieldMiddle: refs.midfieldMiddleRef.current.getBoundingClientRect(),
      midfieldRight: refs.midfieldRightRef.current.getBoundingClientRect(),
      attackLeft: refs.attackLeftRef.current.getBoundingClientRect(),
      attackMiddle: refs.attackMiddleRef.current.getBoundingClientRect(),
      attackRight: refs.attackRightRef.current.getBoundingClientRect(),
    };
  }

  ///////
  function handleMove(e) {
    const xPoint = e.target.getBoundingClientRect().x;
    const yPoint = e.target.getBoundingClientRect().y;

    let chosenPosition = null;
    for (let key in ranges) {
      let positionX = ranges[key].x;
      let rangeXend = ranges[key].x + ranges[key].width;
      let positionY = ranges[key].y;
      let rangeYend = ranges[key].y + ranges[key].height;
      if (
        xPoint > positionX &&
        xPoint < rangeXend &&
        yPoint > positionY &&
        yPoint < rangeYend
      ) {
        chosenPosition = { [key]: ranges[key] };
      }
      let x = [key][0] + 'Ref';
      console.log('XXXXX', refs[x]);
      debugger;
    }
    return 0;
  }
  function renderSheet() {
    return team.map((p) => {
      return (
        <PlayerCard
          handleMove={handleMove}
          player={p}
          cssClass={cssClass}
          key={p.id}
        />
      );
    });
  }
  useEffect(() => {
    let num = document.getElementsByClassName('defense');
    console.log(num[0]);
    setRanges(makeRanges());
    // makeRanges();
  }, []);

  function submitTeam() {
    // if()
  }
  return (
    <>
      <div className="team-sheet">{renderSheet()}</div>
      <div className="grid" ref={gridRef}>
        <div className="defense line">
          <div ref={refs.defenseLeftRef} className="defense-left position">
            Defense-Left
          </div>
          <div ref={refs.defenseMiddleRef} className="defense-middle position">
            Defense-Middle
          </div>
          <div ref={refs.defenseRightRef} className="defense-right position">
            Defense-Right
          </div>
        </div>
        <div className="midfield line">
          <div ref={refs.midfieldLeftRef} className="midfield-left position">
            Mid-Left
          </div>
          <div
            ref={refs.midfieldMiddleRef}
            className="midfield-middle position"
          >
            Mid-Middle
          </div>
          <div ref={refs.midfieldRightRef} className="midfield-right position">
            Mid-Right
          </div>
        </div>
        <div className="attack line">
          <div ref={refs.attackLeftRef} className="attack-left position">
            Attack-Left
          </div>
          <div ref={refs.attackMiddleRef} className="attack-middle position">
            Attack-Middle
          </div>
          <div ref={refs.attackRightRef} className="attack-right position">
            Attack-Right
          </div>
        </div>
      </div>
    </>
  );
}
