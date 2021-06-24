import React from 'react'

export default function DragPlayerCard({player}) {
    function handleDragStart(e, playerId) {
        e.dataTransfer.setData('text/plain', playerId);
        e.dataTransfer.effectAllowed = "move";
    }
    return (
        <div key={player.id} onDragStart={e => handleDragStart(e, player.id)} draggable id={player.id} style={{ height: '100px', width: '100px', backgroundColor: 'purple'}}>
            <img style={{width: '50%'}}src={player.image} alt={player.name} />
            <p>{player.name}</p>
        </div>)
    
}
