import '../styles/showKey.css';

export default function ShowKey({ keyboardKey, gamepadKey, gamepadKeyImage }) {
    return (<div className="showKey">
        <div className="gamepadKey">
            {gamepadKeyImage ? <img src={gamepadKeyImage} alt='sry i dont care' /> :
                gamepadKey 
            }
        </div>
        <div className="keyboardKey">
            {keyboardKey}
        </div>
    </div>)
}