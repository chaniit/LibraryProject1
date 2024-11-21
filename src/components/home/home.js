import React from "react";
import '../home.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router";
import axios from "axios";

export default function Home() {
    const navigate = useNavigate();
    const [books, setBooks] = React.useState([]);
    const [book, setBook] = React.useState('');
    const [searchMessage, setSearchMessage] = React.useState('');

    React.useEffect(() => {
        axios.get('https://localhost:44360/api/Book/GetAllBooks')
            .then(res => {
                setBooks(res.data)
            })
    }, [])


    const handleClick = () => {
        const searchBook = books?.find(b => b.Name_book.trim() == book)
        if (searchBook && searchBook.Status === 'על המדף') {
            navigate(`/routeToBook/${searchBook.Id}/${searchBook.Name_book}`)
        }
        else {
            if (!searchBook) {
                setSearchMessage('הספר לא קיים בספריה')
            }
            else {
                setSearchMessage('(: ..הספר המבוקש מושאל כעת, אבל יש עוד הרבה ספרים בספריה')
            }

        }

    }

    const handleBookChange = (e) => {
        setBook(e.target.value)
        if (searchMessage) {
            setSearchMessage('')
        }

    }

    return (
        <>
            <div className="body">
                <div className="center">
                    <div className="header">
                        <h1>What the story??</h1>
                        <p>...כי להסתדר בספריה זה לא סיפור</p>
                    </div>
                    <div className="insertBook">
                        <TextField id="standard-basic" value={book} onChange={handleBookChange} label="הכנס/י ספר הרצוי לך" variant="standard" />
                    </div>
                    <div className="search">
                        <br></br>
                        <Button variant="contained" onClick={handleClick}>חפש</Button>
                    </div>
                    <h2>{searchMessage}</h2>
                </div>

               
            <div className="container row">
                <Button  class="btn" onClick={() => navigate('/findByParameters')} variant="contained"><p>מצא את הספר הרצוי</p></Button>

                <Button class="btn" onClick={() => navigate('/findByCategory')} variant="contained"><p>חפש לפי קטגוריה</p></Button>

                <Button  class="btn" onClick={() => navigate('/findNewBooks')} variant="contained" ><p> חפש ספרים חדשים</p></Button>

                <Button  class="btn" variant="contained" onClick={() => navigate('/findByWriter')}><p>חפש לפי שם סופר</p></Button>
            </div>
        </div>
        </>
    )
}