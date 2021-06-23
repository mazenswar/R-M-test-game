import React, { useContext } from 'react';
import useGame from '../hooks/useGame';
import StatBar from './StatBar';
import {Context as HomeTeamContext} from '../context/HomeTeamContext';
import {Context as AwayTeamContext} from '../context/AwayTeamContext';
import useTeam from '../hooks/useTeam'

export default function Controls({ ground }) {
  const TeamContext = ground === 'Home' ? HomeTeamContext : AwayTeamContext;
  const {
    state: { team, formation, health },
  } = useContext(TeamContext);
  const [defenseValue, attackValue, teamChemistry, formationValue] = useTeam(
    team,
    formation
  );
  const formationVal = formationValue(); // returns {}
  const [attack] = useGame();

  return (
    <section className={ground + '-team-controls team-controls'}>
      <StatBar 
        health={health}
        formationVal={formationVal}
        teamChemistry={teamChemistry}
        defenseValue={defenseValue}
        attackValue={attackValue}
      />
      <button onClick={() => attack(ground)}>Attack</button>
      <button>Button2</button>
      <button>Button3</button>
      <button>Button4</button>
    </section>
  );
}
