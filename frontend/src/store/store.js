import {configureStore} from '@reduxjs/toolkit';
import AdminReducer from './features/adminSlice'
export default configureStore({
    reducer:{
        admin:AdminReducer, 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}),
})