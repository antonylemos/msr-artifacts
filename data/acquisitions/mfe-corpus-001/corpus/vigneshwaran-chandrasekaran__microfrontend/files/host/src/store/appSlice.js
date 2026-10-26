import { createSlice } from '@reduxjs/toolkit';

const appSlice = createSlice({
  name: 'app',
  initialState: { activeRoute: '/' },
  reducers: {
    setActiveRoute: (state, action) => { state.activeRoute = action.payload; },
  },
});

export const { setActiveRoute } = appSlice.actions;
export default appSlice.reducer;
