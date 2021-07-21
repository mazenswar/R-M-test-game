import createDataContext from './createDataContext';

function reducer(state, { type, payload }) {
  switch (type) {
    case 'START_GAME':
      return {...state, gameStarted: true}
    case 'GAME_OVER':
      return {...state, gameOver: true, winner: payload}
    default:
      return state;
  }
}
const startGame = dispatch => () => {
  dispatch({type: 'START_GAME'})
}

const gameOver = dispatch => winner => {
  dispatch({type: 'GAME_OVER', payload: winner});
}


const actions = {
  startGame,
  gameOver
};

const initialState = {
  gameOver: false,
  gameStarted: false,
  difficulty: 1
};

export const { Context, Provider } = createDataContext(
  reducer,
  actions,
  initialState
);
