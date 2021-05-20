import createDataContext from './createDataContext';

function reducer(state, { type, payload }) {
  switch (type) {
    case 'SET_TEAM':
      return { ...state, team: payload };
    case 'ADD_PLAYER':
      return addPlayer();
    case 'DAMAGE':
      console.log(payload);
      return { ...state, health: state.health - payload };
    default:
      return state;
  }
  function addPlayer() {
    const arr = payload.position.split(/(?=[A-Z])/);
    const line = arr[0];
    const position = arr[1].toLocaleLowerCase();

    return {
      ...state,
      formation: {
        ...state.formation,
        [line]: { ...state.formation[line], [position]: payload },
      },
    };
  }
}
function addPlayerToFormation(dispatch) {
  return (player) => {
    return dispatch({ type: 'ADD_PLAYER', payload: player });
  };
}

const setAwayTeam = (dispatch) => (team) =>
  dispatch({ type: 'SET_TEAM', payload: team });

const receiveDamage = (dispatch) => (amount) => {
  dispatch({ type: 'DAMAGE', payload: amount });
};
const actions = { addPlayerToFormation, setAwayTeam, receiveDamage };
const teamInitialState = {
  team: [],
  formation: {
    defense: { left: null, middle: null, right: null },
    midfield: { left: null, middle: null, right: null },
    attack: { left: null, middle: null, right: null },
  },
  health: 100,
};

export const { Context, Provider } = createDataContext(
  reducer,
  actions,
  teamInitialState
);
