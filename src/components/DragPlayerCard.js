import React from 'react'

export default function DragPlayerCard({player}) {
    function handleDragStart(e, playerId) {
        e.dataTransfer.setData('text/plain', playerId);
        e.dataTransfer.effectAllowed = "move";
    }
    return (
        <div key={player.id} onDragStart={e => handleDragStart(e, player.id)} draggable id={player.id} style={style(player)}>
            <img style={{width: '30%', borderRadius: '100px'}}src={player.image} alt={player.name} />
            <strong><p>{player.name}</p></strong>
            <p>Attack: {player.attack}</p>
            <p>Defense: {player.defense}</p>
            <p>Charisma: {player.charisma}</p>
        </div>)
    
}

function style(player){
    return {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%', 
        width: '10%', 
        backgroundColor: colors[player.level],
        fontSize: '10px',
        borderRadius: '5px'
    }
}

const colors = {
    bronze: '#8C7853',
    silver: '#C0C0C0',
    gold: '#d4af37',
    black: '#2A2A2A',
    green: '#a5e582'
}