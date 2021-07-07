import { useContext } from 'react';
import {Context as HomeTeamContext} from '../context/HomeTeamContext';
import {Context as AwayTeamContext} from '../context/AwayTeamContext';
import {Context as GameContext} from '../context/GameContext';

function useControls() {
    const {changeTurn} = useContext(GameContext);

    async function awayMove() {
        
        setTimeout(() => {
            const num = Math.floor(Math.random() * 20);
            if(num < 10) {
                // ATTACK
                const damage = awayStats.attack * 0.05;
                receiveDamage(damage);
                alert('AWAY TEAM ATTACKED')
            }

            if (num > 10 && num <=12) {
                //LONGSHOT
                const magicNum = 7;
                const randRange = 15;
                let rand = Math.floor(Math.random() * randRange);
                const shotMade = rand === magicNum ? true : false;
                // if shot made: receiving team defense value = current defense value - (defenseValue * 30 /100);
                // else do nothing
                if (shotMade) {
                    alert('LOOOONG SHOT')
                    receiveLongShot()
                };
                alert('AWAY TEAM ATTEMPTED LONG SHOT')

            }

            if(num > 12) {
                // FORTIFTY DEFENSE
                awayFortifyDefense();
                alert('AWAY TEAM FORTIFIED DEFENSE')
            } 
            changeTurn();
        }, 1000);
    }

    const { 
        state: {stats: awayStats},
        receiveDamage: awayReceiveDamage, 
        receiveLongShot: awayReceiveLongShot, 
        fortifyDefense: awayFortifyDefense 
    } = useContext(AwayTeamContext);

    const {
        state: {stats}, 
        fortifyDefense,
        receiveDamage,
        receiveLongShot,
    } = useContext(HomeTeamContext);

    async function attack() {
        const damage = stats.attack * 0.05;
        awayReceiveDamage(damage);
        await changeTurn();
        // AWAY TURN
        awayMove();
    }
    
    
    // function receiveDamage() {
    //     // damage = team attack value * 0.05
    //     // receving team defense = defense value - damage
    // }
    
    
    async function longShot() {
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
        await changeTurn();
        // AWAY TURN
        awayMove();
    }

    async function fortifyHomeDefense() {
        fortifyDefense();
        await changeTurn();
        // AWAY TURN
        awayMove();
    }

    return {attack, fortifyHomeDefense, longShot}
}

export default useControls;