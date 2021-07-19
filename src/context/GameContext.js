import createDataContext from './createDataContext';

function reducer(state, { type, payload }) {
  switch (type) {
    case 'START_GAME':
      return {...state, gameStarted: true}
    default:
      return state;
  }
}
const startGame = dispatch => () => {
  dispatch({type: 'START_GAME'})
}



const actions = {
  startGame,
};

const initialState = {
  gameStarted: false,
  difficulty: 1
};

export const { Context, Provider } = createDataContext(
  reducer,
  actions,
  initialState
);
