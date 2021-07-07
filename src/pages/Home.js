import React, { useContext, useEffect, useState } from 'react'
import useAwayTeam from '../hooks/useAwayTeam'
import {Context as AwayTeamContext} from '../context/AwayTeamContext';
import HomeTeamSelection from './HomeTeamSelection';
import Play from './Play';
import GameOver from './GameOver';
import {Context as GameContext} from '../context/GameContext';


export default function Home() {
    const { state: {winner, gameOver} } = useContext(GameContext);
    // SET AWAY TEAM
    const {state, setTeam} = useContext(AwayTeamContext)
    const {formation, stats} = useAwayTeam();
    useEffect(() => {
        setTeam({team: formation, stats});
    }, [formation, stats]);
    // SET SELECTION MODE
    const [selectionMode, setSelectionMode] = useState(true);
    if(gameOver) return <GameOver winner={winner}/>
    return selectionMode ? (
        <HomeTeamSelection setSelectionMode={setSelectionMode}/>
    ) : <Play />
}
