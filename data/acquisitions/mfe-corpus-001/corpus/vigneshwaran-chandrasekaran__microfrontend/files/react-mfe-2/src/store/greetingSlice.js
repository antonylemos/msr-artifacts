import { createSlice } from '@reduxjs/toolkit';

const greetingSlice = createSlice({
  name: 'greeting',
  initialState: { name: '', submitted: false },
  reducers: {
    setName:      (state, action) => { state.name = action.payload; },
    submitName:   (state)         => { state.submitted = true; },
    resetGreeting:(state)         => { state.name = ''; state.submitted = false; },
  },
});

export const { setName, submitName, resetGreeting } = greetingSlice.actions;
export default greetingSlice.reducer;
