import React from 'react'
import DragPlayerCard from './DragPlayerCard'

export default function SelectionPool({players}) {
    const selectionComponents = players.map(player => {
        return <DragPlayerCard player={player} key={player.id} />
    })
    return (
        <section className="selection-pool-div" style={{ display: 'flex'}}>
            {selectionComponents}
        </section>
    )
}
