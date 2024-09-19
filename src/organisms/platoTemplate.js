import ShowKey from '../molecules/showKey';
import '../styles/platoTemplate.css';
import select from '../assets/images/PlayStation_button_Select.svg.png'
import start from '../assets/images/PlayStation_button_Start.svg.png'

import arrow from '../assets/images/arrow.png'
import Stick from '../utils/Stick';

function selectDirection(direction) {
    switch (direction) {

        case Stick.NONE:
            return { display: 'none' }
        case Stick.UP:
            return { transform: ' rotate(-90deg)' }
        case Stick.DOWN:
            return { transform: ' rotate(90deg)' }
        case Stick.LEFT:
            return { transform: ' rotate(-180deg)' }
        case Stick.RIGHT:
            return { transform: ' rotate(0deg)' }
        default:
            return { display: 'none' }
    }
}

export default function PlatoTemplate({ plato }) {
    return (
        <div className='platoTemplate'>
            <div className='joysticks'>

                <div className='joystick'> <img src={arrow} alt='sry i dont care' style={selectDirection(plato.joystick[0])} /></div>
                <div className='joystick'> <img src={arrow} alt='sry i dont care' style={selectDirection(plato.joystick[1])} /></div>
            </div>
            <div>
                <div className='row1'>
                    <ShowKey keyboardKey={plato.keys.L2} gamepadKey="L2" />
                    <ShowKey keyboardKey={plato.keys.R2} gamepadKey="R2" />
                </div>

                <div className='row'>
                    <ShowKey keyboardKey={plato.keys.L1} gamepadKey="L1" />
                    <ShowKey keyboardKey={plato.keys.UP} gamepadKey="UP" />
                    <ShowKey keyboardKey={plato.keys.SELECT} gamepadKeyImage={select} />
                    <ShowKey keyboardKey={plato.keys.START} gamepadKeyImage={start} />
                    <ShowKey keyboardKey={plato.keys.Y} gamepadKey="Y" />
                    <ShowKey keyboardKey={plato.keys.R1} gamepadKey="R1" />
                </div>

                <div className='row'>
                    <ShowKey keyboardKey={plato.keys.LEFT} gamepadKey="LEF" />
                    <ShowKey keyboardKey={plato.keys.RIGHT} gamepadKey="RIG" />
                    <ShowKey keyboardKey={plato.keys.X} gamepadKey="X" />
                    <ShowKey keyboardKey={plato.keys.B} gamepadKey="B" />
                </div>

                <div className='row'>
                    <ShowKey keyboardKey={plato.keys.BOT} gamepadKey="BOT" />
                    <ShowKey keyboardKey={plato.keys.A} gamepadKey="A" />
                </div>
            </div>
        </div>
    )
}