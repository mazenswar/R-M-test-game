import { useContext } from 'react';
import {Context as HomeTeamContext} from '../context/HomeTeamContext';
import {Context as AwayTeamContext} from '../context/AwayTeamContext';

function useControls() {

    const { 
        state: {stats: awayStats},
        receiveDamage: awayReceiveDamage, 
        receiveLongShot: awayReceiveLongShot, 
        receiveInjury: awayReceiveInjury 
    } = useContext(AwayTeamContext);

    const {state: {stats}, fortifyDefense} = useContext(HomeTeamContext);

    function attack() {
        const damage = stats.attack * 0.05;
        awayReceiveDamage(damage);
    }
    
    
    // function receiveDamage() {
    //     // damage = team attack value * 0.05
    //     // receving team defense = defense value - damage
    // }
    
    
    function longShot() {
        const magicNum = 7;
        const randRange = 15;
        let rand = Math.floor(Math.random() * randRange);
        const shotMade = rand === magicNum ? true : false;
        // if shot made: receiving team defense value = current defense value - (defenseValue * 30 /100);
        // else do nothing
        if (shotMade) {
            alert('LOOOONG SHOT')
            awayReceiveLongShot()
        };
    }

    return {attack, fortifyDefense, longShot}
}

export default useControls;