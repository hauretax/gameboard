export default class GamepadManager {
    /**
     * Initializes the GamepadManager object and sets up event listeners for gamepad connection and disconnection.
     * Also starts the gamepad loop to update the gamepad state at each frame.
     */
    constructor() {
        this.gamepad = null;
        this.previousGamepadState = {};
        this.currentGamepadState = {};

        window.addEventListener('gamepadconnected', (event) => {
            console.log('Gamepad connected:', event.gamepad);
            this.gamepad = event.gamepad;
        });

        window.addEventListener('gamepaddisconnected', (event) => {
            console.log('Gamepad disconnected:', event.gamepad);
            this.gamepad = null;
            this.previousGamepadState = {};
            this.currentGamepadState = {};
        });

        this.startGamepadLoop();
    }

    updateGamepadState() {
        if (!this.gamepad) {
            return;
        }

        this.previousGamepadState = { ...this.currentGamepadState };
        this.currentGamepadState = {
            buttons: this.gamepad.buttons.map(button => button.pressed),
            axes: this.gamepad.axes.map(axis => axis.toFixed(2)),
        };
    }

    isButtonPressed(buttonIndex) {
        return this.currentGamepadState.buttons[buttonIndex];
    }

    isButtonJustPressed(buttonIndex) {
        return this.currentGamepadState.buttons[buttonIndex] && !this.previousGamepadState.buttons[buttonIndex];
    }

    getAxisValue(axisIndex) {
        return parseFloat(this.currentGamepadState.axes[axisIndex]);
    }

    startGamepadLoop() {
        const updateGamepadLoop = () => {
            this.updateGamepadState();
            requestAnimationFrame(updateGamepadLoop);
        };
        updateGamepadLoop();
    }
}
