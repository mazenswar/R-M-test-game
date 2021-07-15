import {useState, useEffect} from 'react'

export default function useTeamStats(formation) {
    const [stats, setStats] = useState({
        teamFull: false,
        chemistry: 0,
        attack: 0,
        defense: 0
    })

    async function generateTeamStats(formation) {
        const formationTemp = []
        for(let key in formation) { formationTemp.push(formation[key].length)}
        function offest(num){
            switch(num) {
                case 1:
                    return 1;
                case 2:
                    return 1.2;
                case 3:
                    return 1.3;
                default:
                    return 1
            }
        }
        let playerCount = 0;
        let charisma = 0;
        let attack = 0;
        let defense = 0;

        for(let key in formation) {
            playerCount += formation[key].length;
            formation[key].forEach(p => {
                charisma += parseInt(p.charisma)
                attack += parseInt(p.attack)
                defense += parseInt(p.defense)
            })
        }
        const teamFull = playerCount === 5;
        const offestValues = {
            attack: Math.floor(attack * offest(formationTemp[2]) + attack * offest(formationTemp[1]) + (charisma * 0.01)),
            defense: Math.floor(defense * offest(formationTemp[0]) + defense * offest(formationTemp[1]) + (charisma * 0.01)),
        }
        // empty lines
        if(formation.defense.length === 0){ offestValues["defense"] = offestValues.defense - 100 }
        if(formation.midfield.length === 0){
            offestValues["defense"] = offestValues.defense - 10
            offestValues["attack"] = offestValues.defense - 10
        }
        if(formation.attack.length === 0){
            offestValues["attack"] = offestValues.attack - 100
        }
        // start
        for(let key in offestValues) {
            offestValues[key] = offestValues[key] < 0 ? 0 : offestValues[key]
        }
        await setStats({
            teamFull,
            charisma,
            ...offestValues
        })
    }
    useEffect(() => {
        generateTeamStats(formation);
    }, [formation])
    
    return { stats }
}
