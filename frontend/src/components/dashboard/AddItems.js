import { Button, Grid, TextField } from '@mui/material'
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import React,{useEffect,useState} from 'react'
import { addProducts } from '../../store/api';

function AddItems() {
  const [name,setName]=useState("")
  const [amount,setAmount]=useState("")
  const [quantity,setQuantity]=useState()
  const [image,setImage]=useState(null)
  const handleSubmit=async()=>{
    if(name==="" ||amount==="" || quantity==="" || image===null){
        alert('Add All Fields Post')
    }else{               
           const formData=new FormData()
           formData.append("productImage",image)
           formData.append("productName",name)
           formData.append("quantity",quantity)
           formData.append("amount",amount)            
           await addProducts(formData).then((data)=>{
            alert("Product up loaded success fully")
           }).catch((err)=>{
            alert("Something went wrong")
           })
        setName("")
        setAmount("")
        setQuantity("")  
        setImage(null)     
    }
}
const handleImage=(e)=>{
    setImage(e.target.files[0])
}
  return (
    <Grid container sx={{mt:4,alignItems:'start', gap:2, border:'2px', borderRadius:3,display:'flex',flexDirection:'column'}}>
      <Grid item>
      <TextField 
          id="outlined-basic" 
          label="Product Name" 
          variant="outlined" 
          value={name} 
          sx={{m:2}}
          onChange={(e)=>{setName(e.target.value)}}
          fullWidth
          />
      </Grid>
      <Grid item>
      <TextField 
          id="outlined-basic" 
          label="Quantity" 
          variant="outlined" 
          value={quantity} 
          sx={{m:2}}
          onChange={(e)=>{setQuantity(e.target.value)}}
          fullWidth
          />
      </Grid>
      <Grid item>
      <TextField 
          id="outlined-basic" 
          label="Amount" 
          variant="outlined" 
          value={amount} 
          sx={{m:2}}
          onChange={(e)=>{setAmount(e.target.value)}}
          fullWidth
          />
      </Grid>
      <Grid item>
      <Button variant="contained" component="label">
            <AddPhotoAlternateIcon/>
          Upload Image
          <input
            type="file"
            filename='postImage'
            onChange={handleImage}
            hidden
          /></Button>
      </Grid>
      <Grid>
      <Button variant="contained" component="label" sx={{maxHeight:40}} onClick={handleSubmit} color="success">Update</Button>
      </Grid>

    </Grid>
  )
}

export default AddItems
