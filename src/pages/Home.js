import React, { useContext, useEffect, useState } from 'react'
import useAwayTeam from '../hooks/useAwayTeam'
import {Context as AwayTeamContext} from '../context/AwayTeamContext';
import HomeTeamSelection from './HomeTeamSelection';
import Play from './Play';

export default function Home() {
    // SET AWAY TEAM
    const {state, setTeam} = useContext(AwayTeamContext)
    const {formation, stats} = useAwayTeam();
    useEffect(() => {
        setTeam({team: formation, stats});
    }, [formation, stats]);
    // SET SELECTION MODE
    const [selectionMode, setSelectionMode] = useState(true);

    return selectionMode ? (
        <HomeTeamSelection setSelectionMode={setSelectionMode}/>
    ) : <Play />
}
