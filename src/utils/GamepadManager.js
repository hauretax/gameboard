export default class GamepadManager {
    /**
     * Initializes the GamepadManager object and sets up event listeners for gamepad connection and disconnection.
     * Also starts the gamepad loop to update the gamepad state at each frame.
     */
    controllerIndex = {
        index: null,
    };

    constructor() {

        window.addEventListener('gamepadconnected', (event) => {
            console.log('Gamepad connected:', event.gamepad);
            this.controllerIndex = event.gamepad.index;
        });

        window.addEventListener('gamepaddisconnected', (event) => {
            console.log('Gamepad disconnected:', event.gamepad);
            this.controllerIndex = null;
        });

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

    getState() {
        if (this.controllerIndex === null) return null;
        const gamepad = navigator.getGamepads()[this.controllerIndex];
        if (!gamepad) return null;

        return {
            buttonsPressed: gamepad.buttons.map(el => el.pressed),
            axes: gamepad.axes.map(axis => axis.toFixed(2)),
        };
    }

}
