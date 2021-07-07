import React from 'react';
import { Provider as HomeTeamProvider } from './context/HomeTeamContext';
import { Provider as AwayTeamProvider } from './context/AwayTeamContext';
import { Provider as GameContext } from './context/GameContext';
import './styles/master.scss';
import Home from './pages/Home';


export default function App() {
  return (
    <GameContext>
      <HomeTeamProvider>
        <AwayTeamProvider>
          <Home/>
        </AwayTeamProvider>
      </HomeTeamProvider>
    </GameContext>
  );
}


