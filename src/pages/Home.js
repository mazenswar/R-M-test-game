import React, { useContext, useEffect } from 'react'
import useAwayTeam from '../hooks/useAwayTeam'
import {Context as AwayTeamContext} from '../context/AwayTeamContext';
import HomeTeamSelection from './HomeTeamSelection';

export default function Home() {
    const {state, setTeam} = useContext(AwayTeamContext)
    const {formation, stats} = useAwayTeam();
    console.log(state);
    useEffect(() => {
        setTeam({team: formation, stats});
    }, [formation, stats])
    return (
        <HomeTeamSelection />
    )
}
