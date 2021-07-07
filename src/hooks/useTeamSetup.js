import {useState} from 'react'
import makeLevel from '../helpers/makeLevel';
import characters from '../testData';
import useTeamStats from './useTeamStats';

export default function useTeamSetup() {
    const arr = characters.slice(0, 10).map(p => makeLevel(p));
    const [selectionPool, setSelectionPool] = useState(arr);
    const [formation, setFormation] = useState({
        defense: [],
        midfield: [],
        attack: []
    })
    const { stats } = useTeamStats(formation)

    function removePlayer(playerId) {
        playerId = parseInt(playerId)
        if(selectionPool.find(p => p.id === playerId)) return;
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
    return {stats, addPlayer, formation, selectionPool }
}
