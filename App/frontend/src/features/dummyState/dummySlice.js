import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  dummy: [],
  isDummy: true, 
  message: 'This is a dummy message',
  status: null, 
}

const dummySlice = createSlice({
  name: 'dummy',
  initialState,
  reducers: {
    addDummy: (state, action) => {
      state.dummy.push(action.payload)
    },
  }, 
})

export const { addDummy } = dummySlice.actions

export default dummySlice.reducer
