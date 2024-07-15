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
        if (Math.abs(x) > Math.abs(y)) {
            if (Math.abs(x) < Stick.sensi) {
                this.direction = Stick.NONE;
            } else {
                this.direction = x > 0 ? Stick.RIGHT : Stick.LEFT;
            }
        } else {
            if (Math.abs(y) < Stick.sensi) {
                this.direction = Stick.NONE;
            } else {
                this.direction = y > 0 ? Stick.DOWN : Stick.UP;
            }
        }
    }

    getDirection() {
        return this.direction;
    }
}