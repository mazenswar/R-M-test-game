import { useContext, useConext } from 'react';
import { Context as HomeTeamContext } from '../context/HomeTeamContext';
import { Context as AwayTeamContext } from '../context/AwayTeamContext';
import { Context as GameContext } from '../context/GameContext';
import useTeam from './useTeam';
import characters from '../testData';
import makeAttributes from '../helpers/makeAttributes';
import makeLevel from '../notes/playerCard';

function useGame() {
  //imports
  const { endGame } = useContext(GameContext);
  const {
    setHomeTeam,
    receiveDamage: awayAttack,
    state: { health: homeHealth, team: homeTeam, formation: homeFormation },
  } = useContext(HomeTeamContext);
  const {
    setAwayTeam,
    receiveDamage: homeAttack,
    state: { health: awayHealth, team: awayTeam, formation: awayFormation },
  } = useContext(AwayTeamContext);
  const [
    homedefenseValue,
    homeattackValue,
    hometeamChemistry,
    homeformationValue,
  ] = useTeam(homeTeam, homeFormation);
  const [
    awaydefenseValue,
    awayattackValue,
    awayteamChemistry,
    awayformationValue,
  ] = useTeam(awayTeam, awayFormation);

  /// ATTACK FUNCTIONS
  function attack(team) {
    if (team === 'Home') {
      let damage = (awaydefenseValue() - homeattackValue()) * 0.4;
      if (Math.sign(damage) === -1) damage = damage * -1;
      homeAttack(damage);
      if (awayHealth < 0) {
        console.log('here');
        endGame('Home');
      }
    } else {
      let damage = (homedefenseValue() - awayattackValue()) * 0.4;
      if (Math.sign(damage) === -1) damage = damage * -1;
      awayAttack(damage);
      if (homeHealth < 0) {
        endGame('Away');
      }
    }
  }
  // SET TEAM
  function setTeam(playerArr) {
    const middle = Math.floor(playerArr.length / 2);
    // debugger;
    let half = playerArr.splice(0, middle);
    setHomeTeam(half);
    setAwayTeam(playerArr);
  }

  // fetch
  function fetchChars() {
    // let ten = [];
    // while (ten.length !== 10) {
    //   let rando1 = randomNumber();
    //   ten.includes(rando1) ? ten.push(randomNumber()) : ten.push(rando1);
    // }
    // fetch(`https://rickandmortyapi.com/api/character/${ten}`)
    //   .then((data) => data.json())
    //   .then((arr) => {
    //     const middle = Math.floor(arr.length / 2);
    //     setHomeTeam(arr.splice(0, middle));
    //     setAwayTeam(arr);
    //   });
    let charsWithAttr = characters.map(c => makeLevel(c))
    function makeTen() {
      let arr = [];
      while (arr.length !== 10) {
        let character =
          charsWithAttr[Math.floor(Math.random() * charsWithAttr.length)];
        if (!arr.some((i) => i.id === character.id)) {
          const char = makeAttributes(character);
          arr.push(char);
        }
      }
      return arr;
    }
    let ten = makeTen();
    console.log(ten);
    setTeam(ten);
    // function randomNumber() {
    //   return Math.floor(Math.random() * 671) + 1;
    // }
  }
  // return value
  return [
    attack,
    homeTeam,
    awayTeam,
    fetchChars,
    homeformationValue,
    awayformationValue,
  ];
}

export default useGame;
