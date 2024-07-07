import React, { useState, useEffect } from "react";
import "../assets/css/dashboard.css"; 

const ViewLeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const storedEmail = localStorage.getItem('loggedInUserEmail');

  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch('https://leave-application-app-3b3c8-default-rtdb.firebaseio.com/userLeave.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        const leaveRequestsArray = Object.keys(data).map(key => ({
          id: key,
          ...data[key]
        }));
        const loggedInUserRequests = leaveRequestsArray.filter(
          request => request.email === storedEmail
        );
        setLeaveRequests(loggedInUserRequests);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
      }
    };

    fetchLeaveRequests();
  }, [storedEmail]); 

  const handleDeleteRequest = async (id) => {
    try {
      const response = await fetch(`https://leave-application-app-3b3c8-default-rtdb.firebaseio.com/userLeave/${id}.json`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete leave request');
      }
      
      setLeaveRequests(prevRequests => prevRequests.filter(request => request.id !== id));
    } catch (error) {
      console.error('Error deleting leave request:', error);
    }
  };

  return (
    <div className="view-leave-requests">
      <h2>View Leave Requests</h2>
      <div className="table-container">
        <table className="table is-bordered is-striped is-hoverable">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Leave Type</th>
              <th>Reason</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {leaveRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.leaveType}</td>
                <td>{request.reason}</td>
                <td>
                  <button
                    className="button is-danger is-small"
                    onClick={() => handleDeleteRequest(request.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewLeaveRequests;
