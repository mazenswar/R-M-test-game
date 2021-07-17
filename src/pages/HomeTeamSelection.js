import React, { useState, useContext } from 'react'
import DragDrop from '../components/DragDrop'
import {Context as HomeTeamContext} from '../context/HomeTeamContext'
import useTeamSetup from '../hooks/useTeamSetup';
import { Context as GameContext} from '../context/GameContext'

export default function HomeTeamSelection({setSelectionMode}) {
    const {setTeam} = useContext(HomeTeamContext);
    const { startGame } = useContext(GameContext)
    const { formation, stats, addPlayer, selectionPool } = useTeamSetup();
    async function confirmTeam() {
        const data = {team: formation, stats}
        await setTeam(data);
        setSelectionMode(false);
        startGame();
    }
    /////////////// RETURN /////////////////
    return  (
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
                <p>
                    You can drag characters and put them in any of the three lines (defense, midfield, attack)
                </p>
                <p>
                    You can move characters between lines or drag them back to the selection pool if you want to choose another character instead
                </p>
            </div>
        </div>
    )
}

const style = {
    display: 'flex',
    height: '100%',
    width: '100%',
}

