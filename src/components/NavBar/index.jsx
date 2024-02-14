import "./NavBar.css";
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';

import { NavLink } from "react-router-dom";



export default function NavBar() {

  const currentPage_URL = location.pathname;
  let currentPage;

  currentPage = currentPage_URL.substring(1)
  //console.log(currentPage)

  return (
    <header>
      <nav className="navbar">
        <div className="logo">Harry Potter Characters</div>
        <div className="menu">
          <ul>
            <li><NavLink to="/" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }>Home</NavLink></li>
            <li><NavLink to="/characters" className={({ isActive, isPending }) =>
                    isPending ? "pending" : isActive ? "active" : ""
                  }>Characters</NavLink></li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
