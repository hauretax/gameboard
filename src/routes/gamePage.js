import React, { useEffect, useState, useRef } from 'react';
import GamepadManager from '../utils/GamepadManager';
import Stick from '../utils/Stick';
import PlatoTemplate from '../organisms/platoTemplate';
import mapConfigFile from '../assets/mapConfig/BepoStyle.json';
import '../styles/gamePage.css';
import LetterFall from '../organisms/LetterFall';
import { useDispatch, useSelector } from 'react-redux';
import { hit } from '../controler/lettersSlice';
import { addPrintableLetters } from '../controler/printableLettersSlice';
import MapConfig from '../utils/MapConfig';


export default function GamePage() {
  const dispatch = useDispatch();

  const mapConfig = new MapConfig(mapConfigFile);
  const letters = useSelector((state) => state.letters);
  const lettersRef = useRef(letters);
  const [plato, setPlato] = useState(mapConfig.platos[0]);
  const [key, setKey] = useState('');
  const requestRef = useRef();
  let lastButtonPressed = [];
  const lastTime = useRef(0);

  useEffect(() => {
    lettersRef.current = letters;
  }, [letters]);

  useEffect(() => {
    const Gamepad = new GamepadManager();
    const leftStick = new Stick(0, 0);
    const rightStick = new Stick(0, 0);

    const selectPlato = ({ leftStickPosition, rightStickPosition }) => {
      const findedPlato = mapConfig.platos.find(plato => plato.sameJostick([leftStickPosition, rightStickPosition]));
      setPlato(findedPlato);
      return findedPlato;
    };


    const selectKey = (curentPlato, buttonsPressed) => {
      const buttonPresse = buttonsPressed.findIndex(button => button === true);

      if (buttonPresse === -1) {
        lastButtonPressed = [];
      }
      if (buttonPresse === -1 || curentPlato === null || curentPlato === undefined) return;
      if (lastButtonPressed.includes(buttonPresse)) return;
      lastButtonPressed.push(buttonPresse);

      const keyPressed = curentPlato.keys[mapConfig.buttons[buttonPresse]];
      dispatch(hit(keyPressed));
      setKey(keyPressed);
    };

    const getGamepadsInfo = () => {
      const gamepadState = Gamepad.getState();
      if (gamepadState == null) return;
      const leftStickPosition = leftStick.setDirection(gamepadState.axes[0], gamepadState.axes[1]);
      const rightStickPosition = rightStick.setDirection(gamepadState.axes[2], gamepadState.axes[3]);

      const curentPlato = selectPlato({ leftStickPosition, rightStickPosition });
      selectKey(curentPlato, gamepadState.buttonsPressed);
    };

    const gameLoop = (timestamp) => {
      if (timestamp - lastTime.current >= 16) {
        getGamepadsInfo();
        lastTime.current = timestamp;
      }
      requestRef.current = requestAnimationFrame(gameLoop);
    };
    console.log('start')
    requestRef.current = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(requestRef.current);
  }, []);


  const addPlato = (platoId) => {
    console.log(platoId);
    const plato = mapConfig.platos.find(plato => plato.id === platoId);
    //mettre les non selectionner en gris
    plato.selected = true;

    plato.keyList.forEach(key => {
      dispatch(addPrintableLetters(key));
    })
  }


  return (
    <div className='gamePage'>
      {plato != null ? <PlatoTemplate plato={plato} /> : null}
      <LetterFall />
      <div className='key'>{key}</div>

      <div className='score'>{letters.length}</div>
      <div className='map' >
        {mapConfig.platos.map(plato =>
          <div key={plato.id}
            className={plato.selected ? 'selected' : 'notSelected'}
            onClick={() => {
              addPlato(plato.id);
            }}>
            <PlatoTemplate key={plato.id} plato={plato} />
          </div>
        )}
      </div>
    </div>
  );
}
