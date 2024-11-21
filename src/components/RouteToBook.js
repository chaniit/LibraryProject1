import React from "react";
import './home.css'
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom'
import Route from './Route'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from "@mui/material";

export default function RouteToBook() {
    const { Id, name } = useParams()
    const [route, setRoute] = React.useState([]);
    const [message, setMessage] = React.useState('');
    const navigate = useNavigate()

    React.useEffect(() => {

        axios.get(`https://localhost:44360/api/Graph/findRouteByBookId?id=${Id}`)
            .then(res => {
                setRoute(res.data)
            })
            .catch(err => setMessage('המסלול לספר לא נמצא'))

    }, [])

    return <div>
        <h1>{message || `:הניתוב לספר ${name} `}</h1>
        <IconButton color="primary" sx={{ position: 'absolute', top: 20, left: 20 }} onClick={() => navigate(-1)}><ArrowBackIcon fontSize="26" /></IconButton>
        <Route route={route} />
    </div>
}