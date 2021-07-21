import { useContext, useState, useEffect } from 'react';
import {Context as HomeTeamContext} from '../context/HomeTeamContext';
import {Context as AwayTeamContext} from '../context/AwayTeamContext';
import { Context as GameContext} from '../context/GameContext';




function useGame() {
    const [playerTurn, setPlayerTurn] = useState(true);
    const { 
        state: {stats: awayStats},
        setHealth: setAwayHealth,
        crippledOffense: awayCrippledOffense,
        addMove: awayAddMove
    } = useContext(AwayTeamContext);
    const {
        state: {stats: homeStats }, 
        setHealth: setHomeHealth,
        crippledOffense: homeCrippledOffense,
        addMove: homeAddMove
    } = useContext(HomeTeamContext);
    const {gameOver} = useContext(GameContext);

    /////////// CALCULATE DAMAGE;
    function damage(attackingValue) {
        const offset = 0.05;
        return attackingValue * offset;
    }
    ////////// DAMAGE MANAGMENT
    function receiveDamage(defendingTeam, longShot = false) {
        const attackingTeam = defendingTeam === 'home' ? 'away' : 'home';
        let attackValue;
        let defenseValue;
        let setNewHealth;
        let health;
        if(defendingTeam === 'home') {
            attackValue = awayStats.attack;
            defenseValue = homeStats.defense;
            setNewHealth = setHomeHealth;
            health = homeStats.health;
        } else {
            attackValue = homeStats.attack;
            defenseValue = awayStats.defense;
            setNewHealth = setAwayHealth;
            health = awayStats.health;
        }
        /// LONGSHOT
        let damagePercentage = longShot ? 40 : (damage(attackValue) / defenseValue) * 100;
        const newHealth = health - damagePercentage;
        // ADD MOVE FUNC
        const addMoveFunc = attackingTeam === 'home' ? homeAddMove : awayAddMove
        if(newHealth < 0 && !longShot) {
            addMoveFunc({type: 'Successful Attack'})
            setNewHealth(0);
            gameOver(attackingTeam)
        } else if (longShot && newHealth < 0) {
            addMoveFunc({type: 'Successful Longshot'})
            setNewHealth(0);
            gameOver(attackingTeam)
        } else  { 
            addMoveFunc({type: 'Successful Attack'})
            setNewHealth(newHealth);
        }
    }
    /////////////////// LONGSHOT //////////////////////
    function tryLongShot(defendingTeam) {
        const attackingTeam = defendingTeam === 'home' ?'away':'home';
        const addMoveFunc = attackingTeam === "home" ? homeAddMove : awayAddMove
        const magicNum = 7;
        const randRange = 15;
        let rand = Math.floor(Math.random() * randRange);
        const shotMade = rand === magicNum ? true : false;
        if (shotMade) {
            receiveDamage(defendingTeam, true);
            alert(`${attackingTeam} successful Longshot!!!`);
        }
        else 
        {
            alert('Unsuccessful Longshot');
            addMoveFunc({type: 'Unsuccessful Longshot'});
        }
    }
    ///////////////// FORTIFY DEFENSE //////////////////
    function fortifyDefense(defendingTeam) {
        let teamHealth, setTeamHealth, addMoveFunc;
        if(defendingTeam === 'home') {
            teamHealth = homeStats.health;
            setTeamHealth = setHomeHealth;
            addMoveFunc = homeAddMove;
            
        } else {
            teamHealth = awayStats.health;
            setTeamHealth = setAwayHealth;
            addMoveFunc = awayAddMove;
        }
        const newHealthVal = Math.floor(teamHealth + teamHealth * 0.03);
        setTeamHealth(newHealthVal);
        addMoveFunc({type: 'fortified defense'});
    }
    ////////////////////////////// AWAY MOVE /////////////////////
    function awayMove() {
        setTimeout(() => {
            const num = Math.floor(Math.random() * 20);
            if(num < 10) {
                // ATTACK
                receiveDamage('home');
                alert('Away Team Attacked!')
            }

            if (num > 10 && num <=12) {
                //LONGSHOT
                tryLongShot('home')

            }

            if(num > 12 && num < 16) {
                // FORTIFTY DEFENSE
                fortifyDefense('away');
                alert('Away Team Fortified Defense');
                
            }
            if(num >= 16) {
                crippleOffense();
                alert('AWAY TEAM CRIPPLED HOME ATTACK');
            } 
            setPlayerTurn(true);
        }, 500);
    }

    
/////////////// CRIPPP ////////////

function crippleOffense(attackingTeam) {
    if (attackingTeam === 'home'){
        awayCrippledOffense()  
        homeAddMove({type:"Crippled opponent's attack"});
    } else {
        homeCrippledOffense()  
        awayAddMove({type:"Crippled opponent's attack"})
    }
}

    //////////////////// HOME MOVE /////////////////////

    async function homeMove(move) {
        switch(move) {
            case 'attack':
                receiveDamage('away');
                break;
            case 'defense':
                fortifyDefense('home');
                break;
            case 'longshot':
                tryLongShot('away');
                break;
            case 'cripple':
                crippleOffense('home');
                break;
            default:
                return null;
        }
        await setPlayerTurn(false);
        awayMove();
    }
    
    // function receiveDamage() {
    //     // damage = team attack value * 0.05
    //     // receving team defense = defense value - damage
    // }
    
    

    return {homeMove, playerTurn}
}

export default useGame;