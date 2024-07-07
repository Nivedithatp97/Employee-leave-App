import React, { useState } from "react";
import { useHistory} from "react-router-dom";
import "../assets/css/dashboard.css"; 
import Profile from "./Profile";
import ApplyLeave from "./ApplyLeave";
import LeaveRequests from "./LeaveRequests";


const Dashboard = () => {
  const history =useHistory()
  const [loggedIn, setLoggedIn] = useState(true); 
  const [view, setView] = useState("profile"); 

  const handleLogout = () => {
    setLoggedIn(false); 
    
  };

  if (!loggedIn) {
    history.push('/')
  }

  return (
    <div className="dashboard">
      <div className="sidebar">
        <ul className="menu">
          <li className="menu-item" onClick={() => setView("profile")}>
            Profile
          </li>
          <li className="menu-item" onClick={() => setView("applyLeave")}>
            Apply for Leave
          </li>
          <li className="menu-item" onClick={() => setView("leaveRequests")}>
            View Submitted Requests
          </li>
          <li className="menu-item" onClick={handleLogout}>
            Logout
          </li>
        </ul>
      </div>
      <div className="content">
        {view === "profile" && <Profile />}
        {view === "applyLeave" && <ApplyLeave setView={setView}/>}
        {view === "leaveRequests" && <LeaveRequests />}
      </div>
    </div>
  );
};

export default Dashboard;
