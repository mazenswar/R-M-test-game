import React, { useEffect } from 'react'
import makeLevel from '../notes/playerCard'
import characters from '../testData'

export default function GenerateAwayTeam() {
    const formation = {
        'defense': [],
        'midfield': [],
        'attack': []
    }
    const players = characters.slice(0,10).map(p => makeLevel(p));
    const lines = ['defense', 'midfield', 'attack'];
    // take one random player and put him at a random line
    const formationTemplates = [
        [2,2,2],
        [3,2,1],
        [2,3,1],
        [3,1,2],
        [2,1,3]
    ]

    function genRandNum(limit) {
        return Math.floor(Math.random() * limit);
    }
    function placePlayers() {
        const chosenFormation = formationTemplates[genRandNum(formationTemplates.length)];
        console.log("choosen => ", chosenFormation);
        for(let i =0; i < 6; i++) {
            let rand = genRandNum(players.length);
            let player = players.splice(rand, 1)[0];
            if(formation.defense.length < chosenFormation[0]) {
                formation.defense.push(player);
            }
            else if(formation.midfield.length < chosenFormation[1]) {
                formation.midfield.push(player);
            }
            else {
                formation.attack.push(player);
            }
        }
        console.log("finalFormation => ", formation);
    }

    useEffect(()=> {
        placePlayers();
    }, [])

    return (
        <div>
            
        </div>
    )
}
