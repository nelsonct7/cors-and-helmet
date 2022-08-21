import axios from 'axios'
const API = axios.create({baseURL:'http://localhost:5000'});
export const logIn=(formData)=>API.post('/admin/login',{...formData})
export const getFive=()=>API.get('/admin/gettop5',{headers:{tocken:localStorage.getItem('adminTocken')}})
export const getDailyReport=()=>API.get('/admin/getdailyreport',{headers:{tocken:localStorage.getItem('adminTocken')}})
export const addProducts=(formData)=>API.post('/admin/insertdata',formData,{headers:{tocken:localStorage.getItem('adminTocken'),"Content-Type": "multipart/form-data"}})