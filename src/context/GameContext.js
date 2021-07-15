import createDataContext from './createDataContext';

function reducer(state, { type, payload }) {
  switch (type) {
    case 'TURN':
      return {...state, playerTurn: !state.playerTurn}
    case 'GAME_OVER':
      return { gameOver: true, winner: payload };
    case 'START_GAME':
      return {...state, gameStarted: true}
    default:
      return state;
  }
}
const startGame = dispatch => () => {
  dispatch({type: 'START_GAME'})
}

const endGame = (dispatch) => (payload) =>
  dispatch({ type: 'GAME_OVER', payload });

const changeTurn = dispatch => () => {
  dispatch({ type: 'TURN'});
}

const actions = {
  endGame,
  changeTurn,
  startGame,
};

const initialState = {
  gameOver: false,
  winner: null,
  playerTurn: true,
  gameStarted: false,
  difficulty: 1
};

export const { Context, Provider } = createDataContext(
  reducer,
  actions,
  initialState
);
