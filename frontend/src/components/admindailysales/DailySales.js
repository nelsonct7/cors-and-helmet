import React,{useState,useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {  Grid, Typography } from '@mui/material';
import Moment from 'react-moment'; 
import { getDailyReport } from '../../store/api';


function DailySales() {
    const [dailyAmount,setDailyAmount]=useState(0)
    const [productList,setProductList]=useState([])
    useEffect(()=>{
      const getData=async()=>{
        await getDailyReport().then((data)=>{
          console.log(data);
          setProductList(data.data.data)
          setDailyAmount(data.data.totalAmount[0].total_count)
          
        }).catch((err)=>{
          console.log(err);
        })
      }
      getData()
    },[])
  return (
    <Grid container spacing={2} sx={{p:3}} marginTop={400}>
        <Grid item xs={12}><Typography variant='h4'>Sales Report</Typography></Grid>
        <Grid item xs={10}>
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Product ID</TableCell>
            <TableCell align="right">Product Name</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell align="right">Image</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {productList?.map((product,index) => (
            <TableRow
              key={product._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {product._id}
              </TableCell>
              <TableCell align="right">{product.productName}</TableCell>
              <TableCell align="right">{product.quantity}</TableCell>
              <TableCell align="right">{product.amount}</TableCell>
              <TableCell align="right"><img style={{width:50,height:50}} src={"http://localhost:5000/product-images/"+product.productImage}/></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table>
      <TableHead>
        <TableRow>
          <TableCell><h4>Total Sails : <Moment format="YYYY/MM/DD">{new Date()}</Moment> : </h4></TableCell>
          <TableCell><h3>{dailyAmount?dailyAmount:""}</h3></TableCell>
        </TableRow>
      </TableHead>
      </Table>
    </TableContainer>

        </Grid>
    </Grid>
  )
}

export default DailySales
