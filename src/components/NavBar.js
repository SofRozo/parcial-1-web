// src/components/NavBar.js
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar-custom">
      <Link className="navbar-title" to="/">
        Adopta un Robot con Robot Lovers!
      </Link>
    </nav>
  );
}

export default NavBar;
