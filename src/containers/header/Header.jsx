import './Header.scss';

export default function Header() {
  return (
    <header className='header-container'>
      <img className="header-container-logo" src={process.env.PUBLIC_URL + '/logo.png'} alt='повітряні сили'></img>
    </header>
  );
};
