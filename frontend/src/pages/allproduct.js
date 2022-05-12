import React, { useState, useEffect } from "react";
import '../all.css';
import Axios from "axios";


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
    <tr key={product.id}>
       <th>{product.id}</th>
       <th>{product.name}</th>
       <th>{product.area}</th>
       <th>{product.ownerName}</th>
       <th>{product.cost}</th>
     </tr>
   ) );
  
 }
useEffect(() => {
  fetchProducts();
}, []);


  return (
    
    <div>

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