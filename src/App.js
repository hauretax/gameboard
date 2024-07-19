import './styles/default.css';
import { Routes, Route } from "react-router-dom";
import TestGamepad from './routes/testGamepad';
import GamePage from './routes/gamePage';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TestGamepad />} />
        <Route path="/game" element={<GamePage />} />
      </Routes>
    </>
  );
}
export default App;

// /#/Keyboard