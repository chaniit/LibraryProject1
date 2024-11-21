
import * as React from 'react';
import axios from "axios";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";

export default () => {

const [books, setBook] = React.useState([]);
const [value, setValue] = React.useState(new Date());
const [message, setMessage] = React.useState('');
const navigate = useNavigate()

const [writers, setWriter] = React.useState([]);

  const handleChange = (newValue) => {
    setValue(newValue);
  };
function getBooksBydate(date){
  axios.get('https://localhost:44360/api/Book/GetByDate?date='+new Date(date).toISOString())
  .then(res => { 
    setBook(res.data)
    if(res.data.length===0)
    setMessage('מצטערים, אין ספרים מתאימים')
  });

  axios.get('https://localhost:44360/api/Writer/GetAllWriters')
        .then(res => {
            setWriter(res.data)
        })
}


  return (
    <div className="body">
    <h1>מצא את הספרים החדשים בספריה</h1>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
        <br></br>
      <DatePicker
        label="הכנס תאריך"
        value={value}
        onChange={(newValue) => {
          setMessage('')
          handleChange(newValue)
          getBooksBydate(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params}  />
        )}
      
      />
    </LocalizationProvider>
     {books.length >0 && <TableContainer component={Paper} style={{width:'95%'}}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
          <TableCell align="center">סופר</TableCell>
            <TableCell align="center">שם ספר</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books?.map((book) => (
            <TableRow
              key={book.Id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center">{writers.find(w=>w.Id === book.Writer_id)?.Name_writer}</TableCell>
              <TableCell align="center">{book.Name_book}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
     </TableContainer>}  {message}
     <IconButton color="primary" sx={{ position: 'absolute', top: 20, left: 20 }} onClick={() => navigate(-1)}><ArrowBackIcon fontSize="26" /></IconButton>
     </div>
     
  );
 
}