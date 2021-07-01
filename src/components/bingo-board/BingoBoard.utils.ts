import { runBingoAnimation } from "../confetti/confetti.utils"
import click  from '../../assets/sounds/click-sound.wav';
import win  from '../../assets/sounds/winning-sounds.wav';

export const selectRow: any = (row: string, square: number, currentBoard: any) => {
    console.log(currentBoard);
    let audio = new Audio(click);
    audio.play()

    let rowSet = currentBoard[row];
    if (rowSet.has(square)) {
        rowSet.delete(square);
        setActiveColor(row + "S" + square, false, currentBoard);
    } else {
        rowSet.add(square);
        setActiveColor(row + "S" + square, true, currentBoard);
    }

    console.log("last check for win!", checkForWin(row, square, currentBoard));

    currentBoard["bingoWins"] = checkForWin(row, square, currentBoard);
    currentBoard["winState"] = currentBoard["bingoWins"].length > 0 ? true : false;
    return currentBoard;
}

const verticalBingoSet = (row1: any, row2: any) => {
    return new Set([...row1].filter((x: any) => row2?.has(x)));
}

function countInArray(arr: string | any[], item: any) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            count++;
        }
    }
    return count;
}

const checkBingo = (matrix: any, wins: []) => {
    let revisedWins: any[] = [];
    console.log("in check bingo", matrix, wins);
    wins.map((w) => {

        if (matrix.length === 0 ) { revisedWins.push(w); }
        else if (!matrix.includes(w)) { revisedWins.push(w); }

        if (countInArray(matrix, w) < countInArray(wins, w)) { revisedWins.push(w); }

    });
    console.log(revisedWins);

    return revisedWins;
}

const checkForWin = (row : string, square: number, rowMatrix: any) => {
    let bingoWins : any = [];
    const SAME_ROW = "bingo! (same row)";
    const SAME_COLUMN = "bingo! (same column)";
    const LEFT_DIAGONAL = "bingo! (left diagonal)";
    const RIGHT_DIAGONAL = "bingo! (right diagonal)";

    /* if s1 - s5 with same row (horizontal) */
    if (rowMatrix[row].size === 5) { bingoWins.push(SAME_ROW); }

    /* if same # square in all rows (vertical) */
    // @ts-ignore
    let currSet : Set  = new Set([...rowMatrix["R1"]].filter(x => rowMatrix["R2"].has(x)));
    for ( let x = 2; x < 5; x++ ) {
        currSet =   verticalBingoSet(rowMatrix["R" + (x+1)], currSet);
    }
    for (let j = 0; j < currSet.size; j++) { bingoWins.push(SAME_COLUMN); }

    /* if all rows share the same # for all squares (left diagonal) */
    let rowShare = true;
    for ( let x = 0; x < 5; x++ ) {
        if (!rowMatrix["R" + (x + 1)].has(x + 1)) {
            rowShare = false;
        }
    }
    if (rowShare) { bingoWins.push(LEFT_DIAGONAL); }


    /* if number of square and number of row = 6 (right diagonal) */
    let row6 = true;
    for ( let x = 0; x < 5; x++ ) {
        let currRow = x + 1;
        let diff = 6 - currRow;
        if (!rowMatrix["R" + currRow].has(diff)) {
            row6 = false;
        }
    }
    if (row6) { bingoWins.push(RIGHT_DIAGONAL); }

    announceWin(checkBingo(rowMatrix["bingoWins"], bingoWins));
    return bingoWins;
}


// @ts-ignore
function announceWin (bingoWins: any[]) {
    const confettiWins = document.getElementById("bingo-win");

    if (confettiWins != null && bingoWins.length > 0) {
        let audio = new Audio(win);
        audio.play()
        confettiWins.classList.add("announce-win");

        const bingoAnnounce = document.getElementById("announce-bingo");
        const bingoOptions = document.getElementById("bingo-options");
        if (bingoOptions != null || bingoAnnounce != null) {
            runBingoAnimation();
            confettiWins.classList.remove("inactive");
            bingoAnnounce.classList.remove("inactive");
            bingoOptions.classList.remove("inactive");
        }
    }

    return [];
}

const setActiveColor = (name: string, active : boolean,  board: any)  => {
    let activeColor = board.inactive;
    if (active) { activeColor = board.active; }

    const squareElement = document.getElementById(name.toLowerCase())
    if (squareElement !== null) {
        squareElement.style.background = activeColor;
    }
}