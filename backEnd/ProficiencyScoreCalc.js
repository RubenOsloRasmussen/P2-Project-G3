
// function: Proficiencyscore calc
// gets amount of error episodes, and time (in seconds) taken while doing sudoku.
// calculates how well they completed the given task,
// then adds / subtracts points from their proficiency score
// returns their new proficiency score.

function profScoreCalc(userScore, err, time) {
    //let response = await fetch("./proficiencyScoreCalc.txt");

    //if (!response.ok) {
    //    console.error("Error: couldn't load data", response.status);
    //    return null;
    //}

    //let userScore = await response.text();

    //the numbers in this equation make it so that:
    //being under 15 min gives a score aproaching +1
    //~4 min gives a score of +0.5
    //~15 min gives a score of 0
    //~1 hour gives a score of -1
    let timeScore = 1 - Math.min(Math.sqrt(time / 60 * 0.07), 2)

    //the numbers in this equation make it so that:
    //having 0 errors gives a score of +0.5
    //having 1 error gives a score of +0.25
    //having 4 errors gives a score of -0.5
    //having 6+ errors gives a score of -1
    let errScore = 0.5 - Math.min(err * 0.25, 1.5)

    let finScore = Math.max(Math.min(
        userScore + Math.max(Math.min(
            timeScore + errScore,
            1), -1),
        10), 0)

    return finScore;
}



// function sudokuLevel
// gets given proficiency score and amount of Sudokupuzzles.
// uses this to make a percentile (how far to the most difficult sudoku you are)
// use a psuedo random number to skew this a bit forward or backwards.
// returns the number for the sudokustring in the array, that is to be used.
function sudokuLevel(userScore, stringAmount) {
    let stringNumber = 0;

    //
    stringNumber = Math.max(Math.min(
        Math.floor(stringAmount * userScore / 10),
        stringAmount - 5), 5);

    //Randomises the given sudoku between the closest 10 sudokus
    stringNumber = Math.round(
        stringNumber + (5 - Math.random() * 10)
    );

    return stringNumber;
}

//for (var l = 0; l < stringArr.length; l++) {
//    if (stringArr[l][0] == undefined) {
//        console.log(l)
//        console.log(stringArr[l][0])
//        break;
//    }
//}