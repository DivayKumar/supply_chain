import React from 'react';
import '../index.css';
import { useState, useEffect } from "react";
import axios from "axios";


const AddProduct = () =>  {


	const [data, setData] = useState({
		id: "",
		pname: "",
		location: "",
		oname: "",
		cost: ""
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
		  
		  	id: data.id,
			productName: data.pname,
			area: data.location,
			owner: data.oname,
			value: data.cost
		};
		axios
		  .post("http://localhost:8080/api/addproduct/", userData)
		  .then((response) => {
			console.log(response);
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

	  };
  
	return (



<form >
<h3>Add Product</h3>
<div className="form-group">
	<label>ID</label>
	<input type="text" name="id" value={data.id} className="form-control" placeholder="A-Z, a-z, 1-9" onChange={handleChange}
/>
</div>
<div className="form-group">
	<label>Product Name</label>
	<input type="text" name="pname" value={data.pname} className="form-control" placeholder="eg: Zomato" onChange={handleChange}
 />
</div>
<div className="form-group">
	<label>Location</label>
	<input type="text" name="location" value={data.location} className="form-control" placeholder="eg: Mumbai" onChange={handleChange}
 />
</div>
<div className="form-group">
	<label>Owner Name</label>
	<input type="text" name="oname" value={data.oname} className="form-control" placeholder="eg: Rishu"  onChange={handleChange}
 />
</div>
<div className="form-group">
	<label>Cost</label>
	<input type="text" name="cost" value={data.cost} className="form-control" placeholder="eg: 100" onChange={handleChange}
/>
</div>

<button type="submit" onClick={handleSubmit} className="btn btn-primary btn-block">submit</button>


</form>
	);
	
  }

export default AddProduct;
