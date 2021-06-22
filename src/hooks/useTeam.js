const useTeam = (teamArr, formationObj) => {
  const formationValue = function() {
    // This function returns the number of players in each line (defense,  midfield, attack)
    const formation = {
      defense: 0,
      midfield: 0,
      attack: 0,
    };
    let array = Object.entries(formationObj);
    // array = [
    //   ["defense", {left: val, middle: val, right: val}],
    //   ["midfield", {left: val, middle: val, right: val}],
    //   ["attack", {left: val, middle: val, right: val}]
    //  ]
    array.forEach((arr) => {
      if (arr[1].left !== null) formation[arr[0]] += 1;
      if (arr[1].middle !== null) formation[arr[0]] += 1;
      if (arr[1].right !== null) formation[arr[0]] += 1;
    });
    return formation;
  }();
  function teamChemistry() {
    // total charisma
    return (
      teamArr.reduce((sum, player) => sum + player.charisma, 0) / teamArr.length
    );
  }

  /// Attack
  function attackValue() {
    
    const totalAttackValue = teamArr.reduce(
      (sum, player) => (sum += player.attack),
      0
    );
    return (totalAttackValue * (formationValue.midfield + formationValue.attack)) / 10;
  }
  // Defense
  function defenseValue() {
    
    const totalDefenseValue = teamArr.reduce(
      (sum, player) => (sum += player.defense),
      0
    );
    if (formationValue.defense === 0) {
      return 50;
    }
    return (totalDefenseValue * (formationValue.defense + formationValue.midfield)) / 10;
  }

  
  // HOOK RETURN
  return {defenseValue, attackValue, teamChemistry, formationValue};
  // return {
    //defenseValue, attackValue, teamChemistry, formationValue
  //}
};

export default useTeam;
