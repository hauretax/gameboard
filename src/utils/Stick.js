export default class Stick {
    static UP = 'UP';
    static DOWN = 'DOWN';
    static LEFT = 'LEFT';
    static RIGHT = 'RIGHT';
    static NONE = 'NONE';
    static sensi = 0.5;
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.direction = this.NONE;
    }

    setDirection(x, y) {
        if (Math.abs(x) < Stick.sensi && Math.abs(y) < Stick.sensi) {
            this.direction = this.NONE;
        }

        else if (Math.abs(x) < Stick.sensi) {
            this.direction = x > 0 ? this.UP : this.DOWN;
        }

        else if (Math.abs(y) < Stick.sensi) {
            this.direction = y > 0 ? this.LEFT : this.RIGHT;
        }
    }

    getDirection() {
        return this.direction;
    }
}