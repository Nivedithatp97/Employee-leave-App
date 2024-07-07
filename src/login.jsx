import React,{useEffect} from "react";
import useForm from "./useForm";
import validate from "./LoginFomvalidations";
import "../src/assets/css/login.css"; 

import { auth } from './firebase';

const LoginForm = ({ setLoggedIn, setShowSignup, setShowAdminLogin }) => {
  
  const { values, errors, handleChange, handleSubmit } = useForm(handleLogin, validate);

  useEffect(() => {
    const storedEmail = localStorage.getItem('loggedInUserEmail');
    if (storedEmail) {
      
      handleChange({ target: { name: 'email', value: storedEmail } });
    }
  }, []);

  async function handleLogin() {
    try {
      await auth.signInWithEmailAndPassword(values.email, values.password);
      setLoggedIn(true);
      alert("login successfully!");
      localStorage.setItem('loggedInUserEmail', values.email);
 
    } catch (error) {
      console.error('User is not exist');
      
    }
  }

  const handleSignupClick = () => {
    setShowSignup(true); 
  };

  const handleAdminLoginClick = () => {
    setShowAdminLogin(true); 
  };

  return (
    <div className="box">
      <div className="head-div">
        <h1>Employee Login</h1>
        <button
          type="button"
          className="button is-admin"
          onClick={handleAdminLoginClick}
        >
          Admin Login
        </button>
      </div>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <div className="control">
            <input
              autoComplete="off"
              className={`input ${errors.email && "is-danger"}`}
              type="email"
              name="email"
              onChange={handleChange}
              value={values.email || ""}
              required
              placeholder="Enter email address"
            />
            {errors.email && <p className="help is-danger">{errors.email}</p>}
          </div>
        </div>
        <div className="field">
          <div className="control">
            <input
              className={`input ${errors.password && "is-danger"}`}
              type="password"
              name="password"
              onChange={handleChange}
              value={values.password || ""}
              required
              placeholder="Enter Password"
            />
          </div>
          {errors.password && <p className="help is-danger">{errors.password}</p>}
        </div>
        <div className="field">
          <p className="control">
            <button
              type="submit"
              className="button is-block"
            >
              Login
            </button>
          </p>
        </div>
      </form>
      <div className="field">
        <p className="control">
          Don't have an account?
          <button
            type="button"
            className="button is-link"
            onClick={handleSignupClick}
          >
            Signup
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
