import React from 'react';
import Background from './assets/images/abstract-gradient-4.jpg';
import './App.css';
import BingoBoard from './components/bingo-board/BingoBoard';

var sectionStyle = {
    width: "100%",
    height: "100vh",
    zIndex: 0,
    backgroundImage: `url(${ Background })`,
    backgroundSize: 'cover'
};

function App() {
  return (
    <section className="bingo-main" style={ sectionStyle }>
        <article className="board">
            <BingoBoard/>
        </article>
    </section>
  );
}

export default App;
