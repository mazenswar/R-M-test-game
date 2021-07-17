import React, {useContext, useEffect} from 'react'
import {Context as HomeTeamContext} from '../context/HomeTeamContext'
import {Context as AwayTeamContext} from '../context/AwayTeamContext';
import TeamLineup from '../components/TeamLineup';
import useAwayTeam from '../hooks/useAwayTeam';

export default function Play() {
    const {state: homeState} = useContext(HomeTeamContext)
    const {state: awayState, setTeam} = useContext(AwayTeamContext)
    const {formation, stats} = useAwayTeam();
    useEffect(() => {
        setTeam({team: formation, stats});
    }, [formation, stats]);
    return (
        <div id="play-container">
            <TeamLineup moves={homeState.moves} stats={homeState.stats}team={homeState.team} />
            <TeamLineup moves={awayState.moves} stats={awayState.stats}team={awayState.team} ground="away"/>
        </div>
    )
}
