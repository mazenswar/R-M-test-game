import React, {useContext} from 'react'
import useControls from '../hooks/useControls'
import {Context as GameContext} from '../context/GameContext'
import useGame from '../hooks/useGame'

export default function Controls({ground}) {
    const {homeMove, playerTurn} = useGame();
    // A = Attack 
    // D = Fortify Defense
    // L = Longshot
    // X = Take out player
    
    return (
        <div id="controls-container">
            <button disabled={!playerTurn} onClick={()=> homeMove('attack')}>Attack</button>
            <button disabled={!playerTurn} onClick={()=> homeMove('defense')}>Fortify Defense</button>
            <button disabled={!playerTurn} onClick={()=> homeMove('longshot')}>Longshot</button>
            <button disabled={!playerTurn} onClick={()=> homeMove('cripple')}>Cripple Opp attack</button>
        </div>
    )
    
}
