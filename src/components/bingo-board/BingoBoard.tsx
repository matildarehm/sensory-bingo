// react imports
import React from 'react';

// project components + assets
import './BingoBoard.scss';
import { ConferenceDetails } from '../conference/conference.enum';
import { selectRow, onEvent } from './BingoBoard.utils';
import WinModal from '../win-modal/WinModal';

// external libraries
import $ from "jquery";
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';

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
                              props.boardState(selectRow(props.row, squareName.toLowerCase(), props.currentBoard));
                          }}>
                              <h5>{ squareName }</h5>
                              <h6>{ props.details[value] }</h6>
                          </div>
                      </Grid>
                  }
                  else if (props.row === "R5" && value === 4) {
                      return <Grid  key={"S" + (value + 1)}  item xs={2}>
                          <div className={bingoBottom} id={ squareName.toLowerCase() } onClick={ () => {
                              props.boardState(selectRow(props.row, squareName.toLowerCase(), props.currentBoard));
                          }}>
                              <h5>{ squareName }</h5>
                              <h6>{ props.details[value] }</h6>
                          </div>
                      </Grid>
                  }
                  else {
                      return <Grid  key={"S" + (value + 1)}  item xs={2}>
                          <div className={"bingo-square"} id={ squareName.toLowerCase() } onClick={ () => {
                              props.boardState(selectRow(props.row, squareName.toLowerCase(), props.currentBoard));
                          }}>
                              <h5>{ squareName }</h5>
                              <h6>{ props.details[value] }</h6>
                          </div>
                      </Grid>
                  }

              })}
          </React.Fragment>
    );
}

export default function BingoBoard(this: any) {
    let middleSquare = new Set();
    middleSquare.add("r3s3");

    let [boardMatrix, setBoard] = React.useState({
        "R1": new Set(),
        "R2": new Set(),
        "R3": middleSquare,
        "R4": new Set(),
        "R5": new Set(),
        "active": "rgba(87, 165, 248, 0.7)",
        "inactive": "rgba(255, 255, 255, .1)",
        "bingoWins": [],
        "winState": false,
        "middleSquare": "r3s3"
    });

    const stateRef: any = React.useRef();
    stateRef.current = boardMatrix;

    React.useEffect(() => {
        window.addEventListener('click', (event) => { onEvent(stateRef.current) });
    });

    return (
        <section className={"bingo-board"}>
            <canvas id={"bingo-win"}></canvas>
            <h1 id={"announce-bingo"} className={"bingo-announcement inactive"}>Bingo</h1>
            <div id={"bingo-options"} className={"inactive"}>
                <WinModal></WinModal>
            </div>
            <Grid container>
                <Grid item xs={12} id={"grid-container"}>
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


