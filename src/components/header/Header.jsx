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
        <button className='icons__single icons_single--nominations-toggle' onClick={handleToggle}>
          {/* <p>Nominees</p> */}
          <i className="fas fa-list-ul"></i>
        </button>
      </div>
    </header>
  );
}

export default Header;
