import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState,useEffect} from 'react';
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import { toast } from 'react-toastify';


function Edit() {

  const navigate = useNavigate()

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [id,setId] = useState("");
  
  // This State will check whether EDIT_ID key is present in Local Storage or not and will update accordingly.
  const [isID,setIsID] = useState(false);
   
  // Getting Data from Redux Store
  const data = useSelector(state => state.users);
  var  EDIT_ID;
  

  function getIDFromLocalStorage(){

  // Getting Id from Local Storage
   EDIT_ID = JSON.parse(localStorage.getItem("EDIT_ID"))
   setId(EDIT_ID)
   
   console.log("Surya",id);

  if (EDIT_ID!="") {
    setIsID(true);
  }

  let filteredData = data.filter((data)=>{
    return  EDIT_ID == data._id
  })

  setName(filteredData[0].name)
  setEmail(filteredData[0].email)
  setPhone(filteredData[0].phone)

}


  
  // This Function will be called whenever any new User is getting added to Database 
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
          setEmail("")
          setName("")
          setPhone("")
          toast.success("New User Added");
          navigate("/")
      

      } catch (error) {
        console.log(error)
      }

  }

  

  const updateUser = async (event) =>{
    event.preventDefault();

    const data = {
      name: name,
      email: email,
      phone: phone
    }
    
      try {
          let response = await fetch(`http://localhost:8080/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8"
            },
          body: JSON.stringify(data)
        
      });
          response = await response.json()
          console.log(response);

          localStorage.removeItem("EDIT_ID")
          setEmail("")
          setName("")
          setPhone("")
          toast.success("User Updated");
          navigate("/")

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
   <Button disabled = {name==="" || email==="" || phone===""}  onClick={isID ? updateUser : addNewUser} variant="primary"> {isID ? "Update User" : "Add User" }</Button>{' '}

   </div>
    </div>
  );
}

export default Edit;