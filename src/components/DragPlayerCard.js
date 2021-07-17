import React from 'react'

export default function DragPlayerCard({player}) {
    function handleDragStart(e, playerId) {
        e.dataTransfer.setData('text/plain', playerId);
        e.dataTransfer.effectAllowed = "move";
    }
    return (
        <div key={player.id} onDragStart={e => handleDragStart(e, player.id)} draggable id={player.id} className={`player-card level-${player.level}`}>
            <div className="player-card-img-container" style={{backgroundImage: `url(${player.image})`}}>
            </div>
            <div className="player-card-info-container">
                <strong><p>{player.name}</p></strong>
                <p>Attack: {player.attack}</p>
                <p>Defense: {player.defense}</p>
                <p>Charisma: {player.charisma}</p>
            </div>
        </div>)
    
}


{/* <img src={player.image} alt={player.name} /> */}