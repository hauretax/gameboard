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

export default function GamePage() {
  const dispatch = useDispatch();
  const mapConfig = mapConfigFile;
  const letters = useSelector((state) => state.letters);
  const printableLetters = useSelector((state) => state.printableLetters);
  const lettersRef = useRef(letters);
  const [plato, setPlato] = useState(mapConfig.plato[0]);
  const [key, setKey] = useState('');
  const requestRef = useRef();
  let lastButtonPressed = [];

  useEffect(() => {
    lettersRef.current = letters;
  }, [letters]);

  useEffect(() => {
    lettersRef.current = printableLetters;
  }, [printableLetters]);

  useEffect(() => {
    const Gamepad = new GamepadManager();
    const leftStick = new Stick(0, 0);
    const rightStick = new Stick(0, 0);

    const selectPlato = ({ leftStickPosition, rightStickPosition }) => {
      const findedPlato = mapConfig.plato.find(plato => {
        return plato.joystick[0] === leftStickPosition && plato.joystick[1] === rightStickPosition;
      });
      setPlato(findedPlato);
      return findedPlato;
    };

    const selectKey = (curentPlato, buttonsPressed) => {
      const buttonPresse = buttonsPressed.findIndex(button => button === true);

      //je suis pas super fiere de mon systéme de gestion des input je me prendrais la tete dessus plus tard
      if (buttonPresse === -1) {
        lastButtonPressed = [];
      }
      if (buttonPresse === -1 || curentPlato === null || curentPlato === undefined) return;
      if (lastButtonPressed.includes(buttonPresse)) return;
      lastButtonPressed.push(buttonPresse);


      console.log(lettersRef.current);
      const keyPressed = curentPlato.KeyTab[mapConfig.buttonId[buttonPresse]];
      dispatch(hit(keyPressed));
      setKey(keyPressed);
    };

    const getGamepadsInfo = () => {
      const gamepadState = Gamepad.getState();
      if (gamepadState == null) return;

      leftStick.setDirection(gamepadState.axes[0], gamepadState.axes[1]);
      rightStick.setDirection(gamepadState.axes[2], gamepadState.axes[3]);

      const curentPlato = selectPlato({ leftStickPosition: leftStick.getDirection(), rightStickPosition: rightStick.getDirection() });
      selectKey(curentPlato, gamepadState.buttonsPressed);
    };

    const gameLoop = () => {
      getGamepadsInfo();
      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);

    return () => cancelAnimationFrame(requestRef.current);
  }, [mapConfig]);

  const test = () => {
    console.log(letters);
  }

  const addPlato = (platoId) => {
    console.log(platoId);
    const plato = mapConfig.plato.find(plato => plato.id === platoId);
    //mettre les non selectionner en gris
    mapConfig.plato.forEach(plato => {
      plato.selected = false;
    });
    plato.selected = true;
    console.log(plato);
    Object.entries(plato.KeyTab).forEach(([buttonId, key]) => {
      if (key && key !== "void" && key !== "" &&
        !["Space", "Backspace", "Tab", "Enter", "Esc"].includes(key)) {
        if (key.length === 1) {
          dispatch(addPrintableLetters(key));
        }
        else if (key.length > 1) {
          dispatch(addPrintableLetters(key.slice(0, 1)));
        }
      }
    });
  }


  return (
    <div className='gamePage'>
      <button onClick={test}>test</button>

      <button onClick={addPlato}>test2</button>
      {plato != null ? <PlatoTemplate plato={plato} /> : null}
      <LetterFall />
      <div className='key'>{key}</div>

      <div className='score'>{letters.length}</div>
      <div className='map' onClick={() => console.log('click')}>
        {mapConfig.plato.map(plato =>
          <div
            className={plato.selected ? 'selected' : 'notSelected'}
            onClick={() => {
              console.log('Plato clicked:', plato.id);
              addPlato(plato.id);
            }}>
            <PlatoTemplate key={plato.id} plato={plato} />
          </div>
        )}
      </div>
    </div>
  );
}
