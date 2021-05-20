import createDataContext from './createDataContext';

function reducer(state, { type, payload }) {
  switch (type) {
    case 'GAME_OVER':
      return { gameOver: true, winner: payload };
    default:
      return state;
  }
}
const endGame = (dispatch) => (payload) =>
  dispatch({ type: 'GAME_OVER', payload });
const actions = {
  endGame,
};

const initialState = {
  gameOver: false,
  winner: null,
};

export const { Context, Provider } = createDataContext(
  reducer,
  actions,
  initialState
);
