import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  customKey: '',
  customValue: '',
  userFields: {}, 
  hasValue: false,
  message: '',
}

export const fieldSlice = createSlice({
  name: 'custFields',
  initialState,
  reducers: {
    resetFields: (state) => initialState,
    setCustomFields: (state, action) => {
      const { customKey, customValue } = action.payload
      return {
        ...state,
        customKey: customKey || state.customKey,
        customValue: customValue || state.customValue,
        hasValue: true,
      }
    },
  },
})

export const { resetFields, setCustomFields } = fieldSlice.actions

export default fieldSlice.reducer
