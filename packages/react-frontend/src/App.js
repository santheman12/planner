import React from 'react';
import './App.css';
import WeekChart from './WeekChart';
import Overdue from './Overdue';

function App() {
  return (
    <div className="App">
      <div className="App-body">
        <div className="chart-container">
          <WeekChart />
          <Overdue />
        </div>
      </div>
    </div>
  );
}

export default App;