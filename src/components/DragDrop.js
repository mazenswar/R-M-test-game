import React, {useReducer} from 'react'

import DragPlayerCard from './DragPlayerCard';

export default function DragDrop({selectedPlayers, addPlayer, line}) {
    function renderSelectionPlayers() {
        console.log(`${line} ssss  ===>  `, selectedPlayers)
        return selectedPlayers.map(player => <DragPlayerCard player={player} key={'selected-' + player.id} />)
    }
    // console.log('drag state ===>', state)
    function handleDragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
        // dispatch({type: 'SET_DROP_DEPTH', payload: state.dropDepth + 1});
    };

    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        // dispatch({type: 'SET_DROP_DEPTH', payload: state.dropDepth - 1});
        // if(state.dropDepth > 0) return;
        // dispatch({type: 'SET_IN_DROP_ZONE', payload: false});
    };

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = "move";
        // dispatch({type: 'SET_IN_DROP_ZONE', payload: true});
    };

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        const playerId = e.dataTransfer.getData("text/plain")
        
        addPlayer(line, playerId)
        
    };
    const color = line === 'defense' ? 'blue' : line === 'midfield' ? 'green' : 'red';
    return (
        <div 
        style={{
            height: '20vh',
            width: '100vw',
            backgroundColor: color,
            display: 'flex',
            justifyContent: 'space-evenly'
        }}
            className={'drag-drop-zone'}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            {selectedPlayers.length ?  renderSelectionPlayers() : <p>Drag  {line} players here</p>}
        </div>
    )
}
