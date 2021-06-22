import { useContext } from "react";
import HomeContext from '../context/HomeTeamContext';
import AwayContext from '../context/AwayTeamContext';
function useControls(ground) {
    const TeamContext = ground === 'Home' ? HomeContext : AwayContext;   
    const {} = useContext(TeamContext)
    /// ATTACK FUNCTIONS
    async function attack(ground) {
    const offest = 0.10;
    if (team === 'Home') {
        let damage = homeattackValue() * offest;
        await homeAttack(damage);
        if (awayHealth < 0) {
        console.log('here');
        endGame('Home');
        }
    } else {
        let damage = awayattackValue() * offest
        await awayAttack(damage);
        if (homeHealth < 0) {
        endGame('Away');
        }
    }
    }
}