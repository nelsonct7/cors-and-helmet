import React,{useCallback} from 'react'
import { Box, Grid, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography,} from '@mui/material'
import DashboardCustomizeRoundedIcon from '@mui/icons-material/DashboardCustomizeRounded';
import SupervisedUserCircleRoundedIcon from '@mui/icons-material/SupervisedUserCircleRounded';
import StoreRoundedIcon from '@mui/icons-material/StoreRounded';
import LogoutIcon from '@mui/icons-material/Logout';
import {useNavigate} from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { logout } from '../../store/features/adminSlice';
function Sidebar({setVisi}) {
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleClick=useCallback((value)=>{
        console.log(value);
        setVisi(value)
    },[setVisi])
    const handleLogout=()=>{
        dispatch(logout({navigate}))
    }
  return (
    <Box sx={{ width: '100%', maxWidth: 200,padding:2, height:'100%',marginBottom:1,boxShadow:10,bgcolor:'#613dc1',borderRadius:2,display:{xs:'none',sm:'block',textAlign:'center'}}} >
    <h2>Admin Panel</h2>
    <Box sx={{position:'fixed',}}>
    <nav aria-label="main mailbox folders">
      <List sx={{marginTop:4}}>
        <ListItem disablePadding onClick={()=>handleClick("additems")}>
          <ListItemButton>
            <ListItemIcon>
              <DashboardCustomizeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Additems" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={()=>handleClick("products")}>
          <ListItemButton>
            <ListItemIcon>
              <SupervisedUserCircleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={()=>handleClick("reports")}>
          <ListItemButton>
            <ListItemIcon>
              <StoreRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Reports" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding onClick={()=>handleLogout()}>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </ListItem>
      </List>
    </nav>
  </Box>
  </Box>
  )
}

export default Sidebar
