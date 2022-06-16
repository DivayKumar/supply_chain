import React, { useState, useEffect } from "react";

import axios from "axios";

import { useForm } from "react-hook-form";

const TransferProduct = () => {
  const [props, setProps]=useState(JSON.parse(localStorage.getItem('products')));  

  
  const { handleSubmit, watch, register } = useForm({ mode: "onChange" });

    

      const Submit =  async (formData) => {

        const userData = {
          new_id: formData?.id,
          newOwner: formData?.oname,
          newArea: formData?.area
        };

        const { data }  = await axios.get(
          "http://localhost:8080/api/QueryProductById/"+formData?.id
        );

        let parseData = JSON.parse(data.response);


        var cost=parseData?.cost;
        var budget=props.budget;
      


        if(cost>budget ){
          alert("unable to transfer product");

        }
        
        else{
         

        await axios
          .put("http://localhost:8080/api/TransferProduct/"+formData?.id, userData)
          .then((response) => {
            console.log(response);
            if (response.status== 200) { alert("SUCCESSFUL!"); }
            else { alert("FAILURE!"); }
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
          budget=budget-cost;
          var userUpdate= {
            gmail:props.email,
            newbudget:budget
            
          };
          console.log(userUpdate.newbudget);
      
              await axios
              .put("http://localhost:8080/api/updatebudget/"+props.email,userUpdate)
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
        }


      };


return (
  <form  onSubmit={handleSubmit(Submit)} >
  <h3>Buy Product</h3>
  <div className="mb-3">
    <label>ID</label>
    <input
      type="text"
      name="id" 
      className="form-control"
      placeholder="Enter ID"
//       value={id}
// onChange={(e) => setID(e.target.value)}
{...register('id')}
value={watch("id")}
    />
  </div>
  <div className="mb-3">
    <label>New Owner Name</label>
    <input
      type="text"
      name="oname" 
      className="form-control"
      placeholder="Enter password"
//       value={oname}
// onChange={(e) => setOname(e.target.value)}
{...register('oname')}
value={watch("oname")}
    />
  </div>

  <div className="mb-3">
    <label>New Location</label>
    <input
      type="text"
      name="area" 
      className="form-control"
      placeholder="Enter New Location"
//       value={area}
// onChange={(e) => setArea(e.target.value)}
{...register('area')}
value={watch("area")}
    />
  </div>

  <div className="d-grid">
    <button type="submit"  className="btn btn-primary">
     Buy
    </button>
  </div>

</form>
);
};

export default TransferProduct;