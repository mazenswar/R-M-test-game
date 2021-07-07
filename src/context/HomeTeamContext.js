import createDataContext from './createDataContext';

function reducer(state, {type, payload}) {
  switch(type) {
    case 'SET_TEAM':
      return {...state, team: payload.team, stats: payload.stats};
    case 'RECEIVE_DAMAGE':
      return {...state, stats: {...state.stats, defense: state.stats.defense - payload}}
    default:
      return state;
  }
}

const receiveDamage = dispatch => value => {
  dispatch({type: 'RECEIVE_DAMAGE', payload: value})
}


const setTeam = dispatch => data => {
  dispatch({type: 'SET_TEAM', payload: data});
}


const actions = {
  setTeam,
  receiveDamage
}
const initialState = {
  team: {},
  stats: {}
}


export const { Context, Provider } = createDataContext(
  reducer,
  actions,
  initialState
);
