import React from "react";
import "./Header.scss";

function Header({ mobileSidebar, toggleMobileSidebar }) {
  const handleToggle = () => {
    toggleMobileSidebar(!mobileSidebar);
  }

  return (
    <header>
      <h1 className='logo'>
        <a href='/' className='logo__anchor'>
          The Shoppies
        </a>
      </h1>

      <div className='icons'>
        {/* <a href="/" className="icons__single icons__single-dev-corner">
          <i className="fab fa-github"></i>
          <p>Dev</p>
        </a> */}

        <button className='icons__single icons_single--nominations-toggle' onClick={handleToggle}>
          {/* <p>Nominees</p> */}
          <i className='fas fa-award'></i>
        </button>
      </div>
    </header>
  );
}

export default Header;
