import { createSlice } from "@reduxjs/toolkit";
const initial_state={
    user:null,
    isAuthenticated:null
};
const userSlice = createSlice({
  name: 'user',
  initialState:initial_state,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload
      state.isAuthenticated = true
    },
    logoutUser: (state) => {
      state.user = null
      state.isAuthenticated = false
    },
  },
});
export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;