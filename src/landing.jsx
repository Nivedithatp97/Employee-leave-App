
import React ,{ useEffect, useState }from 'react';
import { useHistory } from 'react-router-dom';
import '../src/assets/css/LandingScreen.css'; 
import LoginForm from "./login";
import SignupForm from "./signupForm";
import "../src/assets/css/login.css"; 
import AdminLoginForm from "./adminLogin";
import landingimg from '../src/assets/images/landing.jpg'

const LandingScreen = () => {
  const history = useHistory();
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false); 
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(false);

  const handleLoggedIn = () => {
    setLoggedIn(true);
    history.push('/empdashboard'); 
  };

  const handleAdminLoggedIn = () => {
    setAdminLoggedIn(true);
    history.push('/Adashboard'); 
  };

    return (
        
        <div className="landing-screen">
            <div className="left-side">
                <img src={landingimg} alt="Employee Leave Application" />
            </div>
            <div className="right-side">
            <div className="section is-fullheight">
      <div className="container">
        <div className="column is-6 is-offset-3">
          { !showSignup && !showAdminLogin && (
            <LoginForm
              setShowSignup={setShowSignup}
              setShowAdminLogin={setShowAdminLogin}
              setLoggedIn={handleLoggedIn} 
            />
          )}
          {showAdminLogin && (
            <AdminLoginForm
              setAdminLoggedIn={handleAdminLoggedIn}
              setShowAdminLogin={setShowAdminLogin}
        
            />
          )}
          {showSignup && (
            <SignupForm
              setShowSignup={setShowSignup}
            />
          )}
        </div>
      </div>
    </div>
                
            </div>
        </div>
       
    );
}

export default LandingScreen;
