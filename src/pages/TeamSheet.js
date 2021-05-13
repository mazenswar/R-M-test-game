import React, { createRef, useEffect, useReducer, useState } from 'react';
import Formation from './Formation';
import PlayerCard from './PlayerCard';
function reducer(state, { type, payload }) {
  switch (type) {
    case 'ADD_PLAYER':
      return addPlayer();
    default:
      return state;
  }
  function addPlayer() {
    const arr = payload.position.split(/(?=[A-Z])/);
    const line = arr[0];
    const position = arr[1].toLocaleLowerCase();
    return {
      ...state,
      [line]: { ...state[line], [position]: payload.id },
    };
  }
}

export default function TeamSheet({ team, cssClass }) {
  // const [team, setTeam] = useState([]);
  const [selection, setSelection] = useState(true);
  const [state, dispatch] = useReducer(reducer, {
    defense: { left: null, middle: null, right: null },
    midfield: { left: null, middle: null, right: null },
    attack: { left: null, middle: null, right: null },
  });
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
    let xPoint = e.target.getBoundingClientRect().x;
    let yPoint = e.target.getBoundingClientRect().y;
    let target = e.target.className === '' ? e.target.parentElement : e.target;
    const marker = target.lastElementChild.getBoundingClientRect();
    xPoint = marker.x;
    yPoint = marker.y;
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
        console.log('key', key);
        let x = e.target.className.includes('player')
          ? e.target
          : e.target.parentElement;
        const payload = { position: key, id: x.id };
        dispatch({
          type: 'ADD_PLAYER',
          payload,
        });
      }

      // if (x) {

      //   refs[x].current.innerHTML = '';
      //   refs[x].current.appendChild(e.target);
      // }
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
    setRanges(makeRanges());
    // makeRanges();
  }, []);

  function submitTeam() {
    // if()
    console.log(state);
    setSelection(false);
  }

  console.log(state);
  if (selection) {
    return (
      <>
        <div className="team-sheet">{renderSheet()}</div>
        <button onClick={submitTeam}>Submit Team</button>
        <div className="grid" ref={gridRef}>
          <div className="defense line">
            <div ref={refs.defenseLeftRef} className="defense-left position">
              Defense-Left
            </div>
            <div
              ref={refs.defenseMiddleRef}
              className="defense-middle position"
            >
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
            <div
              ref={refs.midfieldRightRef}
              className="midfield-right position"
            >
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
  return <Formation team={state} teamArr={team} />;
}
