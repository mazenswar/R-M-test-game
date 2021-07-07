import React from 'react'
import useControls from '../hooks/useControls'

export default function Controls({ground}) {
    const {attack, fortifyDefense, longShot} = useControls()
    // A = Attack 
    // D = Fortify Defense
    // L = Longshot
    // X = Take out player
    return (
        <div>
            <button onClick={attack}>Attack</button>
            <button onClick={fortifyDefense}>Fortify Defense</button>
            <button onClick={longShot}>Longshot</button>
            <button>Take out</button>
        </div>
    )
}
