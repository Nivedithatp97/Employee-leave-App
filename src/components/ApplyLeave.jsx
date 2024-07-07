import React, { useState, useEffect } from "react";

import "../assets/css/dashboard.css"; 


const ApplyLeave = ({ setView }) => {
  const [leaveType, setLeaveType] = useState("Full Day"); 
  const [reason, setReason] = useState(""); 
  const [startDate, setStartDate] = useState(""); 
  const [endDate, setEndDate] = useState(""); 
  const [employee, setEmployee] = useState(""); 
  const [email, setEmail] = useState(""); 
  const storedEmail = localStorage.getItem('loggedInUserEmail');
  

  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await fetch(
          "https://leave-application-app-3b3c8-default-rtdb.firebaseio.com/userProfile.json"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        const profileDetailsArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        const loggedInUserProfile = profileDetailsArray.find(
          profile => profile.email === storedEmail
        );
        
        if (loggedInUserProfile) {
          console.log("loggedInUserProfile",loggedInUserProfile)
          setEmployee(loggedInUserProfile.name);
          setEmail(loggedInUserProfile.email) 
        }
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    fetchProfileDetails();
  }, []); 

  const handleSubmitLeave = async (e) => {
    e.preventDefault();

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        employee,
        email,
        leaveType,
        reason,
        startDate,
        endDate,
        status: "Pending", 
        createdAt: new Date().toISOString(),
      })
    };

    try {
      const response = await fetch('https://leave-application-app-3b3c8-default-rtdb.firebaseio.com/userLeave.json', options);

      if (!response.ok) {
        throw new Error('Failed to submit leave request');
      }

      alert("Leave request submitted successfully!");

    } catch (error) {
      console.error('Error submitting leave request:', error);
      alert("Error submitting leave request");
    }
  };

  const handleCancelClick = () => {
    setView("profile")
  };

  
  return (
    <div className="apply-leave">
      <h2>Apply for Leave</h2>
      <form onSubmit={handleSubmitLeave}>
        <div className="field">
          <label className="label">Leave Type</label>
          <div className="control">
            <div className="select">
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
              >
                <option value="Full Day">Full Day</option>
                <option value="Half Day">Half Day</option>
              </select>
            </div>
          </div>
        </div>
        <div className="field">
          <label className="label">Start Date</label>
          <div className="control">
            <input
              type="date"
              className="input"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">End Date</label>
          <div className="control">
            <input
              type="date"
              className="input"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="field">
          <label className="label">Reason</label>
          <div className="control">
            <input
              type="text"
              className="input"
              placeholder="Reason for leave"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="button-div">
          <button type="submit" className="button is-success">
            Submit
          </button>
          <button
            type="button"
            className="button cancel"
            onClick={handleCancelClick}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ApplyLeave;
