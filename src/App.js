import React from 'react';
import Ground from './pages/Ground';
import { Provider as HomeTeamProvider } from './context/HomeTeamContext';
import { Provider as AwayTeamProvider } from './context/AwayTeamContext';
import { Provider as GameContext } from './context/GameContext';
// import { Context as HomeTeamContext } from './context/HomeTeamContext';
import './styles/master.scss';
import TestPageTwo from './pages/TestPageTwo';

export default function App() {
  return (
    <GameContext>
      <HomeTeamProvider>
        <AwayTeamProvider>
          <TestPageTwo />
        </AwayTeamProvider>
      </HomeTeamProvider>
    </GameContext>
  );
}

{
  /* <Ground /> */
}

