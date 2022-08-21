import { Box, Grid, Stack } from '@mui/material'
import React,{useState,useEffect} from 'react'
import DailySales from '../components/admindailysales/DailySales'
import TopFive from '../components/admintopfive/TopFive'
import Dashboard from '../components/dashboard/AddItems'
import Sidebar from '../components/sidebar/Sidebar'

function AdminDashBoard() {
  const [visibility,setVisibility]=useState("products")
  return (
    <Box>
        <Stack direction='row' spacing={2} justifyContent='space-between'>
            <Sidebar setVisi={setVisibility}/>
            {visibility==="additems" && <Dashboard/>}
            {visibility==="products" && <TopFive/>}
            {visibility==="reports" && <DailySales/>}
        </Stack> 
    </Box>
  )
}

export default AdminDashBoard
