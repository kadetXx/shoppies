import React from "react";
import "./Footer.scss";

function Footer() {
  const getYear = () => {
    const date = new Date();
    return date.getFullYear();
  };

  return (
    <footer>
      <p>© {getYear()} The Shoppies</p>
      <a href='https://github.com/kadetXx/shoppies'>
        <i className='fab fa-github'></i>
      </a>
    </footer>
  );
}

export default Footer;
