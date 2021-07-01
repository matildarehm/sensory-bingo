import $ from "jquery";

export default function shuffled() {
    var parent = $('#grid-container');
    var rows = parent.children();
    var divs = $('#grid-container > div').children();

    var size = divs.length;
    var column = 5;
    // @ts-ignore
    var clone = divs.slice();

    let rowWin = [];
    let columnWin: string[][] = [[], [], [], [], []];
    let newRow: any[] = [];
    let leftDiagonal = [];
    let rightDiagonal = [];

    for(let i = 0; i < size; i++) {
        var t = Math.floor(i/column);
        let rightIndex = (5-t);
        let leftIndex = (t + 1);

        // @ts-ignore
        let currRow = clone.splice(Math.floor(Math.random() * clone.length), 1)[0];
        $(rows[t]).append(currRow);

        // @ts-ignore
        let spliced = currRow;
        let square = $(spliced).children()[0]
        let currId = $(square).attr('id');
        newRow.push(currId)
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

    console.log(columnWin);
    console.log(rowWin);
    console.log(rightDiagonal);
    console.log(leftDiagonal);

};


