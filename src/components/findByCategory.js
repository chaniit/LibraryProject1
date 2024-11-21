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
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";
import { useNavigate } from 'react-router-dom'

export default () => {
  const [categories, setCategory] = React.useState([]);
  const [categoryId, setCategoryId] = React.useState(0);
  const [writers, setWriter] = React.useState([]);
  const [books, setBook] = React.useState([]);
  const navigate = useNavigate()

  React.useEffect(() => {

    axios.get('https://localhost:44360/api/Category/GetAllCategory')
      .then(res => {
        setCategory(res.data)
      })

    axios.get('https://localhost:44360/api/Book/GetAllBooks')
      .then(res => {
        setBook(res.data)
      })

    axios.get('https://localhost:44360/api/Writer/GetAllWriters')
      .then(res => {
        setWriter(res.data)
      })

  }, [])



  const handleChange = (event) => {
    setCategoryId(event.target.value);
  };
  return (
    <div className="body">
      <div className="center">
        <h1>חפש לפי קטגוריה</h1>
        <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-filled-label">קטגוריה</InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            defaultValue={categoryId}
            onChange={handleChange}
          >
            <MenuItem value={0}>
              <em>בחר קטגוריה</em>
            </MenuItem>
            {categories?.map((categories) => (
              <MenuItem key={categories.Id} value={categories.Id}>{categories.name_category}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      {books.length > 0 && categoryId !== 0 &&  <TableContainer component={Paper} style={{ width: '30vw' }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">סופר</TableCell>
              <TableCell align="center">שם ספר
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books?.filter(x => x.Category_id === categoryId).map((book) => (
              <TableRow
                key={book.Id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="center">{writers.find(w => w.Id === book.Writer_id)?.Name_writer}</TableCell>
                <TableCell align="center">{book.Name_book}
                  {book?.url && <img src={require(`../assets/images/${book.url}.jpg`)} />}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>}
      <IconButton color="primary" sx={{ position: 'absolute', top: 20, left: 20 }} onClick={() => navigate(-1)}><ArrowBackIcon fontSize="26" /></IconButton>
    </div>
  )
}