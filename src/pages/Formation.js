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
          {formation.defense.map(p => renderDetails(p))}
        </div>
        <div className="midfield line">
          {formation.midfield.map(p => renderDetails(p))}
        </div>
        <div className="attack line">
        {formation.attack.map(p => renderDetails(p))}
        </div>
      </div>
  );
}
