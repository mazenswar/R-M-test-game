import React, { useEffect, useState } from 'react'
import PlayerCard from './PlayerCard';
import characters from '../testData'

export default function Lineup() {
    const [homeChoices, setHomeChoices] = useState([]);
    const [awayChoices, setAwayChoices] = useState([]);

    useEffect(()=> {
        const players = [...characters]
        const home = players.splice(0, (characters.length/2))
        setAwayChoices(players)
        setHomeChoices(home)
    }, [])

    function displayLineup(ground) {
        const choices = ground === 'Home' ? homeChoices : awayChoices;
        return choices.map(player => {
            return <PlayerCard key={player.id}player={player} />
        })
    }




    return (
        <div>
            <div>
                <h1>Home Choices</h1>
                {displayLineup('Home')}
            </div>
            <div>
                <h1>Away Choices</h1>
                {displayLineup('Away')}
            </div>
        </div>
    )
}
