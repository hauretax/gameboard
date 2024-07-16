import ShowKey from '../molecules/showKey';
import '../styles/keyTemplate.css';
import select from '../assets/images/PlayStation_button_Select.svg.png'
import start from '../assets/images/PlayStation_button_Start.svg.png'

import arrow from '../assets/images/arrow.png'

const tmpJoystickTab = ['right', 'none'];

const tmpKeyTab = ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'q', 's', 'd', 'f', 'g', 'h']

function selectDirection(direction) {
    switch (direction) {

        case 'none':
            return { display: 'none' }
        case 'up':
            return { transform: ' rotate(-90deg)' }
        case 'down':
            return { transform: ' rotate(90deg)' }
        case 'left':
            return { transform: ' rotate(-180deg)' }
        case 'right':
            return { transform: ' rotate(0deg)' }
        default:
            return { display: 'none' }
    }
}

export default function KeyTemplate({ plato }) {
    return (
        <div className='KeyTemplate'>
            <div className='joysticks'>

                <div className='joystick'> <img src={arrow} alt='sry i dont care' style={selectDirection(plato.joystick[0])} /></div>
                <div className='joystick'> <img src={arrow} alt='sry i dont care' style={selectDirection(plato.joystick[1])} /></div>
            </div>
            <div>
                <div className='row1'>
                    <ShowKey keyboardKey={plato.KeyTab.L2} gamepadKey="L2" />
                    <ShowKey keyboardKey={plato.KeyTab.R2} gamepadKey="R2" />
                </div>

                <div className='row'>
                    <ShowKey keyboardKey={plato.KeyTab.L1} gamepadKey="L1" />
                    <ShowKey keyboardKey={plato.KeyTab.UP} gamepadKey="UP" />
                    <ShowKey keyboardKey={plato.KeyTab.SELECT} gamepadKeyImage={select} />
                    <ShowKey keyboardKey={plato.KeyTab.START} gamepadKeyImage={start} />
                    <ShowKey keyboardKey={plato.KeyTab.Y} gamepadKey="Y" />
                    <ShowKey keyboardKey={plato.KeyTab.R1} gamepadKey="R1" />
                </div>

                <div className='row'>
                    <ShowKey keyboardKey={plato.KeyTab.LEF} gamepadKey="LEF" />
                    <ShowKey keyboardKey={plato.KeyTab.RGHT} gamepadKey="RIG" />
                    <ShowKey keyboardKey={plato.KeyTab.X} gamepadKey="X" />
                    <ShowKey keyboardKey={plato.KeyTab.B} gamepadKey="B" />
                </div>

                <div className='row'>
                    <ShowKey keyboardKey={plato.KeyTab.BOT} gamepadKey="BOT" />
                    <ShowKey keyboardKey={plato.KeyTab.A} gamepadKey="A" />
                </div>
            </div>
        </div>
    )
}