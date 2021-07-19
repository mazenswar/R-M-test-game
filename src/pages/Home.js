import React, { useContext, useEffect, useState } from 'react'
import useAwayTeam from '../hooks/useAwayTeam'
import HomeTeamSelection from './HomeTeamSelection';
import Play from './Play';
import GameOver from './GameOver';
import {Context as GameContext} from '../context/GameContext';
import {Context as HomeContext } from '../context/HomeTeamContext';
import {Context as AwayTeamContext} from '../context/AwayTeamContext';


export default function Home() {
    const { state: {winner, gameOver, gameStarted}, endGame } = useContext(GameContext);
    // SET AWAY TEAM
    const {state: awayState, setTeam} = useContext(AwayTeamContext)
    const {state: homeState} = useContext(HomeContext)

    // SET SELECTION MODE
    const [selectionMode, setSelectionMode] = useState(true);
    if(gameOver) return <GameOver winner={winner} winnerState={winner === "home" ? homeState : awayState}/>;
    return selectionMode ? (
        <HomeTeamSelection setSelectionMode={setSelectionMode}/>
    ) : <Play />
}


