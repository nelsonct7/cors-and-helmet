import {
    Alert,
    Box,
    Button,
    Container,
    CssBaseline,
    TextField,
    Typography
} from '@mui/material'
import React,{useState,useEffect} from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from 'react-router-dom'
import { login } from '../../store/features/adminSlice';
import {useSelector,useDispatch} from 'react-redux'

const theme = createTheme();
const formValue={
    adminEmail:"",
    adminPassword:""
  }

function AdminLogin() {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const [formData,setFormData]=useState(formValue)
    const [emailError,setemailError]=useState('')
    const [passwordError,setpasswordError]=useState('')
    const [isError,setisError]=useState('')

    const validEmail=()=>{ 
        const {adminEmail}=formData
        if(adminEmail==='' || /^\s*$/.test(adminEmail)){
          setemailError('Email required')
          return false
        }else if(!adminEmail?.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
          setemailError('Email Invalid')
          return false
        }else{
          setemailError('')
          return true
        }
      }
      const validPassword=()=>{
        const {adminPassword}=formData
        if(adminPassword===''){
          setpasswordError('Password required')
          return false
        }else if(adminPassword.length<3){
          setpasswordError('Password atleast 3')
          return false
        }else{
          setpasswordError('')
          return true
        }
      }
      const handleLoginSubmit=(e)=>{
        e.preventDefault()
        if(validEmail() && validPassword()){
          setisError("")
          dispatch(login({formData,navigate}))
        }else{
          setisError('Please fill up the form')
        }
    
      }
      const onInputChange=(e)=>{
        const {name,value}=e.target
        setFormData({...formData,[name]:value})
      }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <Box sx={
                    {
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }
                }>
                    <Typography component="h1" variant="h5">
                        Admin Sign in
                    </Typography>
                    <Box 
                        sx={
                            {mt: 1}
                    }>
                        <TextField margin="normal" required fullWidth id="email" label="Email Address" name="adminEmail" autoComplete="email" autoFocus onChange={onInputChange} onKeyUp={validEmail}/>
                        {emailError?<Alert severity="error">{emailError}</Alert>:''}
                        <TextField margin="normal" required fullWidth name="adminPassword" label="Password" type="password" id="password" autoComplete="current-password" onChange={onInputChange} onKeyUp={validPassword}/>
                        {passwordError?<Alert severity="error" >{passwordError}</Alert>:''}
                        <Button fullWidth variant="contained"
                            sx={
                                {
                                    mt: 3,
                                    mb: 2
                                }
                        }
                        onClick={handleLoginSubmit}>
                            Sign In
                        </Button>
                        {isError?<Alert severity="error">{isError}</Alert>:''}
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default AdminLogin
