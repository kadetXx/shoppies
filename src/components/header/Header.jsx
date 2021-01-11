import React from "react";
import "./Header.scss";

function Header({ mobileSidebar, toggleMobileSidebar }) {
  const handleToggle = () => {
    toggleMobileSidebar(!mobileSidebar);
  };

  return (
    <header>
      <h1 className='logo'>
        <a href='/' className='logo__anchor'>
          The Shoppies
        </a>
      </h1>

      <nav className='sidebar__toggle' role="navigation">
        <button
          className='sidebar__toggle__button'
          onClick={handleToggle}
        >
          <i className='fas fa-list-ul'></i>
        </button>
      </nav>
    </header>
  );
}

export default Header;
