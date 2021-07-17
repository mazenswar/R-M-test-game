import React from 'react'

import DragPlayerCard from './DragPlayerCard';

export default function DragDrop({players, addPlayer, line}) {
    

    function renderSelectionPlayers() {
        return players.map(player => <DragPlayerCard player={player} key={'selected-' + player.id} />)
    }
    
    function handleDragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
    };

    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
    };

    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        e.dataTransfer.dropEffect = "move";
    };

    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        const playerId = e.dataTransfer.getData("text/plain")
        addPlayer(line, playerId)
    };
    return (
        <div
            className={`drag-drop-zone dd-${line}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
        >
            {players.length ?  renderSelectionPlayers() : <p>Drag  {line} players here</p>}
        </div>
    )
}
