import './styles/default.css';
import { Routes, Route } from "react-router-dom";
import Adamtuto from './routes/adamtuto';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Adamtuto />} />
      </Routes>
    </>
  );
}
export default App;

// /#/Keyboard