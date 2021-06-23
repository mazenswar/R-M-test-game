import axios from 'axios';
import makeLevel from '../notes/playerCard';
import characters from '../testData';
import makeAttributes from '../helpers/makeAttributes';
import {Context as HomeContext} from '../context/HomeTeamContext';
import {Context as AwayContext} from '../context/AwayTeamContext';
import { useContext, useEffect } from 'react';

export default function useInitGame() {
    const {setSelectionPool: setHomePool} = useContext(HomeContext);
    const {setSelectionPool: setAwayPool} = useContext(AwayContext);
    // axios.get()
    // fetch

    // let twenty = [];
    // while (twenty.length !== 10) {
    //   let rando1 = randomNumber();
    //   twenty.includes(rando1) ? twenty.push(randomNumber()) : twenty.push(rando1);
    // }
    // fetch(`https://rickandmortyapi.com/api/character/${twenty}`).then......
        function init(){
        let charsWithAttr = characters.map(c => makeLevel(c))
        const twenty  = function() {
            let arr = [];
            while (arr.length !== 20) {
                let character =
                charsWithAttr[Math.floor(Math.random() * charsWithAttr.length)];
                if (!arr.some((i) => i.id === character.id)) {
                    const char = makeAttributes(character);
                    arr.push(char);
                }
            }
            return arr;
        }();
        const middle = Math.floor(twenty.length / 2);
        let half = twenty.splice(0, middle);
        setHomePool(half);
        setAwayPool(twenty);
    }
    return [init];
}
