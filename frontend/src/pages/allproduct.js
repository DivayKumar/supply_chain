import React, { useState, useEffect } from "react";
import Axios from "axios";
import './table.css';


const AllProduct = () => {

const [products, setProducts] = useState([]);


const fetchProducts = async () => {
  const { data } = await Axios.get(
     "http://localhost:8080/api/QueryAllProducts"

    );

    let parseData = JSON.parse(data.response)
    setProducts(parseData);
   

};

const display = () => {

      

  return products?.map(product => (
    

    <tr>
    <td><strong>{product.id}</strong></td>
    <td> {product.name}</td>
    <td>{product.area}</td>
    <td>{product.ownerName}</td>
    <td>{product.cost}</td>
  </tr>
   ) );
  
 
}
useEffect(() => {
  fetchProducts();
}, []);


  return (
    
<div >

{/* <table>
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
  {display()}

  </tbody>
 
</table> */}
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
    {display()}

  </tbody>
</table>
    </div>
  
  
  )
}

export default AllProduct;


// const fetchProducts = async () => {

// return await Axios.get(
//   "http://localhost:8080/api/QueryAllProducts"

//  ).then(res=>{
//          setProducts(res.response)
//          console.log(res.response);
//          console.log(products);

//      })

// }