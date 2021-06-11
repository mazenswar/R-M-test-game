import React, { useContext } from 'react';
import { Context as HomeTeamContext } from '../context/HomeTeamContext';
import { Context as AwayTeamContext } from '../context/AwayTeamContext';
import useTeam from '../hooks/useTeam';
import StatBar from '../components/StatBar';

export default function Formation({ ground }) {
  const TeamContext = ground === 'Home' ? HomeTeamContext : AwayTeamContext;
  const {
    state: { formation },
  } = useContext(TeamContext);
  function renderDetails(player) {
    if (!!!player) return null;
    return player.name;
  }
  return (
   
      <div className="grid formation">
        <div className="defense line">
          <div className="defense-left position">
            {renderDetails(formation.defense.left)}
          </div>
          <div className="defense-middle position">
            {renderDetails(formation.defense.middle)}
          </div>
          <div className="defense-right position">
            {renderDetails(formation.defense.right)}
          </div>
        </div>
        <div className="midfield line">
          <div className="midfield-left position">
            {renderDetails(formation.midfield.left)}
          </div>
          <div className="midfield-middle position">
            {renderDetails(formation.midfield.middle)}
          </div>
          <div className="midfield-right position">
            {renderDetails(formation.midfield.right)}
          </div>
        </div>
        <div className="attack line">
          <div className="attack-left position">
            {renderDetails(formation.attack.left)}
          </div>
          <div className="attack-middle position">
            {renderDetails(formation.attack.middle)}
          </div>
          <div className="attack-right position">
            {renderDetails(formation.attack.right)}
          </div>
        </div>
      </div>
  );
}
