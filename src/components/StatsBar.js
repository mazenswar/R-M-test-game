import React from 'react'
import Controls from './Controls'
export default function StatsBar({stats, ground}) {
    return (
        <div className="statsbar">
        {ground ? null : <Controls />}
            <p>Attack: {stats.attack}</p>
            <p> Defense: {stats.defense}</p>
        </div>
    )
}
