import { combineReducers } from '@reduxjs/toolkit';
import userReducer from './user/userSlice'

const rootReducer = combineReducers({
  userReducer: userReducer,
});

export default rootReducer;
