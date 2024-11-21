import React, { useState } from "react";
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import FilledInput from '@mui/material/FilledInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import PasswordIcon from '@mui/icons-material/Password';
import { AddBusinessRounded } from "@mui/icons-material";
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import Button from '@mui/material/Button';


export default () => {
  const navigate = useNavigate();
  const [message,setMessage]=useState('')

    function CheckPassword(event){
        event.preventDefault();
        let user={
           Name_user:event.target.userName.value,
           password:event.target.password.value,
        }

    
        axios.post('https://localhost:44360/api/User/CheckPassword',user)
        .then(res=>{
           console.log(res.data);  
           if(res.data.Id)
            navigate('/home')
            else
            setMessage('שם משתמש או הסיסמא אינם נכונים')     
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
        <form onSubmit={(e)=>CheckPassword(e)}>
        <div className="body">
            <div className="center">
            <h1>התחברות</h1>
            <TextField helperText={message} id="filled-basic" label="שם משתמש" variant="filled" name="userName" required /> 
            <PersonIcon className="Icon"></PersonIcon>   
            <Box class="password" sx={{ display: 'flex', flexWrap: 'wrap' }} required >
                <div>                 
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="filled" >
                        <InputLabel htmlFor="filled-adornment-password" required>סיסמא</InputLabel>
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
            <br></br>
            <button class="login_button" type="submit">אישור</button> 
            <br></br>
            <br></br>
            <Button  onClick={()=>navigate('/sign-up')} variant="outlined"  ><p>עדיין לא רשום? לחץ כאן להרשם</p></Button>
            </div>
            </div>
            </form>
        </>
      
    )
}