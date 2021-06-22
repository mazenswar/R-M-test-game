function reducer(state, { type, payload }) {
    switch (type) {
        case 'SET_POOL':
            return {...state, selectionPool: payload}
        case 'SET_TEAM':
            return { ...state, team: payload };
        case 'ADD_PLAYER':
            return addPlayer(state, payload);
        case 'DAMAGE':
            return { ...state, health: state.health - payload };
        case 'SET_VALS':
            return { ...state, ...payload };
        default:
            return state;
    }
}
function addPlayer(state, payload) {
    const arr = payload.position.split(/(?=[A-Z])/);
    const line = arr[0];
    const position = arr[1].toLocaleLowerCase();
    return {
        ...state,
        team: [...state.team, payload],
        formation: {
        ...state.formation,
        [line]: { ...state.formation[line], [position]: payload },
        },
    };
}
const addPlayerToFormation = (dispatch) => (player) =>
dispatch({ type: 'ADD_PLAYER', payload: player });

const receiveDamage = (dispatch) => (amount) => dispatch({ type: 'DAMAGE', payload: amount });


const setSelectionPool = (dispatch) => team => dispatch({type: 'SET_POOL', payload: team});

const setTeam = (dispatch) => (team) => dispatch({ type: 'SET_TEAM', payload: team });

const setValues = dispatch => values => dispatch({ type: 'SET_VALS', payload: values})  

const actions = { 
    addPlayerToFormation, 
    receiveDamage, 
    setTeam, 
    setValues,
    setSelectionPool
};
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

const teamContext = {
    reducer,
    actions,
    teamInitialState
}

export default teamContext;