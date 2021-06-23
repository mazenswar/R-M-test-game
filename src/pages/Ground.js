import React, { useEffect } from 'react';
import TeamSheet from './TeamSheet';
import useGame from '../hooks/useGame';
import '../styles/master.scss';
import useInitGame from '../hooks/useInitGame'
import TestPage from './TestPage'
export default function Ground() {
  const [init] = useInitGame()

  useEffect(() => {
    init();
  }, []);

  return (
    <main className="ground-div" >
      <TestPage ground="Home"/>
      
      <TestPage ground="Away"/>
    </main>
  );
}
