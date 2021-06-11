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
      <h4>Health: {health}</h4>
      <h4>
        Formation =={'>'} {formationVal.defense} - {formationVal.midfield} -{' '}
        {formationVal.attack}
      </h4>
      <h4>
        Chemistry =={'>'} {teamChemistry()}
      </h4>
      <h4>
        Defense =={'>'} {defenseValue()}
      </h4>
      <h4>
        Attack =={'>'} {attackValue()}
      </h4>
    </div>
  );
}
