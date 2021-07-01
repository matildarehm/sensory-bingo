
import Shuffle from 'shufflejs';
import $ from "jquery";

export default function shuffled() {
    // var windowShuffle = window.Shuffle;
    // var element = document.querySelector('.grid-container');
    // // @ts-ignore
    // var bingoGrid = new Shuffle(element, {
    //     itemSelector: '.bingo-square',
    //     group: Shuffle.ALL_ITEMS,
    //     filterMode: Shuffle.FilterMode.ANY,
    //     speed: 500,
    //     easing: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
    //
    // });
    // bingoGrid.filter(Shuffle.ALL_ITEMS)

    var parent = $('#grid-container');
    var rows = parent.children();
    var divs = $('#grid-container > div').children();
    // @ts-ignore
    var size = divs.length;
    console.log(rows, size);
    var column = 5;
    // @ts-ignore
    var clone = divs.slice();
    console.log(clone)

    for(var i=0; i<size; i++) {
        var t = Math.floor(i/column);
        // @ts-ignore
        $(rows[t]).append(clone.splice(Math.floor(Math.random() * clone.length), 1)[0]);
    }

};
