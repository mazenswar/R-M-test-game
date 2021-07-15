import React, {useContext} from 'react'
import {Context as HomeTeamContext} from '../context/HomeTeamContext'
import {Context as AwayTeamContext} from '../context/AwayTeamContext'
import {Context as GameContext} from '../context/GameContext'
import TeamLineup from '../components/TeamLineup';
import { useEffect } from 'react';

export default function Play() {
    const {endGame, state:{gameStarted}} = useContext(GameContext)
    const {state: homeState} = useContext(HomeTeamContext);
    const {state: awayState} = useContext(AwayTeamContext);
    useEffect(() => {
        if(gameStarted) {
            if (homeState.stats.defense <= 0) {
                alert('Game Over')
                endGame('Away')
            };
            if (awayState.stats.defense <= 0) {
                alert('Game Over')
                endGame('Home')
            };
        }
    }, [homeState.stats, awayState.stats])
    return (
        <div id="play-container">
            <TeamLineup moves={homeState.moves} stats={homeState.stats}team={homeState.team} />
            <TeamLineup moves={awayState.moves} stats={awayState.stats}team={awayState.team} ground="away"/>
        </div>
    )
}
