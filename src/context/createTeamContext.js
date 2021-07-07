function reducer(state, {type, payload}) {
    switch(type) {
        case 'SET_TEAM':
            return {...state, team: payload.team, stats: payload.stats};
        case 'RECEIVE_DAMAGE':
            return {...state, stats: {...state.stats, defense: state.stats.defense - payload}}
        case 'FORTIFY':
            const newDefenseValue = Math.floor(state.stats.defense + state.stats.defense * 0.03);
            return {...state, stats: {...state.stats, defense: newDefenseValue }}
        case 'LONGSHOT':
            const newDefenseVal = Math.floor(state.stats.defense - (state.stats.defense * 40 / 100));
            return {...state, stats: {...state.stats, defense: newDefenseVal }}
        default:
            return state;
    }
}


const fortifyDefense = dispatch => () => {
    // team defense value = team current defense value * 0.03
    dispatch({type: 'FORTIFY'});
}


const receiveDamage = dispatch => value => {
    dispatch({type: 'RECEIVE_DAMAGE', payload: value})
}

const receiveLongShot = dispatch => () => {
    dispatch({type: 'LONGSHOT'})
}


const setTeam = dispatch => data => {
    dispatch({type: 'SET_TEAM', payload: data});
}


const actions = {
    setTeam,
    receiveDamage,
    fortifyDefense,
    receiveLongShot
}
const initialState = {
    team: { defense: [], midfield: [], attack: []},
    stats: { attack: 0, defense: 0, chemistry: 0}
}


const teamContext = { reducer, actions, initialState}
export default teamContext