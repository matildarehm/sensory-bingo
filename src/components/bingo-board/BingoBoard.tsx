// react imports
import React from 'react';

// project components + assets
import './BingoBoard.scss';
import { ConferenceDetails } from '../conference/conference.enum';
import { selectRow } from './BingoBoard.utils';
import WinModal from '../win-modal/WinModal';

// external libraries
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
                              props.boardState(selectRow(props.row, (value + 1), props.currentBoard));
                          }}>
                              <h5>{ squareName }</h5>
                              <h6>{ props.details[value] }</h6>
                          </div>
                      </Grid>
                  }
                  else if (props.row === "R5" && value === 4) {

                      // @ts-ignore
                      return <Grid  key={"S" + (value + 1)}  item xs={2}>
                          <div className={bingoBottom} id={ squareName.toLowerCase() } onClick={ () => {
                              props.boardState(selectRow(props.row, (value + 1), props.currentBoard));
                          }}>
                              <h5>{ squareName }</h5>
                              <h6>{ props.details[value] }</h6>
                          </div>
                      </Grid>
                  }
                  else {
                      return <Grid  key={"S" + (value + 1)}  item xs={2}>
                          <div className={"bingo-square"} id={ squareName.toLowerCase() } onClick={ () => {
                              props.boardState(selectRow(props.row, (value + 1), props.currentBoard));
                          }} style={{ backgroundColor: squareName.toLowerCase() === "r3s3" ? props.currentBoard.active : props.currentBoard.inactive }}>
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
    middleSquare.add(3);

    const [boardMatrix, setBoard] = React.useState({
        "R1": new Set(),
        "R2": new Set(),
        "R3": middleSquare,
        "R4": new Set(),
        "R5": new Set(),
        "active": "rgba(87, 165, 248, 0.7)",
        "inactive": "rgba(255, 255, 255, .1)",
        "bingoWins": [],
        "winState": false
    });

    const stateRef: any = React.useRef();
    stateRef.current = boardMatrix;

    return (
        <section className={"bingo-board"}>
            <canvas id={"bingo-win"}></canvas>
            <h1 id={"announce-bingo"} className={"bingo-announcement inactive"}>Bingo</h1>
            <div id={"bingo-options"} className={"inactive"}>
                <WinModal ></WinModal>
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


