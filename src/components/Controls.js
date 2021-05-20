import React from 'react';
import useGame from '../hooks/useGame';

export default function Controls({ ground }) {
  const [attack] = useGame();
  return (
    <div>
      <button onClick={() => attack(ground)}>Attack</button>
      <button>Button2</button>
      <button>Button3</button>
      <button>Button4</button>
    </div>
  );
}
