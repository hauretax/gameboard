import './styles/default.css';
import { Routes, Route } from "react-router-dom";
import TestGamepad from './routes/testGamepad';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<TestGamepad />} />
      </Routes>
    </>
  );
}
export default App;

// /#/Keyboard