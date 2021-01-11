import React from "react";
import "./Header.scss";

function Header({ mobileSidebar, toggleMobileSidebar, limit }) {
  const handleToggle = () => {
    toggleMobileSidebar(!mobileSidebar);
  };

  return (
    <header>
      <h1 className='logo'>
        <a href='/' className='logo__anchor'>
        <i className="fas fa-film"></i>
          The Shoppies
        </a>
      </h1>

      <nav className='sidebar__toggle' role="navigation">
        <button
          className='sidebar__toggle__button'
          onClick={handleToggle}
        >
          <span> {Math.abs(limit - 5)}/5 </span>
          <i className="far fa-star"></i>
        </button>
      </nav>
    </header>
  );
}

export default Header;
