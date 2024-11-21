import React from "react";
import axios from 'axios';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import CallIcon from '@mui/icons-material/Call';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import {useNavigate} from 'react-router-dom'
import { AddBusinessRounded, EventBusyTwoTone } from "@mui/icons-material";


export default () => {

const navigate = useNavigate();

 function addUser(event){
     event.preventDefault();
     let user={
        Name_user:event.target.userName.value,
        password:event.target.password.value,
        phone:event.target.phone.value,
        email:event.target.email.value
     }

    axios.post('https://localhost:44360/api/User/AddUser',user)
    .then(res=>{
        console.log(res.data);
    alert("נרשמת בהצלחה!")
        navigate('/home')
    })
  
    .catch(err=> console.log(err))
}

    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    return (
        <>
        <form onSubmit={(e)=>addUser(e)}>
        <div className="body">
            <div className="center-sign-up">
            <h1>הרשמה</h1>
        <div>
            <TextField id="filled-basic" className="nameinput" label="שם משתמש" variant="filled" name="userName"  required />
            <PersonIcon className="Icon"></PersonIcon>
            </div>
            <Box id="password" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <div>
                    <FormControl  sx={{ m: 1, width: '25ch' }} variant="filled">
                        <InputLabel  htmlFor="filled-adornment-password" required>סיסמא</InputLabel>

                        <FilledInput 
                            name="password"
                            id="filled-adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton 
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            
                        />
                    </FormControl>
                    <PasswordIcon className="Icon"></PasswordIcon>
                </div>
            </Box>
            <div>
            <TextField id="filled-basic" label="טלפון"  variant="filled" name="phone" required/>
            <CallIcon className="Icon"></CallIcon>
            </div>
            <br></br>
            <TextField id="filled-basic" label="מייל" name="email" variant="filled" />
            <EmailIcon className="Icon"></EmailIcon>
            <br></br>
            <br></br>
            <button class="login_button" type='submit'>אישור</button> 
            </div>
            </div>
            </form>
        </>
    )
}