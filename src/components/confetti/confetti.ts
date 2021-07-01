// react imports
import React from 'react';

interface ConfettiProps {
    positionX?: number;
    width?: number;
    height?: number;
    context: any;
    CONFETTI_FREQ: number;
}
interface ConfettiState {}

export class Confetti extends React.Component<ConfettiProps, ConfettiState>  {

    static COLORS = [[249, 150, 139], [174, 61, 99], [219, 56, 83], [244, 92, 68], [248, 182, 70]];
    static twoPI = 2 * Math.PI;

    private style;
    private rgb: string;
    private r;
    private r2;
    private opacity: number;
    private xMax: number;
    private yMax: number;
    private vx: any;
    private vy: any;
    private x: number;
    private y: number;
    private dop: number;

    constructor(props: any) {
        super(props);
        this.style = Confetti.COLORS[~~this.range(0, 5)];
        this.rgb = `rgba(${this.style[0]},${this.style[1]},${this.style[2]}`;
        this.r = ~~this.range(2, 6);
        this.r2 = 2 * this.r;
        this.replace();
    }


    range = function(a: number, b: number) {
        return (b - a) * Math.random() + a;
    };

    replace = () => {
        this.opacity = 0;
        this.dop = 0.03 * this.range(1, 4);
        this.x = this.range(-this.r2, this.props.width - this.r2);
        this.y = this.range(-20, this.props.height- this.r2);
        this.xMax = this.props.width - this.r;
        this.yMax = this.props.height - this.r;
        this.vx = this.range(0, 2) + 8 * this.props.positionX - 5;
        this.vy = 0.7 * this.r + this.range(-1, 1);
    };

    drawCircle = (x: number, y: number, r: number, style: any) => {
        this.props.context.beginPath();
        this.props.context.arc(x, y, r, 0, Confetti.twoPI, false);
        this.props.context.fillStyle = style;
        this.props.context.fill();
    };

    draw = () => {
        var reference;
        this.x += this.vx;
        this.y += this.vy;
        this.opacity += this.dop;

        if (this.opacity > 1) {
            this.opacity = 1;
            this.dop *= -1;
        }
        if (this.opacity < 0 || this.y > this.yMax) { this.replace(); }

        if (!((0 < (reference = this.x) && reference < this.xMax))) {
            this.x = (this.x + this.xMax) % this.xMax;
        }

        return this.drawCircle(~~this.x, ~~this.y, this.r, `${this.rgb},${this.opacity})`);
    };


};