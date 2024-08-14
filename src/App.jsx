import './App.scss';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/main/Main';
import Header from './containers/header/Header';

function App() {
  return (
    <div className='bootstrap'>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
