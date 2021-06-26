// react imports
import React from 'react';

// project components + assets
import './BingoBoard.scss';
import { Howl, Howler } from 'howler';
import { ConferenceDetails } from '../conference/conference.enum';

// external libraries
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import { makeStyles, Paper } from '@material-ui/core';

const selectRow: any = (row: string, square: number, currentBoard: any) => {
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

const playAudio = () => {
    console.log("playing");
    var sound = new Howl({
        src: ['../../assets/music/lofi-beat.mp3'],
        autoplay: true,
        loop: true,
        volume: 0.5
    });
}

const setActiveColor = (name: string, active : boolean,  board: any)  => {
    let activeColor = board.inactive;
    if (active) { activeColor = board.active; }

    const squareElement = document.getElementById(name.toLowerCase())
    if (squareElement !== null) {
        squareElement.style.background = activeColor;
    }
}

function BingoRow(props: any) {
    const bingoTop = classNames('bingo-square', 'top-square');
    const bingoBottom = classNames('bingo-square', 'bottom-square');
    return (
          <React.Fragment>
              {[0, 1, 2, 3, 4].map((value) => {
                  let squareName = props.row + "S" + (value + 1);
                  if (props.row === "R1" && value === 4) {
                     return <Grid  key={"S" + (value + 1)}  item xs={2}>
                          <div className={bingoTop} id={ squareName.toLowerCase() } onClick={ () => {
                              let row : string = props.row;
                              props.boardState(selectRow(props.row, (value + 1), props.currentBoard))}}>
                              <h5>{ squareName }</h5>
                              <h6>{ props.details[value] }</h6>
                          </div>
                      </Grid>
                  }
                  else if (props.row === "R5" && value == 4) {
                      return <Grid  key={"S" + (value + 1)}  item xs={2}>
                          <div className={bingoBottom} id={ squareName.toLowerCase() } onClick={ () => {
                              let row : string = props.row;
                              props.boardState(selectRow(props.row, (value + 1), props.currentBoard))}}>
                              <h5>{ squareName }</h5>
                              <h6>{ props.details[value] }</h6>
                          </div>
                      </Grid>
                  }
                  else {
                      return <Grid  key={"S" + (value + 1)}  item xs={2}>
                          <div className={"bingo-square"} id={ squareName.toLowerCase() } onClick={ () => {
                              let row : string = props.row;
                              props.boardState(selectRow(props.row, (value + 1), props.currentBoard))}}
                               style= {{ backgroundColor: squareName.toLowerCase() === "r3s3" ? props.currentBoard.active : props.currentBoard.inactive }}>
                              <h5>{ squareName }</h5>
                              <h6>{ props.details[value] }</h6>
                          </div>
                      </Grid>
                  }

              })}
          </React.Fragment>
    );
}

export default function BingoBoard() {
    playAudio()
    const bingoHeading = classNames('bingo-title', 'rotate-transform');
    let middleSquare = new Set();
    middleSquare.add(3);


    const [boardMatrix, setBoard] = React.useState({
        "R1": new Set(),
        "R2": new Set(),
        "R3": middleSquare,
        "R4": new Set(),
        "R5": new Set(),
        "active": "rgb(129, 217, 180, 0.5)",
        "inactive": "rgba(255, 255, 255, .1)"
    });

    const stateRef: any = React.useRef();
    stateRef.current = boardMatrix;

    return (
        <section className={"bingo-board"}>
            <aside className={bingoHeading}>
                <h3>Video Conference Bingo </h3>
            </aside>
            <Grid container>
                <Grid item xs={12}>
                    {[1, 2, 3, 4, 5].map((value) => (
                        <Grid justify={"center"} container key={"R" + value}>
                            <BingoRow currentBoard={stateRef.current} boardState={setBoard} row={"R" + value} details={Object.values(ConferenceDetails).slice((value - 1) * 5 , (value * 5))}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </section>
    );
}


