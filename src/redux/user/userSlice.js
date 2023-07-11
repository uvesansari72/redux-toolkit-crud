import { createSlice } from "@reduxjs/toolkit";
import {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
} from "./userApi";
import Index from "../../components/Index";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsers.pending, (state, action) => {
       state.loading = true
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.user = action.payload.data;
        state.loading=false
      })
      .addCase(createUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(createUser.fulfilled, (state, action) => {
        Index.toast.success(action.payload.message);
        state.loading=false
      })
      .addCase(updateUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        Index.toast.success(action.payload.message);
        state.loading = false
      })
      .addCase(deleteUser.pending, (state, action) => {
        state.loading = true
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        Index.toast.success(action.payload.message);
      });
  },
});

export default userSlice.reducer;
