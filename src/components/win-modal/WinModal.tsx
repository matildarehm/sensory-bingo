// project components + assets
import './WinModal.scss';
import shuffled from './WinModal.utils'
import unlock  from '../../assets/sounds/unlock-sounds.wav';
import shuffle  from '../../assets/sounds/shuffle-sound.wav';

// external libraries
import $ from "jquery";
import RepeatIcon from '@material-ui/icons/Repeat';
import ReplayIcon from '@material-ui/icons/Replay';

function playAudio(uri: string) {
    new Audio(uri).play();
}

function playAgain() {
    $("#announce-bingo").addClass('inactive');
    $("#bingo-options").addClass('inactive');
    $("#bingo-win").addClass('inactive');
    playAudio(unlock);
};

function shuffleBoard() {
    $("#announce-bingo").addClass('inactive');
    $("#bingo-options").addClass('inactive');
    $("#bingo-win").addClass('inactive');
    playAudio(shuffle);
    shuffled();
};

export default function WinModal() {
    return (
        <div className={"win-choose"}>
            <button className={"play-again win-option" } style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }} onClick={ () => { playAgain() }}>
                <ReplayIcon className={"play-icon"}/>
                <h3 className={"play-option"}>Continue Playing</h3>
            </button>
            <button className={"shuffle win-option"} style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
            }} onClick={ () => { shuffleBoard() }}>
                <RepeatIcon className={"play-icon"}/>
                <h3 className={"play-option"}>Shuffle</h3>
            </button>
        </div>

    );
}
