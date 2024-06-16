import { useEffect, useState } from "react";
import GamepadManager from "../utils/GamepadManager";
import Stick from "../utils/Stick";





export default function TestGamepad() {

    const [axes, setAxes] = useState([]);
    const [buttonsPressed, setButtonsPressed] = useState([]);
    const [rec, setRec] = useState(false)

    let leftStick = new Stick(0, 0);
    let rightStick = new Stick(0, 0);

    useEffect(() => {
        const Gamepad = new GamepadManager();

        function getGamepadsInfo() {
            const gamepadState = Gamepad.getState();
            if (gamepadState == null) return;
            console.log(rec)
            if (true) {
                leftStick.setDirection(gamepadState.axes[0], gamepadState.axes[1]);
                rightStick.setDirection(gamepadState.axes[2], gamepadState.axes[3]);
                recordOneInput(leftStick, rightStick, gamepadState.buttonsPressed)
            }

            setButtonsPressed(gamepadState.buttonsPressed);
            setAxes(gamepadState.axes);
        }
        function gameLoop() {
            getGamepadsInfo();
            requestAnimationFrame(gameLoop);
        }

        gameLoop()
    }, []);
    const recordOneInput = (leftStick, rightStick, buttonsPressed) => {
        console.log("save :")
        console.log(leftStick.getDirection())
        console.log(rightStick.getDirection())
    }


    return (
        <div style={{ display: 'flex' }}>
            <div>
                <h1>Stick gauches</h1>
                <div >
                    {axes.map((axe, index) => (
                        <div
                            key={index}
                            style={{
                                margin: '1px',
                            }}
                        >
                            {axe}
                        </div>
                    ))}
                </div>
                <h1>Buttons</h1>
                <div style={{ display: 'flex', flexWrap: 'wrap', marginTop: '10px' }}>
                    {buttonsPressed.map((buttonPressed, index) => (
                        <div
                            key={index}
                            style={{
                                width: '10px',
                                height: '10px',
                                backgroundColor: buttonPressed ? 'red' : 'blue',
                                margin: '1px',
                            }}
                        ></div>
                    ))}
                </div>
            </div>
            <div>
                <button onClick={() => { console.log("hell"); setRec(true) }}>rec</button>
                <button >save</button>
            </div>
        </div>
    );
}