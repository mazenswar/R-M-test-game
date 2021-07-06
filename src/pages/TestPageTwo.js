import React, { useEffect, useState } from 'react'
import DragDrop from '../components/DragDrop'
import characters from '../testData';
import makeAttributes from '../helpers/makeAttributes';
import makeLevel from '../notes/playerCard';


export default function TestPageTwo() {
    const arr = characters.slice(0, 10).map(p => makeLevel(p));
    const [selectionPool, setSelectionPool] = useState(arr);
    const [formation, setFormation] = useState({
        defense: [],
        midfield: [],
        attack: []
    })

    const [stats, setStats] = useState({
        teamFull: false,
        chemistry: 0,
        attack: 0,
        defense: 0
    })

    function generateTeamStats(formation) {
        let playerCount = 0;
        let charisma = 0;
        let attack = 0;
        let defense = 0;

        for(let key in formation) {
            playerCount += formation[key].length;
            formation[key].forEach(p => {
                console.log(p)
                charisma += parseInt(p.charisma)
                attack += parseInt(p.attack)
                defense += parseInt(p.defense)
            })
        }
        const teamFull = playerCount === 6;
        return {
            teamFull,
            charisma,
            attack,
            defense
        }
    }

    useEffect(() => {
        setStats(generateTeamStats(formation));
    }, [formation])

    function removePlayer(playerId) {
        playerId = parseInt(playerId)
        let playerToRemove;
        let playerLine;
        for (let pLine in formation) {
            let player = formation[pLine].find(p => p.id === playerId);
            if (player) {
                playerToRemove = player
                playerLine = pLine;
            };
        }
        const updatedLine = [...formation[playerLine]].filter(p => p.id !== playerId);
        setFormation({
            ...formation,
            [playerLine]: updatedLine
        })
        setSelectionPool([...selectionPool, playerToRemove])
    }

    async function addPlayer(line, playerId) {
        if(line === 'selection') {
            removePlayer(playerId);
            return;
        };
        // debugger;
        const formationCopy = {...formation};
        playerId = parseInt(playerId);
        let player = selectionPool.find(p => p.id === playerId);
        // Move player from one line to another line
        if (!player) {
            for(let key in formationCopy) {
                const playerToMove = formationCopy[key].find(p => p.id === playerId);
                if (playerToMove) {
                    player = playerToMove
                    formationCopy[key] = formationCopy[key].filter(p => p.id !== playerId)
                    formationCopy[line].push(player);
                    setFormation(formationCopy);
                    return;
                };
            }
        }
        // Check if line is full
        if (formationCopy[line].length >= 3) {
            alert(`${line} is full, chose another line`);
            return;
        };
        // Check if max number of players is selected
        if(stats.teamFull) {
            alert('team is full, you are allowed a maximum of 6 players');
            return;
        }
        // add player from selection pool
        formationCopy[line].push(player);
        setFormation(formationCopy);
        const newSelectionPool = [...selectionPool].filter(p => p.id !== playerId);
        setSelectionPool(newSelectionPool);       
    }

    return (
        <div className="selection-div" style={style}>
            <div className="selection-formation" style={{ width: '80%', height: '100%'}}>
                <DragDrop players={selectionPool} addPlayer={addPlayer} line="selection" />
                <DragDrop players={formation["defense"]}addPlayer={addPlayer} line="defense"/>
                <DragDrop players={formation["midfield"]}addPlayer={addPlayer} line="midfield"/>
                <DragDrop players={formation["attack"]}addPlayer={addPlayer} line="attack"/>
            </div>
            <div className="info" style={{ width: '20%'}}>
                <p>Charisma: {stats.charisma}</p>
                <p>Defense: {stats.defense}</p>
                <p>Attack: {stats.attack}</p>
            </div>
        </div>
    )
}

const style = {
    display: 'flex',
    height: '100vh',
    width: '100vw',
}

