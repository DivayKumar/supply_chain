import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Account from "./account";
const Login = () => {
  const { handleSubmit, watch, register } = useForm({ mode: "onChange" });
  const navigate = useNavigate();
 

const [isloading, setLoading]=useState();  

  const Submit = async (formData) => {
    setLoading(true);

    const { data } = await Axios.get(
      `http://localhost:8080/api/login/${formData?.email}`
    );

    let parseData = JSON.parse(data.response);


    if (parseData?.password == formData?.password) {
      // window.isLoggedin = 1;
     
      localStorage.setItem("products", JSON.stringify(parseData));
      localStorage.setItem("isLoggedin", (1));
      navigate(`/account`);
      setLoading(false);

    } else {
      navigate(`/sign-in`);
    }
  
  };


  return (
    <form onSubmit={handleSubmit(Submit)}>
      <h3>Sign In</h3>
      <div className="mb-3">
        <label>Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          placeholder="Enter email"
          {...register('email')}
          value={watch("email")}
        />
      </div>
      <div className="mb-3">
        <label>Password</label>
        <input
          type="password"
          name="password"
          className="form-control"
          placeholder="Enter password"
          {...register('password')}
          value={watch("password")}
        />
      </div>

      <div className="d-grid">
        <button type="submit" disabled={isloading} className="btn btn-primary">
          Sign In
        </button>
      </div>
      <p className="forgot-password text-right">
        Not registered <a href="/sign-up">sign up?</a>
      </p>
    </form>
  );
};

export default Login;