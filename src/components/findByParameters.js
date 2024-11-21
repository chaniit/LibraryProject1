import React from "react";
import './home.css'
import axios from "axios";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom'

export default () => {

  const [books, setBook] = React.useState([]);
  const [writers, setWriter] = React.useState([]);
  const age = React.useRef();
  const kind = React.useRef();
  const [message, setMessage] = React.useState('');
  const navigate = useNavigate()

  function getBooksByParameters() {
    axios.get('https://localhost:44360/api/Book/GetByParametrs?age=' + age.current.value + '&kind=' + kind.current.value)
      .then(res => {
        if (res.data.length) {
          setBook(res.data)
        }
        else {
          setMessage('אין ספרים התואמים לחיפוש שלך..')
        }

      })

    axios.get('https://localhost:44360/api/Writer/GetAllWriters')
      .then(res => {
        setWriter(res.data)
      })
  }

  function handleChange() {
    if (message) {
      setMessage('')
    }
  }

  return (
    <div className="body">
      <div className="center">
        <h1>---מצא את הספר הרצוי</h1>
        <TextField
          inputRef={age}
          onChange={handleChange}
          name="age"
          id="standard-number"
          label="גיל יעד"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
        <br></br>
        <br></br>

        <TextField id="filled-basic" label="סוג סיפורת" variant="filled" name="kind" onChange={handleChange} inputRef={kind} required />
        <br></br>
        <br></br>
        <Button class="search_button" variant="contained" onClick={() => getBooksByParameters()}>חפש</Button>
      </div>
      {message || books.length > 0 && <TableContainer component={Paper} style={{ width: '30vw' }}>
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
                <TableCell align="center">{writers.find(w => w.Id === book.Writer_id)?.Name_writer}</TableCell>
                <TableCell align="center">{book.Name_book}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      <IconButton color="primary" sx={{ position: 'absolute', top: 20, left: 20 }} onClick={() => navigate(-1)}><ArrowBackIcon fontSize="26" /></IconButton>
    </div>


  )
}