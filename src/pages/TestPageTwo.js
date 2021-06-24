import React, { useState } from 'react'
import DragDrop from '../components/DragDrop'
import DragPlayerCard from '../components/DragPlayerCard';
import characters from '../testData';


export default function TestPageTwo() {
    const arr = characters.slice(0, 10);
    const [selectionPool, setSelectionPool] = useState(arr);
    const [formation, setFormation] = useState({
        defense: [],
        midfield: [],
        attack: []
    })

    function renderSelectionPlayers() {
        const selectionComponents = selectionPool.map(player => {
            return <DragPlayerCard player={player} key={player.id} />
        })
        return (
            <div style={{ display: 'flex'}}>
                {selectionComponents}
            </div>
        )
    }

    function addPlayer(line, playerId) {
        // debugger;
        const formationCopy = {...formation};
        playerId = parseInt(playerId);
        let player = selectionPool.find(p => p.id === playerId);
        if (!player) {
            for(let key in formationCopy) {
                const playerToMove = formationCopy[key].find(p => p.id === playerId);
                if (playerToMove) {
                    player = playerToMove
                    formationCopy[key] = formationCopy[key].filter(p => p.id !== playerId)
                };
            }
        }
        // Check if line is full
        if (formationCopy[line].length >= 3) return;
        // // Check if player is in another line and remove from that line
        // for (let key in formationCopy) {
        //     if (formationCopy[key].some(p => p === playerId)) {
        //         formationCopy[key] = formationCopy[key].filter(p => p !== playerId)
        //     }
        // }
        // add player
        formationCopy[line].push(player);
        setFormation(formationCopy);
        const newSelectionPool = [...selectionPool].filter(p => p.id !== playerId);
        // debugger
        setSelectionPool(newSelectionPool);       
    }
    console.log(formation)
    console.log(selectionPool)




    return (
        <div>
            {renderSelectionPlayers()}
            <DragDrop selectedPlayers={formation["defense"]}addPlayer={addPlayer} line="defense"/>
            <DragDrop selectedPlayers={formation["midfield"]}addPlayer={addPlayer} line="midfield"/>
            <DragDrop selectedPlayers={formation["attack"]}addPlayer={addPlayer} line="attack"/>
        </div>
    )
}


