import {useEffect, useContext, useState} from 'react'
import characters from '../testData';
import makeLevel from '../helpers/makeLevel';
import {Context as AwayTeamContext} from '../context/AwayTeamContext'
import useTeamStats from './useTeamStats';

export default function useAwayTeam() {
    const {setTeam} = useContext(AwayTeamContext);
    const [formation, setFormation] = useState({
        'defense': [],
        'midfield': [],
        'attack': []
    })
    const {stats} = useTeamStats(formation)
    console.log("FOOOR => ", formation);
    console.log("STAAAAT => ", stats);
    const players = characters.slice(0,10).map(p => makeLevel(p));
    const formationTemplates = [
        [2,2,1],
        [1,2,2],
        [2,1,2],
        [1,1,3],
        [3,1,1],
        [1,3,1]
    ]
    
    function genRandNum(limit) {
        return Math.floor(Math.random() * limit);
    }
    async function placePlayers() {
        const chosenFormation = formationTemplates[genRandNum(formationTemplates.length)];
        let blankFormation = {defense: [], midfield: [], attack: []}
        for(let i =0; i < 5; i++) {
            let rand = genRandNum(players.length);
            let player = players.splice(rand, 1)[0];
            if(blankFormation.defense.length < chosenFormation[0]) {
                // setFormation({...formation, defense: [...formation.defense, player]})
                blankFormation.defense.push(player);
            }
            else if(blankFormation.midfield.length < chosenFormation[1]) {
                // setFormation({...formation, midfield: [...formation.midfield, player]})
                blankFormation.midfield.push(player);
            }
            else {
                // setFormation({...formation, attack: [...formation.attack, player]})
                blankFormation.attack.push(player);
            }
        }
        setFormation(blankFormation);
    }
    useEffect(() => {
        placePlayers();
        // setTeam({stats, team: formation})
    }, [])
    console.log(stats)
    return {formation, stats}
}

