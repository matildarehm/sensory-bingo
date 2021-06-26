// project components + assets
import './BingoInstructions.scss';

export default function BingoInstructions() {
    return (
        <section className={"bingo-instructions"}>How to Play
            <ul>
                <li>A player wins by completing a row, column, or diagonal</li>
                <li>There's a free slot (always on) in the middle</li>
                <li>You can have multiple bingos</li>
            </ul>
        </section>
    );
}