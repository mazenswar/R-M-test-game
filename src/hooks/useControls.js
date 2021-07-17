import { useContext } from 'react';
import {Context as HomeTeamContext} from '../context/HomeTeamContext';
import {Context as AwayTeamContext} from '../context/AwayTeamContext';
import {Context as GameContext} from '../context/GameContext';

function useControls() {
    const {changeTurn} = useContext(GameContext);
    const { 
        state: {stats: awayStats},
        receiveDamage: awayReceiveDamage, 
        receiveLongShot: awayReceiveLongShot, 
        fortifyDefense: awayFortifyDefense,
        crippledOffense: awayCrippledOffense,
        addMove: addAwayMove 
    } = useContext(AwayTeamContext);

    const {
        state: {stats}, 
        fortifyDefense,
        receiveDamage,
        receiveLongShot,
        crippledOffense,
        addMove
    } = useContext(HomeTeamContext);

    async function awayMove() {
        setTimeout(async () => {
            const num = Math.floor(Math.random() * 20);
            if(num < 10) {
                // ATTACK
                const damage = awayStats.attack * 0.05;
                receiveDamage(damage);
                addAwayMove({type: 'Attack'})
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
                    addAwayMove({type: 'Successful Longshot'})
                } else {
                    alert('AWAY TEAM ATTEMPTED LONG SHOT')
                    addAwayMove({type: 'unsuccessful Longshot'})
                }

            }

            if(num > 12 && num < 16) {
                // FORTIFTY DEFENSE
                awayFortifyDefense();
                alert('AWAY TEAM FORTIFIED DEFENSE');
                addAwayMove({type: 'Fortified defense'});
            }
            if(num >= 16) {
                crippledOffense();
                alert('AWAY TEAM CRIPPLED HOME ATTACK');
                addAwayMove({type: "Crippled Opponent's attack"});
            } 
            await changeTurn();
        }, 700);
    }


    async function attack() {
        const damage = stats.attack * 0.05;
        awayReceiveDamage(damage);
        addMove({type: `Attack with ${damage} damage`});
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
            addMove({type: 'Successful Longshot'})
        } else {
            addMove({type: 'Unsuccessful Longshot'})
            await changeTurn();
            // AWAY TURN
            awayMove();
        }
    }

    async function fortifyHomeDefense() {
        fortifyDefense();
        addMove({type: 'Fortified defense'});
        await changeTurn();
        // AWAY TURN
        awayMove();
    }
    
    async function crippleOffense() {
        awayCrippledOffense();
        addMove({type: "Crippled opponent's attack"});
        await changeTurn();
        awayMove()
    }

    return {attack, fortifyHomeDefense, longShot, crippleOffense}
}

export default useControls;