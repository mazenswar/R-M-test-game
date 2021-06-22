import createDataContext from './createDataContext';

function reducer(state, { type, payload }) {
  switch (type) {
    case 'SET_TEAM':
      return { ...state, team: payload };
    case 'ADD_PLAYER':
      return addPlayer();
    case 'DAMAGE':
      return { ...state, health: state.health - payload };
    case 'SET_VALS':
      return { ...state, ...payload };
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
const setValues = dispatch => values => dispatch({ type: 'SET_VALS', payload: values}) 
const actions = { addPlayerToFormation, setAwayTeam, receiveDamage, setValues };
const teamInitialState = {
  selectionPool: [],
  team: [],
  formation: {
    defense: { left: null, middle: null, right: null },
    midfield: { left: null, middle: null, right: null },
    attack: { left: null, middle: null, right: null },
  },
  attack: 0,
  defense: 0,
  chemistry: 0,
  formationVal: {defense: 0, midfield: 0, attack: 0},
  health: 100,
};

export const { Context, Provider } = createDataContext(
  reducer,
  actions,
  teamInitialState
);
