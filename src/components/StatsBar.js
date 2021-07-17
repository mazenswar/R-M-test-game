import React from 'react'
import Controls from './Controls'
export default function StatsBar({moves, stats, ground}) {
    return (
        <div className="statsbar">
            {ground ? null : <Controls />}
            <div className="stats-num-container">
                <p>Moves</p>
                <p className="stat-num">{moves.length} </p>
                <p>Attack</p>
                <p className="stat-num">{stats.attack}</p>
                <p> Defense</p>
                <p className="stat-num">{stats.defense}</p>
            </div>
        </div>
    )
}
