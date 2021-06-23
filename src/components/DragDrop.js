import React, {useReducer} from 'react'

function reducer(state, {type, payload}) {
    switch(type) {
        case 'SET_DROP_DEPTH':
            return { ...state, dropDepth: payload }
        case 'SET_IN_DROP_ZONE':
            return { ...state, inDropZone: payload };
        case 'ADD_PLAYER':
            return { ...state, players: [...state.players, payload]}
        default:
            return state;
    }
}

const initialState = { 
    dropDepth: 0, 
    inDropZone: false, 
    players: []
};

export default function DragDrop({line}) {
    const [state, dispatch] = useReducer(reducer, initialState)
    console.log('drag state ===>', state)
    function handleDragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
        dispatch({type: 'SET_DROP_DEPTH', payload: state.dropDepth + 1});
    };

    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        dispatch({type: 'SET_DROP_DEPTH', payload: state.dropDepth - 1});
        if(state.dropDepth > 0) return;
        dispatch({type: 'SET_IN_DROP_ZONE', payload: false});
    };

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        // e.dataTransfer.dropEffect = "move";
        dispatch({type: 'SET_IN_DROP_ZONE', payload: true});
    };

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        debugger
        const player = state.players.find(p => p.id === e.target.id);
        if (player) return;
        if (state.players.length >= 3) return; 
        dispatch({type: 'ADD_PLAYER', payload: e.target.id})
        dispatch({ type: 'SET_DROP_DEPTH', payload: 0 });
        dispatch({ type: 'SET_IN_DROP_ZONE', payload: false });
    };
    const color = line === 'defense' ? 'blue' : line === 'midfield' ? 'green' : 'red';
    return (
        <div 
        style={{
            height: '10vh',
            width: '100vw',
            backgroundColor: color
        }}
            className={'drag-drop-zone'}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            <p>Drag  {line} players here</p>
        </div>
    )
}
