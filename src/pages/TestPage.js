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
    defense: createRef(),
    midfield: createRef(),
    attack: createRef(),
  };
  const [ranges, setRanges] = useState({});
  //////
  function makeRanges() {
    // how to range
    return {
      defense: refs.defense.current.getBoundingClientRect(),
      midfield: refs.midfield.current.getBoundingClientRect(),
      attack: refs.attack.current.getBoundingClientRect(),
    };
  }

  ///////
  function handleMove(e, ui) {
    debugger
    console.log(ground);
    let target = e.target.className.includes('player') ? e.target : e.target.parentElement;
    const xPoint = ui.x;
    const yPoint = ui.y;
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
        let data = {
          xPoint, positionX, rangeXend, yPoint, positionY, rangeYend

        }
        // console.log("key  ====> ", key)
        console.table('data ==>', data)
        // console.log(formation)
        console.table("ranges", ranges)
        console.log("idddd", target.id)
        console.log("formation ", formation)
        console.log("key ", key)
        // PLAYER ALREADY IN POSITION ERROR
        if(formation[key].length >= 3) {
          console.log(`Error, ${key} is full, choose another position`);
          return false;
        }
        ///////////////////////////////////
        
        const player = selectionPool.find(
          (player) => player.id === parseInt(target.id)
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
            />
          );
        })
      : null;
  }
  useEffect( () => {
    const x = async () =>  await setRanges(makeRanges())();
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
        <div className="grid" id={ground + '-grid'} ref={gridRef}>
          <div className="defense line" ref={refs.defense}>
          </div>
          <div className="midfield line" ref={refs.midfield}>
          </div>
          <div className="attack line" ref={refs.attack}>
          </div>
        </div>
      </section>
    );
  }
  return <Play ground={ground} />;
}
