// game start
// dispatch({type: 'START_GAME'})

// dispatch({'HOME_ATTACK', payload: damage})
// dispatch({'AWAY_ATTACK', payload: damage})

// dispatch({'HOME_DEFENSE'})
// dispatch({'AWAY_DEFENSE'})

// dispatch({'TURN', payload: team.name})

// dispatch({'END_GAME'})

// state {
// homeHealth: 100,
// homeTeam: { health: int, attackValue: int, defenseValue: int, teamChemistry,team: [], formation: {}}
// awayHealth: 100,
// awayTeam: { health: int, attackValue: int, defenseValue: int, teamChemistry,team: [], formation: {}},
// winner: null,
// turn: 'home',
// gameOver: false,
// }

// every 20 damage received, the team will lose a random player
// first team to lose all 5 players loses the game

function randomNumberFromRange(arr) {
  return Math.random() * (arr[1] - arr[0]) + arr[0];
}
function attack(state, { attackingTeamName }) {
  const home = attackingTeamName === 'home';
  let defendingTeam;
  let attackingTeam;
  if (home) {
    defendingTeam = { ...state.away };
    attackingTeam = { ...state.home };
  } else {
    defendingTeam = { ...state.home };
    attackingTeam = { ...state.away };
  }
  const damage =
    (attackingTeam.attackValue / 5) * randomNumberFromRange([0.75, 1.1]);

  defendingTeam.health -= damage;
  if (defendingTeam.health < 0) {
    return { ...state, winner: attackingTeamName, gameOver: true };
  }
  const nextTurnTeamName = home ? 'away' : 'home';
  return {
    ...state,
    [defendingTeam.ground]: defendingTeam,
    turn: nextTurnTeamName,
  };
}

function fortifyDefense(state, { defendingTeamName }) {
  const home = defendingTeamName === 'home';
  let defendingTeam = home ? { ...state.home } : { ...state.away };
  defendingTeam.defenseValue =
    defendingTeam.defenseValue +
    defendingTeam.defenseValue * randomNumberFromRange([0.1, 0.4]);
  const nextTurnTeamName = home ? 'away' : 'home';
  return {
    ...state,
    [defendingTeam.ground]: defendingTeam,
    turn: nextTurnTeamName,
  };
}

function move(state, { move, initiatingTeamName }) {
  // moves ['attack', 'defense' ]
}

function reducer(state, { type, payload }) {
  switch (type) {
    case 'ATTACK':
      return attack(state, payload);
    case 'DEFEND':
      return fortifyDefense(state, payload);
    default:
      return state;
  }
}

const actions = {
  attackMove: (dispatch) => (teamName) => {
    dispatch({ type: 'ATTACK', payload: teamName });
  },
  defenseMove: (dispatch) => (teamName) => {
    dispatch({ type: 'DEFEND', payload: teamName });
  },
};
