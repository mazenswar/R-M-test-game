import React, { useEffect } from 'react';

import TeamSheet from './TeamSheet';
import '../styles/master.scss';

import useGame from '../hooks/useGame';
export default function Ground() {
  const [, , , fetchChars] = useGame();

  useEffect(() => {
    fetchChars();
  }, []);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div style={{ gridColumn: 1 }} className="team" id="home-team-div">
        <TeamSheet ground={'Home'} />
      </div>
      <div style={{ gridColumn: 2 }} className="team" id="away-team-div">
        <TeamSheet ground={'Away'} />
      </div>
    </div>
  );
}
