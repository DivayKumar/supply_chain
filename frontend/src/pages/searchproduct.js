import React, { useState, useEffect } from "react";
import Axios from "axios";
import './table.css';

function SearchProduct() {
  const [products, setProducts] = useState([]);
  const [id, setID] = useState("");


  const fetchProducts = async () => {
    const { data } = await Axios.get(
      "http://localhost:8080/api/QueryProductById/"+id
    );
    let parseData = JSON.parse(data.response);

    setProducts(parseData);
    console.log(products.cost);

  };
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
		<th>ID  </th>
		<th>Name</th>
		<th>Area  </th>
		<th>Owner Name    </th>
		<th>Cost</th>
	  </tr>
	</thead>
	<tbody>
  <tr>
    <td><strong>{products.id}</strong></td>
    <td> {products.name}</td>
    <td>{products.area}</td>
    <td>{products.ownerName}</td>
    <td>{products.cost}</td>
  </tr>
	</tbody>
  </table>
    </div>
  );
}

		
export default SearchProduct;
