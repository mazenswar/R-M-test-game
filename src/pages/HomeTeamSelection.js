import React, { useState, useContext } from 'react'
import DragDrop from '../components/DragDrop'
import {Context as HomeTeamContext} from '../context/HomeTeamContext'
import useTeamSetup from '../hooks/useTeamSetup';
import Play from './Play';

export default function HomeTeamSelection() {
    const {state, setTeam} = useContext(HomeTeamContext);
    const [selectionMode, setSelectionMode] = useState(true);
    const { formation, stats, addPlayer, selectionPool } = useTeamSetup();
    function confirmTeam() {
        const data = {team: formation, stats}
        setTeam(data);
        setSelectionMode(false);
    }
    /////////////// RETURN /////////////////
    return selectionMode ? (
        <div className="selection-div" style={style}>
            <div className="selection-formation" style={{ width: '80%', height: '100%'}}>
                <DragDrop players={selectionPool} addPlayer={addPlayer} line="selection" />
                <DragDrop players={formation["defense"]}addPlayer={addPlayer} line="defense"/>
                <DragDrop players={formation["midfield"]}addPlayer={addPlayer} line="midfield"/>
                <DragDrop players={formation["attack"]}addPlayer={addPlayer} line="attack"/>
            </div>
            <div className="info" style={{ width: '20%'}}>
                <p>Charisma: {stats.charisma}</p>
                <p>Defense: {stats.defense}</p>
                <p>Attack: {stats.attack}</p>
                <button disabled={!stats.teamFull} onClick={confirmTeam}>Confirm Selection</button>
            </div>
        </div>
    )
    : (
        <Play/>
    )
}

const style = {
    display: 'flex',
    height: '100vh',
    width: '100vw',
}

