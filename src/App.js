import React, { useEffect, useState } from 'react';
// import PlayerCard from './pages/PlayerCard';
import TeamSheet from './pages/TeamSheet';
import './styles/master.scss';

export default function App() {
  const [homeTeam, setHomeTeam] = useState([]);
  const [awayTeam, setAwayTeam] = useState([]);
  function fetchChars() {
    let ten = [];
    while (ten.length !== 10) {
      let rando1 = randomNumber();
      ten.includes(rando1) ? ten.push(randomNumber()) : ten.push(rando1);
    }
    fetch(`https://rickandmortyapi.com/api/character/${ten}`)
      .then((data) => data.json())
      .then((arr) => {
        const middle = Math.floor(arr.length / 2);
        setHomeTeam(arr.splice(0, middle));
        setAwayTeam(arr);
      });
  }

  function renderTeam(ground) {
    const teamArr = ground === 'Home' ? homeTeam : awayTeam;
    const cssClass = ground === 'Home' ? 'home-player' : 'away-player';
    return <TeamSheet team={teamArr} cssClass={cssClass} />;
    // return teamArr.map(({ image, id, name, origin: { name: originName } }) => {
    //   return (
    //     <div draggable className={`character-div ${cssClass}`} key={id}>
    //       <img src={image} alt={`${name}`} />
    //       <p>Name: {name}</p>
    //       <p>Origin: {originName}</p>
    //     </div>
    //   );
    // });
  }
  function randomNumber() {
    return Math.floor(Math.random() * 671) + 1;
  }
  useEffect(() => {
    fetchChars();
  }, []);

  return (
    <div>
      <div className="team" id="home-team-div">
        {renderTeam('Home')}
      </div>
      <div className="team" id="away-team-div">
        {/* {renderTeam()} */}
      </div>
    </div>
  );
  return null;
}
