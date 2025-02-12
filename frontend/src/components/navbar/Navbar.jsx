import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink as NavLink } from 'react-router-hash-link';

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg "
      style={{ backgroundColor: 'rgb(240, 249, 69)' }}
    >
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Frindes
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link active" to={`/`}>
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={`/orders`}>
                Orders
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={`/dishes`}>
                Dishes
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to={`/waiters`}>
                Waiters
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
