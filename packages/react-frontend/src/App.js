import React from 'react';
import './App.css';
import WeekChart from './WeekChart';
import Overdue from './Overdue';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import AddTask from './AddTask'

// function App() {
//   return (
//     <div className="App">
//       <div className="App-body">
//         <div className="chart-container">
//           <WeekChart />
//           <Overdue />
//         </div>
//       </div>
//     </div>
//   );
// }

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App-body">
          {/* Navigation Link to Add Task Page */}

          <Routes>
            {/* Define the default route that shows WeekChart and Overdue */}
            <Route path="/" element={
              <div className="chart-container">
                <WeekChart />
                <Overdue />
              </div>
            } />
            
            {/* Define the route for AddTask */}
            <Route path="/add-task" element={<AddTask />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}


export default App;