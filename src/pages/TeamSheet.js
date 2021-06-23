import React, { useContext, createRef, useEffect, useState } from 'react';
import PlayerCard from './PlayerCard';
import { Context as HomeTeamContext } from '../context/HomeTeamContext';
import { Context as AwayTeamContext } from '../context/AwayTeamContext';
import Play from './Play';

export default function TeamSheet({ ground }) {
  const cssClass = ground === 'Home' ? 'home-player' : 'away-player';
  const TeamContext = ground === 'Home' ? HomeTeamContext : AwayTeamContext;
  const {
    state: { formation, team, selectionPool },
    addPlayerToFormation,
  } = useContext(TeamContext);
  
  const [selection, setSelection] = useState(true);
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
        
        // PLAYER ALREADY IN POSITION ERROR
        const arr = key.split(/(?=[A-Z])/);
        const line = arr[0];
        const position = arr[1].toLocaleLowerCase();
        if(formation[line][position] !== null) {
          alert('Error, player already in position, choose another place');
          return false;
        }
        ///////////////////////////////////
        let element = e.target.className.includes('player')
          ? e.target
          : e.target.parentElement;
        const player = selectionPool.find(
          (player) => player.id === parseInt(element.id)
        );
        const payload = { position: key, ...player };
        addPlayerToFormation(payload);
      }
    }
    return 0;
  }
  function renderSheet() {
    return selectionPool
      ? selectionPool.map((p) => {
          return (
            <PlayerCard
              handleMove={handleMove}
              player={p}
              cssClass={cssClass}
              key={p.id}
              ground={ground}
            />
          );
        })
      : null;
  }
  useEffect(() => {
    setRanges(makeRanges());
    // makeRanges();
  }, []);

  async function submitTeam() {
    // if()
    // generateValues
    setSelection(false);
  }

  if (selection) {
    return (
      <section className={ground + '-team-container team-container'}>
      <div className="team-sheet-container">
        <div className="team-sheet">{renderSheet()}</div>
        <button onClick={submitTeam}>Submit Team</button>
      </div>
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
      </section>
    );
  }
  return <Play ground={ground} />;
}
