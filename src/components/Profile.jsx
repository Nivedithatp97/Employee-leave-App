import React, { useEffect, useState } from "react";
import "../assets/css/dashboard.css"; 

const Profile = () => {
  const [profileDetails, setProfileDetails] = useState({});
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

        // Find the profile details corresponding to the stored email
        const loggedInUserProfile = profileDetailsArray.find(
          profile => profile.email === storedEmail
        );

        if (loggedInUserProfile) {
          setProfileDetails(loggedInUserProfile);
        } else {
          console.error("User profile not found for logged-in user");
        }
      } catch (error) {
        console.error("Error fetching profile details:", error);
      }
    };

    if (storedEmail) {
      fetchProfileDetails();
    }
  }, [storedEmail]); // Fetch profile details whenever storedEmail changes


  return (
    <div className="profile">
      <div className="user-profile">
        <img
          src="https://via.placeholder.com/150"
          alt="User Avatar"
          className="user-avatar"
        />
        <h3 className="user-name">{profileDetails.name}</h3>
        <p className="user-email">{profileDetails.email}</p>
        <p className="user-position">{profileDetails.jobTitle}</p>
      </div>
    </div>
  );
};

export default Profile;
