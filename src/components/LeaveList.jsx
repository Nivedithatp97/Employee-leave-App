import React, { useState, useEffect } from "react";
import "../assets/css/admindashboard.css"; 

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filter, setFilter] = useState("");
  
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch(
          "https://leave-application-app-3b3c8-default-rtdb.firebaseio.com/userLeave.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Convert Firebase object to array of objects
        const leaveRequestsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setLeaveRequests(leaveRequestsArray);
      } catch (error) {
        console.error("Error fetching leave requests:", error);
      }
    };

    fetchLeaveRequests();
  }, []); // Empty dependency array ensures useEffect runs only once

  // Filter leave requests by employee name
  const filteredRequests = leaveRequests.filter((request) =>
    request.employee && request.employee.toLowerCase().includes(filter.toLowerCase())
  );

  // Handle approve button click
  const handleApprove = (id) => {
    // Update the status to "Approved" in the backend or update your data structure accordingly
    // For simplicity, let's update the local state directly
    const updatedRequests = leaveRequests.map((request) =>
      request.id === id ? { ...request, status: "Approved" } : request
    );
    setLeaveRequests(updatedRequests);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div className="leave-requests">
      <h2 className="section-title">Leave Requests</h2>
      <div className="filter-section">
        <label htmlFor="filter">Filter by Employee:</label>
        <input
          type="text"
          id="filter"
          value={filter}
          onChange={handleFilterChange}
          placeholder="Enter employee name"
        />
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Reason</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.employee}</td>
              <td>{request.startDate}</td>
              <td>{request.endDate}</td>
              <td>{request.reason}</td>
              <td>
                {request.status !== "Approved" ? (
                  <button className="button is-info" onClick={() => handleApprove(request.id)}>
                    Approve
                  </button>
                ) : (
                  <span className="approved-text">Approved</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequests;
