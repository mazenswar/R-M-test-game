import React, {useContext} from 'react'
import {Context as HomeTeamContext} from '../context/HomeTeamContext'
import {Context as AwayTeamContext} from '../context/AwayTeamContext'
import useAwayTeam from '../hooks/useAwayTeam';
import TeamLineup from '../components/TeamLineup';
import { useEffect } from 'react';

export default function Play() {

    const {state: homeState} = useContext(HomeTeamContext);
    const {state: awayState} = useContext(AwayTeamContext);
    console.log(homeState);
    console.log(awayState)
    return (
        <div>
            <TeamLineup stats={homeState.stats}team={homeState.team} />
            <TeamLineup stats={awayState.stats}team={awayState.team} ground="away"/>
        </div>
    )
}
