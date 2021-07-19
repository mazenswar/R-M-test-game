import { useContext, useState, useEffect } from 'react';
import {Context as HomeTeamContext} from '../context/HomeTeamContext';
import {Context as AwayTeamContext} from '../context/AwayTeamContext';
import { Context as GameContext} from '../context/GameContext';




function useGame() {
    const [moves, setMoves] = useState([])
    const [homeHealth, setHomeHealth] = useState(100);
    const [awayHealth, setAwayHealth] = useState(100);
    const [playerTurn, setPlayerTurn] = useState(true);
    const [gameOver, setGameOver] = useState(false);
    const [winner, setWinner] = useState(null);
    const { 
        state: {stats: awayStats},
        crippledOffense: awayCrippledOffense,
    } = useContext(AwayTeamContext);

    const {
        state: { homeStats }, 
        crippledOffense: homeCrippledOffense,
    } = useContext(HomeTeamContext);
    
    useEffect(() => {
        if(homeHealth < 0 || awayHealth < 0) {
            const winningTeam = homeHealth < 0 ? 'away' : 'home';
            setGameOver(true);
            setWinner(winningTeam);
        }
    }, [homeHealth, awayHealth])


    //damagePercentage (damage / defenseVal) * 100 
    // newHealth 
    /////////// CALCULATE DAMAGE;
    function damage(attackingValue) {
        const offset = 0.05;
        return attackingValue * offset;
    }
    //////////////// KEEP TRACK OF MOVES
    function addMove(team, move) {
        setMoves([...moves, {team: team, move: move}])
    }
    ////////////// DAMAGE MANAGMENT
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
            health = homeHealth;
        } else {
            debugger
            attackValue = homeStats.attack;
            defenseValue = awayStats.defense;
            setNewHealth = setAwayHealth;
            health = awayHealth;
        }
        /// LONGSHOT
        let damagePercentage = longShot ? 40 : (damage(attackValue) / defenseValue) * 100;
        const newHealth = health - damagePercentage;
        
        if(newHealth < 0 && !longShot) {
            addMove(attackingTeam, 'Successful Attack')
            setNewHealth(0);
            setGameOver(true);
            setWinner(attackingTeam)
        } else if (longShot && newHealth < 0) {
            addMove(attackingTeam, 'Successful Longshot')
            setNewHealth(0);
            setGameOver(true);
            setWinner(attackingTeam)
        } else  { 
            addMove(attackingTeam, 'Successful Attack')
            setNewHealth(newHealth);
        }
    }
    /////////////////// LONGSHOT //////////////////////
    function tryLongShot(defendingTeam) {
        const attackingTeam = defendingTeam === 'home' ?'away':'home';
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
            addMove(attackingTeam, 'Unsuccessful Longshot');
        }
    }
    ///////////////// FORTIFY DEFENSE //////////////////
    function fortifyDefense(defendingTeam) {
        let teamHealth, setTeamHealth;
        if(defendingTeam === 'home') {
            teamHealth = homeHealth;
            setTeamHealth = setHomeHealth;
        } else {
            teamHealth = awayHealth;
            setTeamHealth = setAwayHealth;
        }
        const newHealthVal = Math.floor(teamHealth + teamHealth * 0.03);
        setTeamHealth(newHealthVal);
        addMove(defendingTeam, 'fortified defense');
    }
    ////////////////////////////// AWAY MOVE /////////////////////
    function awayMove() {
        if (gameOver) return;
        setTimeout(async () => {
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
        }, 700);
    }


    function attack() {
        receiveDamage('away');
        
    }
    
/////////////// CRIPPP ////////////

function crippleOffense(attackingTeam) {
    attackingTeam === 'home' ? awayCrippledOffense() : homeCrippledOffense();
    addMove(attackingTeam,  "Crippled opponent's attack");
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