import React from "react";
import useForm from "./useForm";
import validate from "./LoginFomvalidations";
import "../src/assets/css/login.css"; 
import { auth } from './firebase';

const AdminLoginForm = ({ setAdminLoggedIn, setShowAdminLogin }) => {
  const { values, errors, handleChange, handleSubmit } = useForm(handleLogin, validate);

  async function handleLogin() {
   
    if(values.email =='admin1@gmail.com' && values.password =='Admin1@123'){
        try {
        
        

        await auth.signInWithEmailAndPassword(values.email, values.password);
        setAdminLoggedIn(true);
        alert("login successfully!");
        } catch (error) {
            alert("login error");
        }
    }else{
        alert("admin not exist");
    }

  }

  const handleCancelClick = () => {
    setShowAdminLogin(false); 
  };

  return (
    <div className="box">
      <h1>Admin Login</h1>
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
              placeholder="Enter password"
            />
          </div>
          {errors.password && <p className="help is-danger">{errors.password}</p>}
        </div>
        <div className="field cancel-div">
          <p className="control">
            <button
              type="submit"
              className="button is-block log-in"
            >
              Log in
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

export default AdminLoginForm;
