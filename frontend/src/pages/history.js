import React, { useState, useEffect } from "react";
import '../all.css';
import Axios from "axios";

const History = () => {
	const [products, setProducts] = useState([]);

	const [id, setID] = useState("");

	const fetchProducts = async () => {
	  const { data } = await Axios.get(
		 "http://localhost:8080/api/GetProductHistory/"+id
	
		);
	
		let parseData = JSON.parse(data.response)
	
		setProducts(parseData);
		console.log(products)
	
	};
	
	const display = () => {
	
	  return products?.map(product => (
		<tr key={product.record.id}>
		   <th>{product.record.id}</th>
		   <th>{product.record.name}</th>
		   <th>{product.record.area}</th>
		   <th>{product.record.ownerName}</th>
		   <th>{product.record.cost}</th>
		   <th>{product.txId}</th>
		   <th>{product.timestamp}</th>

		 </tr>
	   ) );
	  
	 }
	// useEffect(() => {
	//   fetchProducts();
	// }, []);
	
	
	  return (
		
		<div>
				 <form  onSubmit={fetchProducts()}>
        <label htmlFor="header-search">
            <span className="visually-hidden">Search blog posts</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="Enter  ID"
            name="s" 
			value={id}
			onChange={(e) => setID(e.target.value)}

        />
        {/* <button type="submit" >Search</button> */}
    </form>
	
	<table>
	  <thead>
		<tr>
		  <th>ID</th>
		  <th>Name</th>
		  <th>Area</th>
		  <th>Owner Name</th>
		  <th>Cost</th>
		  <th>TxID</th>
		  <th>Time</th>


	
		</tr>
	  </thead>
	  <tbody>
	  {display()}
	
	  </tbody>
	  
	 
	</table>
		</div>
	  
	  
	  )
	}
export default History;
