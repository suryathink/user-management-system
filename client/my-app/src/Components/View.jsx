import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useDispatch,useSelector } from "react-redux";


const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const myStyle ={
  textAlign:"center",
  margin:"auto",
  width:"90%",
 }


export default function View() {

    
  const data = useSelector(state => state.users)
  // const data = useSelector(state => state.users);
   
  // console.log("View Data",data);

  const view_ID = JSON.parse(localStorage.getItem("viewId"))
  
  let filteredData = data.filter((data)=>{
    return  view_ID == data._id
  })
  // console.log("Filtered Data",filteredData);

   


  return (
    <div style={myStyle}>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Serial No</StyledTableCell>
            <StyledTableCell align="center">ID</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Email</StyledTableCell>
            <StyledTableCell align="center">Phone</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredData.map((value,i) => (
            <StyledTableRow key={1}>
              <StyledTableCell component="th" scope="row">{1}</StyledTableCell>
              <StyledTableCell align="center">{value._id}</StyledTableCell>
              <StyledTableCell align="center">{value.name}</StyledTableCell>
              <StyledTableCell align="center">{value.email}</StyledTableCell>
              <StyledTableCell align="center">{value.phone}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </div>
  );
}

