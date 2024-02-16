import React from 'react';

const Overdue = () => {
  const daysOfWeek = ['OverDue'];

  return (
    <div className="overdue-container">
      <table className="overdue-chart">
        <thead>
          <tr>
            <th className="overdue-header">{daysOfWeek[0]}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="overdue-column">
              {/* Add your content for the Overdue column here */}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Overdue;