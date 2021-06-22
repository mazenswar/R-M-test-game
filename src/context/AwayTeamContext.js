import createDataContext from './createDataContext';
import teamContext from './createTeamContext';

export const { Context, Provider } = createDataContext(
  teamContext.reducer,
  teamContext.actions,
  teamContext.teamInitialState
);
