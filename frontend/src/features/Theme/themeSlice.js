/** @format */

import { createSlice } from '@reduxjs/toolkit'

export const themeOnLoad = () => {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark'
  }
  return 'light'
}

const initialState = themeOnLoad()

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) =>
      state === 'dark' ? console.log('light') : console.log('dark'),
  },
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
