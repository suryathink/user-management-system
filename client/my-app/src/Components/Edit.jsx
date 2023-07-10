import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState,useEffect,useRef } from 'react';
import {useSelector} from "react-redux"

function Edit() {

  const Ref = useRef(null);
  
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [isID,setIsID] = useState(false);
   
  const data = useSelector(state => state.users);

  
  // Check if Local Storage is Empty or not If Yes then Call this function


  function getIDFromLocalStorage(){

  // Getting Id from Local Storage
  const EDIT_ID = JSON.parse(localStorage.getItem("EDIT_ID"))

  if (EDIT_ID) {
    setIsID(true);
  }

  let filteredData = data.filter((data)=>{
    return  EDIT_ID == data._id
  })

  setName(filteredData[0].name)
  setEmail(filteredData[0].email)
  setPhone(filteredData[0].phone)

  console.log("filteredData",filteredData);
}


  

  const addNewUser = async (event) =>{
      event.preventDefault();
      try {
          let response = await fetch("http://localhost:8080/users", {
          method: "POST",
          body: JSON.stringify({
          name: name,
          email: email,
          phone: phone
          }),
          headers: {
          "Content-type": "application/json; charset=UTF-8"
          }
      });
          response = await response.json()
          console.log(response);
          localStorage.removeItem("EDIT_ID")
          setEmail("")
          setName("")
          setPhone("")

      } catch (error) {
        console.log(error)
      }

  }

  useEffect(()=>{
    if (localStorage.getItem("EDIT_ID")){
      getIDFromLocalStorage()
    }
  },[])

  return (

    <div style={{margin:"0",padding:"0",width:"50%",alignItems:"center",justifyContent:"center"}}>
 
       <Form.Floating  className="mb-3">
        <Form.Control
          id="nameInput"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e)=>{ setName(e.target.value)}}
        />
        <label  htmlFor="nameInput">Name</label>
      </Form.Floating>

      <Form.Floating  className="mb-3">
        <Form.Control
          id="floatingInputCustom"
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e)=>{ setEmail(e.target.value)}}
        />
        <label htmlFor="floatingInputCustom">Email address</label>
      </Form.Floating>

      <Form.Floating>
        <Form.Control
          id="NumberInput"
          type="Number"
          placeholder="Number"
          value={phone}
          onChange={(e)=>{ setPhone(e.target.value)}}

        />
        <label htmlFor="NumberInput">Number</label>
      </Form.Floating>
  
   <div>
   <Button ref={Ref} disabled = {name==="" || email==="" || phone===""}  onClick={addNewUser} variant="primary"> {isID ? "Update User" : "Add User" }</Button>{' '}

   </div>
    </div>
  );
}

export default Edit;