import React from 'react'
import Controls from './Controls'
export default function StatsBar({moves, stats, ground}) {
    return (
        <div className="statsbar">
        {ground ? null : <Controls />}
            <p>Moves: {moves.length} </p>
            <p>Attack: {stats.attack}</p>
            <p> Defense: {stats.defense}</p>
        </div>
    )
}
