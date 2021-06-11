import React, { useEffect } from 'react';

import TeamSheet from './TeamSheet';
import useGame from '../hooks/useGame';
import '../styles/master.scss';

export default function Ground() {
  const [, , , fetchChars] = useGame();

  useEffect(() => {
    fetchChars();
  }, []);

  return (
    <div className="ground-div" >
      <TeamSheet ground="Home"/>
      <TeamSheet ground="Away"/>
    </div>
  );
}
