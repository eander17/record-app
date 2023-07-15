import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import albumApiService from './albumApiService'

import { getErrorMessage } from '../../components/hooks/utilityFunctions'
import { retrieveFromLocalStorage } from '../../components/hooks/utilityHooks'

const storedAlbum = retrieveFromLocalStorage('albumData') || {}
const storedTotalTime =
  storedAlbum.length > 0 ? storedAlbum.listens.length * album.runtime : 0

const initialState = {
  album: storedAlbum || {},
  totalTime: storedTotalTime,
  unsavedChanges: false,
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: '',
}

/// API Calls ///
// update user Album
export const updateAlbum = createAsyncThunk(
  'collection/update',
  async (_, thunkAPI) => {
    try {
      console.log('triggered updateAlbum')
      const { album } = thunkAPI.getState().album
      if (!album) return thunkAPI.rejectWithValue('No album data found')
      const { token } = thunkAPI.getState().auth.user
      console.log(
        `updateAlbum contacting api - album: ${JSON.stringify(
          album.listens.length,
        )}`,
      )
      const returnItem = await albumApiService.updateAlbum(
        album._id,
        album,
        token,
      )
      console.log(
        `updateAlbum returnItem: ${JSON.stringify(returnItem.listens.length)}`,
      )
      return returnItem
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

// Delete user Album
export const deleteAlbum = createAsyncThunk(
  'collection/delete',
  async (id, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user
      return await albumApiService.deleteAlbum(id, token)
    } catch (error) {
      const message = getErrorMessage(error)
      return thunkAPI.rejectWithValue(message)
    }
  },
)

/// Slice ///
export const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {
    resetAlbum: () => {
      localStorage.removeItem('albumData')
      return initialState
    },
    // setAlbum: (state, action) => ({
    //   ...state,
    //   album: action.payload,
    //   totalTime: action.payload.listens.length * action.payload.runtime,
    // }),
    setAlbum: (state, action) => {
      const newAlbum = action.payload
      return {
        ...state,
        album: newAlbum,
        totalTime: newAlbum.listens.length * newAlbum.runtime,
      }
    },
    addListen: (state) => {
      const { album: oldAlbum } = state
      const { listens } = oldAlbum
      const newListen = new Date().toISOString()
      const newAlbum = {
        ...oldAlbum,
        listens: [...listens, newListen],
      }
      return {
        ...state,
        album: newAlbum,
        totalTime: newAlbum.listens.length * newAlbum.runtime,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateAlbum.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(updateAlbum.fulfilled, (state, action) => ({
        ...state,
        album: action.payload,
        totalTime: action.payload.listens.length * action.payload.runtime, // in seconds
        isLoading: false,
        isSuccess: true,
        isError: false,
        message: '',
      }))
      .addCase(updateAlbum.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      }))
      .addCase(deleteAlbum.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(deleteAlbum.fulfilled, (state) => ({
        ...state,
        isLoading: false,
        isSuccess: true,
        isError: false,
      }))
      .addCase(deleteAlbum.rejected, (state, action) => ({
        ...state,
        isLoading: false,
        isError: true,
        message: action.payload,
      }))
  },
})

export const { resetAlbum, setAlbum, addListen } = albumSlice.actions

export default albumSlice.reducer
