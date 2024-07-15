import ShowKey from '../molecules/showKey';
import '../styles/keyTemplate.css';
import select from '../assets/images/PlayStation_button_Select.svg.png'
import start from '../assets/images/PlayStation_button_Start.svg.png'

import arrow from '../assets/images/arrow.png'

const tmpJoystickTab = ['right', 'none'];

const tmpKeyTab = ['a', 'z', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', 'q', 's', 'd','f','g','h']

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

export default function KeyTemplate() {
    return (
        <div className='KeyTemplate'>
            <div className='joysticks'>

                <div className='joystick'> <img src={arrow} alt='sry i dont care' style={selectDirection(tmpJoystickTab[0])} /></div>
                <div className='joystick'> <img src={arrow} alt='sry i dont care' style={selectDirection(tmpJoystickTab[1])} /></div>
            </div>
            <div>
                <div className='row'>
                    <ShowKey keyboardKey={tmpKeyTab[0]} gamepadKey="L2" />
                    <ShowKey keyboardKey={tmpKeyTab[1]} gamepadKey="R2" />
                </div>

                <div className='row'>
                    <ShowKey keyboardKey={tmpKeyTab[3]} gamepadKey="L1" />
                    <ShowKey keyboardKey={tmpKeyTab[4]} gamepadKey="UP" />
                    <ShowKey keyboardKey={tmpKeyTab[5]} gamepadKeyImage={select} />
                    <ShowKey keyboardKey={tmpKeyTab[6]} gamepadKeyImage={start} />
                    <ShowKey keyboardKey={tmpKeyTab[7]} gamepadKey="Y" />
                    <ShowKey keyboardKey={tmpKeyTab[8]} gamepadKey="R1" />
                </div>

                <div className='row'>
                    <ShowKey keyboardKey={tmpKeyTab[9]} gamepadKey="LEF" />
                    <ShowKey keyboardKey={tmpKeyTab[10]} gamepadKey="RIG" />
                    <ShowKey keyboardKey={tmpKeyTab[11]} gamepadKey="X" />
                    <ShowKey keyboardKey={tmpKeyTab[12]} gamepadKey="B" />
                </div>

                <div className='row'>
                    <ShowKey keyboardKey={tmpKeyTab[13]} gamepadKey="BOT" />
                    <ShowKey keyboardKey={tmpKeyTab[14]} gamepadKey="A" />
                </div>
            </div>
        </div>
    )
}