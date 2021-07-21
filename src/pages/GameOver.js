import React, { useContext } from 'react'
import { Context as GameContext} from '../context/GameContext'
import { Context as HomeTeamContext} from '../context/HomeTeamContext'
import { Context as AwayTeamContext} from '../context/AwayTeamContext'
export default function GameOver() { 
    const { state: {winner} } = useContext(GameContext);
    const TeamContext = winner === 'home' ? HomeTeamContext : AwayTeamContext;
    const { state:{ stats, moves } } = useContext(TeamContext)
    console.log(moves)
    return (
        <div>
            <h1>Congratultions  {`${winner.charAt(0).toUpperCase() + winner.slice(1)} Team`}</h1>
            <h2>You captured Mr Poopybutthole in {moves.length} moves!</h2>
            <button>Click here to see a summary of your moves</button>
            <button>Click here to check out the leaderboard and see how you stack up against other competitors</button>
        </div>
    )
}
