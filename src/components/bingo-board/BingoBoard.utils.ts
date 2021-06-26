export const selectRow: any = (row: string, square: number, currentBoard: any) => {
    console.log(String(row), String(square));
    console.log(currentBoard);

    let rowSet = currentBoard[row];
    if (rowSet.has(square)) {
        rowSet.delete(square);
        setActiveColor(row + "S" + square, false, currentBoard);
    } else {
        rowSet.add(square);
        setActiveColor(row + "S" + square, true, currentBoard);
    }

    console.log(currentBoard)


    checkForWin(row, square, currentBoard);
    return currentBoard;
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
    let sameSquare = true;
    // @ts-ignore
    let currSet : Set  = new Set([...rowMatrix["R1"]].filter(x => rowMatrix["R2"].has(x)));
    for ( let x = 2; x < 5; x++ ) {
        console.log("R" + (x+1), currSet);
        currSet =  new Set([...rowMatrix["R" + (x+1)]].filter((x: any) => currSet?.has(x)));
    }
    if (currSet.size >= 1) { bingoWins.push(SAME_COLUMN); }

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

    announceWin(bingoWins)
}

function announceWin (bingoWins: []) {
    let allWins = "";
    bingoWins.forEach( win => {
        allWins = allWins.concat(win + "\n");
    });
    bingoWins.length > 0 ? alert(allWins) : console.log("no win");
}

const setActiveColor = (name: string, active : boolean,  board: any)  => {
    let activeColor = board.inactive;
    if (active) { activeColor = board.active; }

    const squareElement = document.getElementById(name.toLowerCase())
    if (squareElement !== null) {
        squareElement.style.background = activeColor;
    }
}