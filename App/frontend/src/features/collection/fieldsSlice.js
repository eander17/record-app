import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  customKey: '', 
  customValue: '', 
  hasValue: false,
  message: '', 
}




export const fieldsSlice =  createSlice({
  name: 'fields', 
  initialState,
  reducers: {
    reset: (state) => initialState,
    setCustomFields: (state, action) => {
      const {customKey, customValue} = action.payload
      return {
        ...state, 
        customKey,
        customValue,
        hasValue: true
      }
    }, 
  }, 
})

export const {reset, setCustomFields} = fieldsSlice.actions
export default fieldsSlice.reducer
