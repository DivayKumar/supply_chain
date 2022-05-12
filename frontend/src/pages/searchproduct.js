import React, { useState, useEffect } from "react";
import "../all.css";
import Axios from "axios";

function SearchProduct() {
  const [products, setProducts] = useState([]);
  const [id, setID] = useState("");


  const fetchProducts = async () => {
    const { data } = await Axios.get(
      "http://localhost:8080/api/QueryProductById/"+id
    );
console.log(data.response);
    let parseData = JSON.parse(data.response);

    setProducts(parseData);
  };
  console.log(id);
  // useEffect(() => {
  //   fetchProducts();
  // }, []);



  return (
	  
    <div>
	 <form onSubmit={fetchProducts()}>
        <label htmlFor="header-search">
            <span className="visually-hidden">Search blog posts</span>
        </label>
        <input
            type="text"
            id="header-search"
            placeholder="search by ID"
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
	  </tr>
	</thead>
	<tbody>
		<tr key={products.id}>
		  <th>{products.id}</th>
		  <th>{products.name}</th>
		  <th>{products.area}</th>
		  <th>{products.ownerName}</th>
		  <th>{products.cost}</th>
		</tr>
	  
	</tbody>
  </table>
    </div>
  );
}

		
export default SearchProduct;
