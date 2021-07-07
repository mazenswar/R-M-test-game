import React from 'react'

export default function StatsBar({stats}) {
    return (
        <div>
            <p>Attack: {stats.attack}</p>
            <p> Defense: {stats.defense}</p>
        </div>
    )
}
