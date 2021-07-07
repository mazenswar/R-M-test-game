import React from 'react'
import StatsBar from './StatsBar';
import '../styles/lineup.scss'


function TeamLineup({team, stats, ground}) {
    const cssClass = ground === "away" ? "lineup away-lineup" : "lineup";
    function renderLine(line) {
        return team[line].length ? team[line].map(p => <img src={p.image} alt={p.name}/>) : null
    }
    return (
        <div className="lineup-container">
            <StatsBar stats={stats} ground={ground}/>
            <div className={cssClass}>
                <div className="pbh-container">
                    <h1>Mr. Poopey Butthole</h1>
                </div>
                <div className="defense-line line">
                    {renderLine('defense')}
                </div>
                <div className="midfield-line line">
                    {renderLine('midfield')}
                </div>
                <div className="attack-line line">
                    {renderLine('attack')}
                </div>
            </div>
        </div>
    )
}


export default TeamLineup;