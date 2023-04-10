import { createSlice } from "@reduxjs/toolkit";
import { getAllUsers, createUser, deleteUser, updateUser } from "../../Api/userApi";
import Index from "../../components/Index";


const userSlice = createSlice({
    name:"user",
    initialState:{
        user :[],
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getAllUsers.fulfilled , (state,action)=>{
                state.user = action.payload.data
            })
            .addCase(createUser.fulfilled, (state,action)=>{
                Index.toast.success(action.payload.message)
            })
            .addCase(updateUser.fulfilled, (state,action)=>{
                Index.toast.success(action.payload.message)
            })
            .addCase(deleteUser.fulfilled, (state,action)=>{
                Index.toast.success(action.payload.message)
            })
    }
})

export default userSlice.reducer