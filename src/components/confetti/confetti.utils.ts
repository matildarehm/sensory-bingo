import { Confetti } from './confetti';

export function runBingoAnimation() {
    let canvas = document.getElementById("bingo-win") as HTMLCanvasElement;
    let context: CanvasRenderingContext2D = canvas.getContext("2d");

    let xpos = 0.5;

    /* find and set window frame size */
    const resizeWindow = () => {
        context.canvas.width = window.innerWidth;
        return context.canvas.height = window.innerHeight;
    };

    resizeWindow()
    window.addEventListener('resize', resizeWindow, false);
    window.onload = function() {
        return setTimeout(resizeWindow, 50);
    };

    document.onmousemove = function(e) {
        xpos = e.pageX / window.screen.width;
    };

    window.requestAnimationFrame = (function() {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(callback) {
            return window.setTimeout(callback, 50);
        };
    })();

    let confettiSettings = () => {
        return {
            context: context,
            positionX: xpos,
            width: window.screen.width,
            height: window.screen.height,
            CONFETTI_FREQ: 500
        }
    }

    let confetti = rainConfetti(confettiSettings());

    const step = function() {
        var c, results;
        requestAnimationFrame(step);
        context.clearRect(0, 0, window.screen.width, window.screen.height);
        results = [];
        for (let y = 0;  y < confetti.length; y++) {
            c = confetti[y];
            results.push(c.draw());
        }
        return results;
    };

    step();
}

const rainConfetti = (props: any) => {
    var results;
    results = [];
    for (let x = 0; x <= props.CONFETTI_FREQ; x++) {
        results.push(new Confetti(props));
    }
    return results;
};
