import React from 'react';

export default function StatBar({
  health,
  formationVal,
  teamChemistry,
  defenseValue,
  attackValue,
}) {
  return (
    <div className="stat-bar">
      <h1>Health: {health}</h1>
      <h1>
        Formation =={'>'} {formationVal.defense} - {formationVal.midfield} -{' '}
        {formationVal.attack}
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
    </div>
  );
}
