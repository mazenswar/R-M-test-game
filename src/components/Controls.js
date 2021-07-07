import React, {useContext} from 'react'
import useControls from '../hooks/useControls'
import {Context as GameContext} from '../context/GameContext'

export default function Controls({ground}) {
    const {attack, fortifyHomeDefense, longShot} = useControls()
    const { state:{playerTurn} } = useContext(GameContext);
    // A = Attack 
    // D = Fortify Defense
    // L = Longshot
    // X = Take out player
    
    return (
        <div>
            <button disabled={!playerTurn} onClick={attack}>Attack</button>
            <button disabled={!playerTurn} onClick={fortifyHomeDefense}>Fortify Defense</button>
            <button disabled={!playerTurn} onClick={longShot}>Longshot</button>
            <button>Take out</button>
        </div>
    )
    
}
