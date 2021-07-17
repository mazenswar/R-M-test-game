import React, { useState } from 'react'
import Home from './Home';

export default function Intro() {
    const [ready, setReady] = useState(false);
    return !ready ? (
        <div className="intro">
            <h1>Welcome to capture Mr. Poopybutthole!</h1>
            <p>You will be given a pool of 10 characters to choose 5 from and place them in a formation.</p>
            <p>A formation has 3 lines (defense, midfield, attack). The characters you choose and how you place them will effect your team's overall attack and defense values</p>
            <p>Your team's overall charisma rating plays a role in how the team's overall attack and defense values are calculated</p>
            <p>There are three levels of characters (gold, silver, bronze): gold cards have the highest stats, after them the silver and then bronze</p>
            <p>Once you select your characters and place them in a formation you an opponent team will be generated for you to go head to head with</p>
            <p>The first team to get the other team's defense below 0, captures Mr. Poopybutthole and wins the game!</p>
            <p>Each team gets a turn and has 4 available moves to choose from each turn:</p>
            <ul>
                <li>Attack: attacking the opponent's team reducing their defense value</li>
                <li>Fortify Defense: slightly increasing your team's defense value</li>
                <li>Longshot: 1 in 20 chance of taking 40% out of the opponent's defense value</li>
                <li>Cripple Opp Attack: this will slightly decrease the opponent's attack value and the damage they will be able to deal you</li>
            </ul>
            <h2>Ready??</h2>
            <button onClick={()=>setReady(true)}>Go to character selection</button>
        </div>
    ) : <Home />;
}

// Welcome to capture Mr. Poopybutthole! You will be given a pool of 10 characters to choose 5 from and place them in a formation. 
// - A formation has 3 lines (defense, midfield, attack). The characters you choose and how you place them will effect your team's overall attack and defense values
// Your team's overall charisma rating plays a role in how the team's overall attack and defense values are calculated
// There are three levels of characters (gold, silver, bronze): gold cards have the highest stats, after them the silver and then bronze
// Once you select your characters and place them in a formation you an opponent team will be generated for you to go head to head with
// The first team to eradicate the other team's defense captures Mr. Poopybutthole and wins the game!
// Each team gets a turn and has 4 available moves to choose from each turn: 
//  -   Attack: attacking the opponent's team reducing their defense value
//  -   Fortify Defense: slightly increasing your team's defense value
//  -   Longshot: a successful longshot will take out 40% of the opponents defense value but only try it if your feeling lucky because most longshots are unsuccessful
//  -   Cripple Opp Attack: this will slightly decrease the opponent's attack value and the damage they will be able to deal you

// Ready ??

// Go to selection
