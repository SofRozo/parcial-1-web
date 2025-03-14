// NavBar.js
import { Link } from 'react-router-dom';
import './NavBar.css';
import { FormattedMessage } from 'react-intl';

function NavBar({ setLocale }) {
  return (
    <nav className="navbar-custom position-relative px-3 py-2">
      <Link className="navbar-title text-center w-100 position-absolute top-50 start-50 translate-middle" to="/">
        <FormattedMessage id="title" />
      </Link>

      <div className="locale-switcher position-absolute end-0 top-50 translate-middle-y pe-3">
        <button className="btn btn-sm btn-light me-2" onClick={() => setLocale('es')}>ES</button>
        <button className="btn btn-sm btn-light" onClick={() => setLocale('en')}>EN</button>
      </div>
    </nav>
  );
}

export default NavBar;
