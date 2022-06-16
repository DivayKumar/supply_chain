import React, { useState, useEffect } from "react";
import './account_style.css';
import { useNavigate } from 'react-router-dom';
import Login from "./login";
import Axios from "axios";



const Account = () =>  {
    const [islogged, setLogged]=useState(localStorage.getItem('isLoggedin'));
	const [props, setProps]=useState(JSON.parse(localStorage.getItem('products')));  

    const navigate = useNavigate();

    const check =()=>{

		console.log(islogged);

        if(islogged==0 || props==null)
        {
            navigate(`/sign-in`);
        }
		// else{
		// 	// navigate(`/sign-up`);

		// }

    }

	const checkData = async () =>{
		const { data } = await Axios.get(
			`http://localhost:8080/api/login/${props.email}`
		  );
	  
		  let parseData = JSON.parse(data.response);
		  localStorage.setItem("products", JSON.stringify(parseData));

	}
  useEffect(() => {
	

	check();
	if(islogged==1){
		checkData();
	}
    
	
  }, []);

const Logout =() =>{
    localStorage.removeItem('products');
    setProps(null);
    localStorage.setItem("isLoggedin", (0));
    navigate(`/sign-in`);

}

    return (
    
<div class="container d-flex justify-content-center">
    <div class="card p-3 py-4">
        <div class="text-center"> 
            <h3 class="mt-2">Username: {props.uname}</h3>
			
			<div class="row mt-3 mb-3">
			
			  <div class="col-md-4">
				<h5>Email</h5>
				<span class="num">{props.email}</span>
			  </div>
			  <div class="col-md-4">
			  <h5>Area</h5>
				<span class="num">{props.aarea}</span>
			  </div>
			  <div class="col-md-4">
			  <h5>Budget</h5>
				<span class="num">{props.budget}</span>
			  </div>
			
			</div>
			
			<hr class="line"></ hr>
			
              <div class="social-buttons mt-5"> 
			   <button class="neo-button"><i class="fa fa-facebook fa-1x"></i> </button> 
			   <button class="neo-button"><i class="fa fa-linkedin fa-1x"></i></button> 
			   <button class="neo-button"><i class="fa fa-google fa-1x"></i> </button> 
			   <button class="neo-button"><i class="fa fa-youtube fa-1x"></i> </button>
			   <button class="neo-button"><i class="fa fa-twitter fa-1x"></i> </button>
			  </div>
			  
			 <div class="profile mt-5">
			 
			 <button class="profile_button px-5" onClick={Logout} >Log Out</button>

		</div>
			   
        </div>
    </div>
</div>
    );

}

export default Account;