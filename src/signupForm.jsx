import React from "react";
import useForm from "./useForm";
import validate from "./LoginFomvalidations";
import "../src/assets/css/login.css"; 
import { auth, db } from './firebase'; 

const SignupForm = ({ setShowSignup }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(handleSignup, validate);

  async function handleSignup() {
    try {
      
      const authUser = await auth.createUserWithEmailAndPassword(values.email, values.password);
      
      
      await authUser.user.updateProfile({
        displayName: values.name 
      });

      
      const userProfileData = {
        name: values.name,
        email: values.email,
        jobTitle: values.jobTitle 
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userProfileData)
      };

      const res = await fetch('https://leave-application-app-3b3c8-default-rtdb.firebaseio.com/userProfile.json', options);
      if (res.ok) {
        alert("Profile submitted successfully!");
      } else {
        throw new Error('Failed to submit profile data');
      }

      
      window.open("success admin", "_self");
      
    } catch (error) {
      console.error('Signup Error:', error.message);
      
    }
  };

  const handleCancelClick = () => {
    setShowSignup(false); 
  };

  return (
    <div className="box">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit} noValidate>
        {/* Form fields for email, password, name, and job title */}
        <div className="field">
          <label className="label">Email Address</label>
          <div className="control">
            <input
              autoComplete="off"
              className={`input ${errors.email && "is-danger"}`}
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email || ""}
              required
            />
            {errors.email && <p className="help is-danger">{errors.email}</p>}
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className={`input ${errors.password && "is-danger"}`}
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password || ""}
              required
            />
          </div>
          {errors.password && <p className="help is-danger">{errors.password}</p>}
        </div>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className={`input ${errors.name && "is-danger"}`}
              type="text"
              name="name"
              onChange={handleChange}
              value={values.name || ""}
              required
            />
          </div>
          {errors.name && <p className="help is-danger">{errors.name}</p>}
        </div>
        <div className="field">
          <label className="label">Job Title</label>
          <div className="control">
            <input
              className={`input ${errors.jobTitle && "is-danger"}`}
              type="text"
              name="jobTitle"
              onChange={handleChange}
              value={values.jobTitle || ""}
              required
            />
          </div>
          {errors.jobTitle && <p className="help is-danger">{errors.jobTitle}</p>}
        </div>
        <div className="field is-grouped cancel-div">
          <p className="control">
            <button
              type="submit"
              className="button is-block log-in"
            >
              Register
            </button>
          </p>
          <p className="control">
            <button
              type="button"
              className="button cancel"
              onClick={handleCancelClick}
            >
              Cancel
            </button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
