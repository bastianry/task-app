import React from 'react';
import './App.css';
import Board from './components/Board';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Trullo Taskmaster 69000</h1>
      </header>
      <Board />
    </div>
  );
}

export default App;
