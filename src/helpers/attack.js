function attack() {

}


function receiveDamage() {
    // damage = team attack value * 0.05
    // receving team defense = defense value - damage
}

function fortifyDefense() {
    // team defense value = team current defense value * 0.03
}

function longShot() {
    const magicNum = 7;
    const randRange = 300;
    let rand = Math.floor(Math.random() * randRange);
    const shotMade = rand === magicNum ? true : false;
    // if shot made: receiving team defense value = current defense value - (defenseValue * 30 /100);
    // else do nothing
}