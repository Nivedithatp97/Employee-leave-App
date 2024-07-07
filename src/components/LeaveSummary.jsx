import React, { useState, useEffect } from "react";
import "../assets/css/admindashboard.css"; 

const EmployeeLeaveSummary = () => {
  const [employeesLeaveSummary, setEmployeesLeaveSummary] = useState([]);

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch('https://leave-application-app-3b3c8-default-rtdb.firebaseio.com/userLeave.json');
        if (!response.ok) {
          throw new Error('Failed to fetch leave requests');
        }
        const data = await response.json();
        // Convert Firebase object to array of leave requests
        const leaveRequestsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));

        // Calculate total leave days for each employee
        const employeesMap = new Map(); // Using Map to group leave days by employee
        
        leaveRequestsArray.forEach(request => {
          const { employee, startDate, endDate } = request;
          const daysDiff = calculateDaysDifference(startDate, endDate);

          if (employeesMap.has(employee)) {
            employeesMap.set(employee, employeesMap.get(employee) + daysDiff);
          } else {
            employeesMap.set(employee, daysDiff);
          }
        });

        // Convert Map to array of objects for rendering
        const employeesSummaryArray = Array.from(employeesMap, ([name, totalLeaveDays]) => ({
          name,
          totalLeaveDays
        }));

        setEmployeesLeaveSummary(employeesSummaryArray);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, []); // Empty dependency array to run once on component mount

  // Function to calculate number of days between two dates
  const calculateDaysDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays + 1; // Include both start and end dates
  };

  return (
    <div className="employee-leave-summary">
      <h2 className="section-title">Employee Leave Summary</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Total Leave Days</th>
          </tr>
        </thead>
        <tbody>
          {employeesLeaveSummary.map(employee => (
            <tr key={employee.name}>
              <td>{employee.name}</td>
              <td>{employee.totalLeaveDays}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeLeaveSummary;
