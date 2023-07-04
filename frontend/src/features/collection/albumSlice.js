import { createSlice } from '@reduxjs/toolkit'
import { getListens } from './albumService'

import { setLocalStorage } from '../../components/hooks/utilityHooks'

const initialState = {
  album: {},
  totalListens: 0, // total count of listens for album
  totalTime: 0, // in seconds
  hasListens: false,
}

export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    resetAlbum: () => {
      localStorage.removeItem('albumData')
      return initialState
    },
    setAlbum: (state, action) => {
      setLocalStorage('albumData', action.payload)

      const album = action.payload
      const { listens, runtime } = album // ? album properties are destructured
      console.log(`albumSlice: setAlbum: listens: ${listens}`)
      return {
        ...state,
        album,
        totalListens: getListens(listens), // ? get listens from album and update state
        totalTime: getListens(listens) * runtime,
        hasListens: getListens(listens) > 0,
      }
    },
  },
})

export const { resetAlbum, setAlbum, setYearlyData, setMonthlyData } =
  albumSlice.actions

export default albumSlice.reducer
