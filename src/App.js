import './App.scss';
import { Routes, Route } from 'react-router-dom';
import AddNote from './pages/';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AddNote />} />
    </Routes>
  );
}

export default App;
