import React, { useState } from "react";
import LeaveRequests from "./LeaveList";
import EmployeeLeaveSummary from "./LeaveSummary";
import { Redirect} from "react-router-dom";
import "../assets/css/admindashboard.css"; 



const AdminDashboard = () => {

const [view, setView] = useState("leaveRequests"); // Default view is profile
const [loggedIn, setLoggedIn] = useState(true); 

const handleLogout = () => {
  setLoggedIn(false); 
  
};

if (!loggedIn) {
  return <Redirect  to="/" />;
}

  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <ul className="menu">
          <li className="menu-item" onClick={() => setView("leaveRequests")}>
            Leave Requests
          </li>
          <li className="menu-item" onClick={() => setView("Leavesummary")}>
            Leave Summary
          </li>
          <li className="menu-item" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
      <div className="content">
        {view === "leaveRequests" && <LeaveRequests />}
        {view === "Leavesummary" && < EmployeeLeaveSummary/>}
      </div>
    </div>
  );
};

export default AdminDashboard;
