import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import * as api from '../api' 

export const login=createAsyncThunk('admin/login',async({formData,navigate},{rejectWithValue})=>{
    try{
        const responce=await api.logIn(formData)
            navigate("/admindashboard")
            return responce.data
         
    }catch(err){
        return rejectWithValue(err.responce.data)
    }
} )

export const logout=createAsyncThunk('admin/logout',async({navigate})=>{
    navigate('/')
    return null
} )

//<----------------------------------------------------------------------------------------------------------------
const adminSlice=createSlice({
    name:'admin',
    initialState:{
        adminInfo:null,
        error:"",
        loading:false,
    },
    extraReducers:{

        [login.pending]:(state,action)=>{
            state.loading=true
            state.error='' 
        },
        [login.fulfilled]:(state,action)=>{
            state.loading=false
            localStorage.setItem('adminTocken',JSON.stringify(action.payload.adminTocken));
            const {adminTocken,...data}=action.payload
            state.adminInfo=data
        },
        [login.rejected]:(state,action)=>{
            state.loading=true
            state.error='' 
        },
        [logout.pending]:(state,action)=>{
            state.loading=true
            state.error='' 
        },
        [logout.fulfilled]:(state,action)=>{
            state.loading=false
            localStorage.removeItem('adminTocken');
            state.adminInfo=null
        },
        [logout.rejected]:(state,action)=>{
            state.loading=true
            state.error='' 
        },
    }

}) 
;
export default adminSlice.reducer