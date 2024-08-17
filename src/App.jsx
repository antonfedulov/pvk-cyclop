import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import CyclopTable from './pages/cyclop-table/CyclopTable';
import Header from './containers/header/Header';

function App() {
  return (
    <div className='bootstrap'>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/table" element={<CyclopTable />} />
      </Routes>
    </div>
  );
}

export default App;
