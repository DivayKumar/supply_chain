import React, { useState, useEffect } from "react";
import Axios from "axios";
import './table.css';

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
		<tr>
    <td><strong>{product.record.id}</strong></td>

		   <td>{product.record.name}</td>
		   <td>{product.record.area}</td>
		   <td>{product.record.ownerName}</td>
		   <td>{product.record.cost}</td>
		   {/* <td>{product.txId}</td> */}
		   <td>{product.timestamp}</td>

		 </tr>
	   ) );
	  
	 }
	// useEffect(() => {
	//   fetchProducts();
	// }, []);
	
	
	  return (
		
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
	
	<table>
	  <thead>
		<tr>
		  <th>ID</th>
		  <th>Name</th>
		  <th>Area</th>
		  <th>Owner Name</th>
		  <th>Cost</th>
		  {/* <th>TxID</th> */}
		  <th>Time</th>


	
		</tr>
	  </thead>
	  <tbody>
	  {display()}
	
	  </tbody>
	  
	 
	</table>
	</form>

	  
	  )
	}
export default History;
