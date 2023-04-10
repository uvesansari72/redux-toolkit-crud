import Axiosinstance from "../services/DataService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAllUsers = createAsyncThunk('user/getAllUser', async () =>{  // user/getAlluser will behave as a action
    const response  = await Axiosinstance.get('/getUsers')
    return response.data
})

export const createUser = createAsyncThunk('user/createUser', async (urlencoded) =>{  
    const response  = await Axiosinstance.post('/createUser', urlencoded)
    return response.data
})


export const updateUser = createAsyncThunk('user/updateUser', async (urlencoded) =>{  
    const response  = await Axiosinstance.put('/updateUser', urlencoded)
    return response.data
})

export const deleteUser = createAsyncThunk('user/delete', async (urlencoded) =>{  
    const response  = await Axiosinstance.delete(`/deleteUser/${urlencoded}`)
    return response.data
})
