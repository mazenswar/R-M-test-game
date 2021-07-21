import React, { useEffect } from 'react'
import useGame from '../hooks/useGame'
import Controls from './Controls'
export default function StatsBar({moves, stats, ground}) {
    return (
        <div className="statsbar">
            {ground ? <h2>Away Team</h2> : <Controls />}
            <div className="stats-num-container">
                <p>Attack</p>
                <p className="stat-num">{stats.attack}</p>
                <p> Defense</p>
                <p className="stat-num">{stats.defense}</p>
                <p> Health</p>
                <p className="stat-num">{stats.health}</p>
                <p> Moves</p>
                <p className="stat-num">{moves.length}</p>
            </div>
        </div>
    )
}
