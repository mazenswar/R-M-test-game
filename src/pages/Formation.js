import React from 'react';

import useTeam from '../hooks/useTeam';

export default function Formation({ team, teamArr }) {
  const [defenseValue, attackValue, teamChemistry, formationValue] = useTeam(
    team,
    teamArr
  );
  const formation = formationValue();

  return (
    <>
      <h1>
        Formation =={'>'} {formation.defense} - {formation.midfield} -{' '}
        {formation.attack}
      </h1>
      <h1>
        Chemistry =={'>'} {teamChemistry()}
      </h1>
      <h1>
        Defense =={'>'} {defenseValue()}
      </h1>
      <h1>
        Attack =={'>'} {attackValue()}
      </h1>
      <div className="grid formation">
        <div className="defense line">
          <div className="defense-left position">{team.defense.left}</div>
          <div className="defense-middle position">{team.defense.middle}</div>
          <div className="defense-right position">{team.defense.right}</div>
        </div>
        <div className="midfield line">
          <div className="midfield-left position">{team.midfield.left}</div>
          <div className="midfield-middle position">{team.midfield.middle}</div>
          <div className="midfield-right position">{team.midfield.right}</div>
        </div>
        <div className="attack line">
          <div className="attack-left position">{team.attack.left}</div>
          <div className="attack-middle position">{team.attack.middle}</div>
          <div className="attack-right position">{team.attack.right}</div>
        </div>
      </div>
    </>
  );
}
