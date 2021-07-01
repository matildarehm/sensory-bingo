import React from 'react';
import './App.css';
import BingoBoard from './components/bingo-board/BingoBoard';
import BingoInstructions from './components/bingo-instructions/BingoInstructions';


var sectionStyle = {
    width: "100%",
    height: "100vh",
    zIndex: 0,
    backgroundSize: 'cover'
};

function App() {
  return (
    <section className="bingo-main" style={ sectionStyle }>
        <article className="board">
            <BingoBoard/>
        </article>
        <article className="instructions">
            <BingoInstructions/>
        </article>
    </section>
  );
}

export default App;
