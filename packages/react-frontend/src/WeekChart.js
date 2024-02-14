import React from 'react';

const WeekChart = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  return (
    <div className="week-chart-container">
      <table className="week-chart">
        <thead>
          <tr>
            {daysOfWeek.map((day, index) => (
              <th key={index} className="day-header">
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {daysOfWeek.map((_, index) => (
              <td key={index} className="day-column">
                {/* Add your content for each column here */}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default WeekChart;