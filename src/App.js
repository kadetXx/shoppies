import React, { useState } from 'react'
import './App.scss';

import Header from "./components/header/Header"
import Home from './components/home/Home'

function App() {
  const [mobileSidebar, toggleMobileSidebar] = useState(false)

  return (
    <div className="App">
      <Header mobileSidebar={mobileSidebar} toggleMobileSidebar={toggleMobileSidebar} />
      <Home mobileSidebar={mobileSidebar} />
    </div>
  );
}

export default App;
