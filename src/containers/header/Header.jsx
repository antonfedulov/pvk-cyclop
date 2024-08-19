import './Header.scss';
import { useNavigate, useLocation  } from "react-router-dom";

export default function Header() {
  const navigator = useNavigate();
  const location = useLocation();

  const clickHandler = () => {
    if (location.pathname.includes('table')) {
      navigator('/')
    } else {
      navigator('/table')
    }
  }

  return (
    <header className='header-container'>
      <img className="header-container-logo" src={process.env.PUBLIC_URL + '/logo.png'} alt='повітряні сили' onClick={clickHandler}></img>
    </header>
  );
};
