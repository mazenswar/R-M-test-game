function reducer(state, {type, payload}) {
    switch(type) {
        case 'SET_TEAM':
            return {...state, team: payload.team, stats: {...state.stats, ...payload.stats}};
        case 'MODIFY_HEALTH':
            return {...state, stats: {...state.stats, health: payload}}
        case 'CRIPPLE':
            const newAttackValue = state.stats.attack - Math.floor(Math.random() * 50);
            return {...state, stats: {...state.stats, attack: newAttackValue}}
        case 'MOVE':
            return {...state, moves: [...state.moves, payload]}
        default:
            return state;
    }
}

const setHealth = dispatch => payload => {
    dispatch({type: 'MODIFY_HEALTH', payload: Math.floor(payload)})
}


const crippledOffense = dispatch => () => {
    dispatch({type: 'CRIPPLE'})
}


const setTeam = dispatch => data => {
    dispatch({type: 'SET_TEAM', payload: data});
}

const addMove = dispatch => data => {
    dispatch({type: "MOVE", payload: data})
}


const actions = {
    setTeam,
    addMove,
    crippledOffense,
    setHealth
}
const initialState = {
    team: { defense: [], midfield: [], attack: []},
    stats: { attack: 0, defense: 0, chemistry: 0, health: 100},
    moves: []
}


const teamContext = { reducer, actions, initialState}
export default teamContext