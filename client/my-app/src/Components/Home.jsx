import React, { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import {useDispatch,useSelector } from "react-redux";
import { toast } from 'react-toastify';

const Home = () => {
  // const [data, setData] = useState([]);
  const dispatch = useDispatch();

  const data = useSelector(state => state.users);
  console.log("Data",data)

  const getData = async () => {
    try {
      let result = await fetch(`https://combative-blazer-moth.cyclic.app/users`);
      result = await result.json();

      dispatch({
        type: "ADD",
        payload:result.users
      })

      // console.log("Inside State", data);
    } catch (error) {
      console.log(error);
    }
  };

  // Storing _id to local storage for Viewing Purpose
  const handleView = (row)=>{
   localStorage.setItem("viewId",JSON.stringify(row._id))
  }
  
  // Deleting the User with Specific ID
  const handleDelete = async (row)=>{
    let idToBeDeleted = row._id;
    
    try {
      let response = await fetch(`https://combative-blazer-moth.cyclic.app/users/${idToBeDeleted}`,{
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
      }
      })
      response = await response.json();
      getData();
      toast.success("User Deleted");
      
    } catch (error) {
      alert(`User Deletion Failed`)
    }

  }

  // Handle Edit

  const handleEdit = (row)=>{
    localStorage.setItem("EDIT_ID",JSON.stringify(row._id))
  }

  useEffect(() => {
    getData();
  }, []);



  return (
    <div>
    <br/>
    <Link to="/edit">
      <Button onClick={()=>{localStorage.removeItem("EDIT_ID")}} variant="primary" size="lg" active>
     Add User
      </Button>{" "}
      </Link>
      <br/>
      <div>

      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Serial Number</TableCell>
            <TableCell align="center">_id</TableCell>
            <TableCell align="center">Name</TableCell>
            <TableCell align="center">VIEW</TableCell>
            <TableCell align="center">EDIT</TableCell>
            <TableCell align="center">DELETE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row,i) => (
            <TableRow
              key={i+1}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{i+1}</TableCell>
              <TableCell align="center" component="th" scope="row">
                {row._id}
              </TableCell>
              <TableCell align="center">{row.name}</TableCell>
              <TableCell align="center"><Link to="/view">{<Button onClick={()=>{handleView(row)}} variant="outlined" color="blue">View</Button>}</Link></TableCell> 
            <TableCell align="center">{  <Link to="/edit"> <Button  onClick={()=>{handleEdit(row)}} variant="outlined">Edit</Button></Link>}</TableCell> 
              <TableCell align="center">{<Button onClick={()=>{handleDelete(row)}} variant="outlined">Delete</Button>}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
      <br/>
    </div>
  );
};

export default Home;
