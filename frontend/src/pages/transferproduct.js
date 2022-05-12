import React from 'react';
import '../all.css';
import { useState, useEffect } from "react";
import axios from "axios";

const TransferProduct = () => {
    const [data, setData] = useState({
        id: "",
        oname: "",
        area: ""
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
            newOwner: data.oname,
            newArea: data.area
        };
        axios
          .put("http://localhost:8080/api/TransferProduct/"+data.id, userData)
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
    <div>
             <form method="post">
        <label htmlFor="header-search">
            <span className="visually-hidden">From</span>
        </label>
        <input type="text" name="id" value={data.id}  placeholder="ID" onChange={handleChange}
/>
          <label htmlFor="header-search">
            <span className="visually-hidden">TO</span>
        </label>
        <input type="text" name="oname" value={data.oname}  placeholder="Enter New Owner"  onChange={handleChange}
 />

<label htmlFor="header-search">
            <span className="visually-hidden">TO</span>
        </label>
        <input type="text" name="area" value={data.area}  placeholder="Enter new Location"  onChange={handleChange}
 />

        <button type="submit" onClick={handleSubmit}>Transfer</button>
    </form>

    </div>
);
};

export default TransferProduct;