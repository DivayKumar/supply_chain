import React, { Component } from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



const SignUp = () =>  {

    const navigate = useNavigate();
	const [data, setData] = useState({
		uname: "",
		email: "",
		location: "",
		budget: "",
		password: ""
	  });
	
	  const handleChange = (e) => {
		const value = e.target.value;
		setData({
		  ...data,
		  [e.target.name]: value
		});
	  };

	  const handleSubmit = (e) => {
		e.preventDefault();
		const userData = {
		  
            uname: data.uname,
			email: data.email,
			location: data.location,
			budget: data.budget,
			password: data.password
		};
		axios
		  .post("http://localhost:8080/api/signup/", userData)
      .then((response) => {
        if (response.status== 200) { navigate(`/sign-in`) }
        else { alert("User can't be registred"); }
     })
		  .catch((error) => {
			if (error.response) {
			  console.log(error.response);
			  console.log("server responded");
			} else if (error.request) {
			  console.log("network error");
			} else {
			  console.log(error);
			}
		  });
          // navigate(`/account`)
   

      };
      

  
    return (
      <form>
        <h3>Sign Up</h3>
        <div className="mb-3">
          <label>User Name</label>
          <input
            type="text"
            name="uname" 
            value={data.uname}
            className="form-control"
            placeholder="User name"
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label>Email address</label>
          <input
            type="email"
            name="email" 
            value={data.email}
            className="form-control"
            placeholder="Enter email"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            name="location" 
            value={data.location}
            className="form-control"
            placeholder="Location"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Budget</label>
          <input
            type="Number"
            name="budget" 
            value={data.budget}
            className="form-control"
            placeholder="Budget"
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            name="password" 
            value={data.password}
            className="form-control"
            placeholder="Enter password"
            onChange={handleChange}
          />
        </div>
        <div className="d-grid">
          <button type="submit" onClick={handleSubmit}className="btn btn-primary">
            Sign Up
          </button>
        </div>
        <p className="forgot-password text-right">
          Already registered <a href="/sign-in">sign in?</a>
        </p>
      </form>
    );
    
};
export default SignUp;
