// project components + assets
import { runBingoAnimation } from "../confetti/confetti.utils"
import click  from '../../assets/sounds/click-sound.wav';
import win  from '../../assets/sounds/winning-sounds.wav';

// external libraries
import $ from "jquery";

function playAudio(uri: string) {
    new Audio(uri).play();
}

function checkShuffle(board: any) {
    if  ($(".shuffle").hasClass("shuffled")) {
        board = {
            "R1": new Set(),
            "R2": new Set(),
            "R3": new Set(),
            "R4": new Set(),
            "R5": new Set(),
            "active": "rgba(87, 165, 248, 0.7)",
            "inactive": "rgba(255, 255, 255, .1)",
            "bingoWins": [],
            "winState": false,
            "middleSquare": board["middleSquare"]
        };

        board["R3"].add(board["middleSquare"]);
        $(".shuffle").removeClass("shuffled");
        return board
    }
    return board;
}

export const selectRow: any = (row: string, squareName: string, currentBoard: any) => {
    playAudio(click)

    const currentMatrix = getCurrentMatrix(currentBoard);
    currentBoard = checkShuffle(currentBoard)

    let rowSet = currentBoard[row];
    if (rowSet.has(squareName)) {
        rowSet.delete(squareName);
        setActiveColor(squareName, false, currentBoard);
    } else {
        rowSet.add(squareName);
        setActiveColor(squareName, true, currentBoard);
    }

    currentBoard["bingoWins"] = checkForWin(currentMatrix, currentBoard);
    currentBoard["winState"] = currentBoard["bingoWins"].length > 0 ? true : false;
    return currentBoard;
}

/* get current matrix for grid irrespective of shuffling + different winning possibilities */
const  getCurrentMatrix = (board: any) => {
    let divs = $('#grid-container > div').children();
    let size = divs.length;
    let columns = 5;
    // @ts-ignore
    var clone = divs.slice();

    let rowWin = [];
    let columnWin: string[][] = [[], [], [], [], []];
    let newRow: any[] = [];
    let leftDiagonal = [];
    let rightDiagonal = [];
    let middleSquare = "";

    for(let i = 0; i < size; i++) {
        var currColumn = Math.floor(i/columns);
        let rightIndex = (5 -  currColumn);
        let leftIndex = (currColumn + 1);


        let square = $(clone[i]).children()[0]
        let currId = $(square).attr('id');
        newRow.push(currId)
        if (currColumn === 2 && (i + 1) % 5 === 3) {
            middleSquare =  currId;
        }

        if ((i + 1) % 5 === 0) {
            rowWin.push(newRow);
            newRow = []
            columnWin[4].push(currId);
            if (leftIndex === 5) { leftDiagonal.push(currId); }
            if (rightIndex === 5) {  rightDiagonal.push(currId); }
        }
        else if ((i + 1) % 5 === 1) {
            columnWin[0].push(currId);
            if (leftIndex === 1) { leftDiagonal.push(currId); }
            if (rightIndex === 1) {  rightDiagonal.push(currId); }
        }
        else if ((i + 1) % 5 === 2) {
            columnWin[1].push(currId);
            if (leftIndex === 2) { leftDiagonal.push(currId); }
            if (rightIndex === 2) {  rightDiagonal.push(currId); }
        }
        else if ((i + 1) % 5 === 3) {
            columnWin[2].push(currId);
            if (leftIndex === 3) { leftDiagonal.push(currId); }
            if (rightIndex === 3) {  rightDiagonal.push(currId); }
        }
        else if ((i + 1) % 5 === 4) {
            columnWin[3].push(currId);
            if (leftIndex === 4) { leftDiagonal.push(currId); }
            if (rightIndex === 4) {  rightDiagonal.push(currId); }
        }
    }

    const squareElement = document.getElementById(middleSquare)
    if (squareElement !== null) { squareElement.style.background =  "rgba(87, 165, 248, 0.7)" }
    board["middleSquare"] = middleSquare;
    board["R3"].add(middleSquare);

    return [rowWin, columnWin, leftDiagonal, rightDiagonal, board];
}

// basic utilities
const isEqual = (arr1: any[], arr2: string | any[]) => {
    return arr1.length === arr2.length && arr1.every((value, index) => value === arr2[index])
}

function countInArray(arr: string | any[], item: any) {
    var count = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) { count++; }
    }
    return count;
}

const checkBingo = (matrix: any, wins: []) => {
    let revisedWins: any[] = [];
    wins.forEach((w) => {
        if (matrix.length === 0 ) { revisedWins.push(w); }
        else if (!matrix.includes(w)) { revisedWins.push(w); }
        if (countInArray(matrix, w) < countInArray(wins, w)) { revisedWins.push(w); }
    });
    return revisedWins;
}

/* checks that row array are exactly the same as winning row */
const checkRow = (matrix: any, winningRow: []) => {
    const allRows = ["R1", "R2", "R3", "R4", "R5"]
    let rowWins = 0;
    allRows.forEach(row => {
        let currRow = Array.from(matrix[row]);
        if (row === "R3") { currRow.sort() }
        if (isEqual(currRow, winningRow)) { rowWins++ }
    });
    return rowWins;
}

/* checks that all elements in winning array are located in current grid */
const checkArr = (matrix: any, winningRow: []) => {
    const allRows = ["R1", "R2", "R3", "R4", "R5"]
    let colCount = 0
    winningRow.forEach(square => {
        allRows.forEach(row => {
            if (matrix[row].has(square)) { colCount++ }
        });
    });
    return colCount === 5;
}

const checkForWin = (gridMatrix: any, rowMatrix: any) => {
    let bingoWins : any = [];
    const SAME_ROW = "bingo! (same row)";
    const SAME_COLUMN = "bingo! (same column)";
    const LEFT_DIAGONAL = "bingo! (left diagonal)";
    const RIGHT_DIAGONAL = "bingo! (right diagonal)";

    /* check if row matches any of the expected rows in the grid Matrix */
    gridMatrix[0].forEach((hRow: []) => {
        let allWins = checkRow(rowMatrix, hRow);
        for (let x = 0; x < allWins; x++) { bingoWins.push(SAME_ROW); }
    });

    /* check if cols matches any of the expected cols in the grid Matrix */
    gridMatrix[1].forEach((vCol: []) => {
        if (checkArr(rowMatrix, vCol) === true) { bingoWins.push(SAME_COLUMN); }
    });

    /* check left diagonal array */
    if (checkArr(rowMatrix, gridMatrix[2]) === true) { bingoWins.push(LEFT_DIAGONAL); }


    /* if number of square and number of row = 6 (right diagonal) */
    if (checkArr(rowMatrix, gridMatrix[3]) === true) { bingoWins.push(RIGHT_DIAGONAL); }

    announceWin(checkBingo(rowMatrix["bingoWins"], bingoWins));
    return bingoWins;
}

function announceWin (bingoWins: any[]) {
    const confettiWins = document.getElementById("bingo-win");

    if (confettiWins != null && bingoWins.length > 0) {
        playAudio(win);
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
}

const setActiveColor = (name: string, active : boolean,  board: any)  => {
    let activeColor = board.inactive;
    if (active === true) { activeColor = board.active; }

    const squareElement = document.getElementById(name)
    if (squareElement !== null) { squareElement.style.background = activeColor; }
}

export function onEvent(board: any) {
    let currentState = getCurrentMatrix(board);
    let $shuffled = false ;
    $(".shuffle").click(function(event){
        event.preventDefault();
        const squareElements = document.querySelectorAll(".bingo-square");

        $shuffled = true;
        if (checkStatus()) { $(".shuffle").addClass("shuffled") }

        squareElements.forEach((el ) => {
            (el as HTMLElement).style.background = board.inactive;
        });
    });

    function checkStatus() { return $shuffled }
}