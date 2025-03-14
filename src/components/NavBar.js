// src/components/NavBar.js
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar navbar-dark bg-dark px-3">
      <Link className="navbar-brand" to="/">
        Robot Lovers
      </Link>
    </nav>
  );
}

export default NavBar;
