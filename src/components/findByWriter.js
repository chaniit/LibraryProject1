
import React from "react";
import './home.css'
import axios from "axios";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
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
  const [writers, setWriter] = React.useState([]);
  const [writerId, setwriterId] = React.useState(0);
  const [books, setBook] = React.useState([]);
  const navigate = useNavigate()

  React.useEffect(() => {

    axios.get('https://localhost:44360/api/Writer/GetAllWriters')
      .then(res => {
        setWriter(res.data)
      })

    axios.get('https://localhost:44360/api/Book/GetAllBooks')
      .then(res => {
        setBook(res.data)
      })

  }, [])

  const handleChange = (event) => {
    setwriterId(event.target.value);
  };
  return (
    <div className="body">
      <div className="center">
        <h1>חפש לפי שם סופר</h1>
        <IconButton color="primary" sx={{ position: 'absolute', top: 20, left: 20 }} onClick={() => navigate(-1)}><ArrowBackIcon fontSize="26" /></IconButton>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">שם סופר</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            defaultValue={writerId}
            onChange={handleChange}
          >
            <MenuItem value={0}>
              <em>בחר שם סופר</em>
            </MenuItem>
            {writers?.map((writers) => (
              <MenuItem key={writers.Id} value={writers.Id}>{writers.Name_writer}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {books.length > 0 && writerId !== 0 && <TableContainer component={Paper} style={{ width: '30vw' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">שם ספר</TableCell>
              <TableCell align="center">סופר</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.filter(x => writerId && x.Writer_id === writerId || !writerId).map((book) => (
              <TableRow
                key={book.Id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{book.Name_book}</TableCell>
                <TableCell align="center">{writers.find(w => w.Id === book.Writer_id)?.Name_writer}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
    </div>
  )

}
