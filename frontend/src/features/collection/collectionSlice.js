/** @format */
/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import collectionService from './collectionService'

const initialState = {
  collection: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  isEdit: false, // todo - do I need this?
  message: '',
}

// Create new Album
export const createAlbum = createAsyncThunk(
  'collection/create',
  async (albumData, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user
      return await collectionService.createAlbum(albumData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

// Get user Album Collection
export const getCollection = createAsyncThunk(
  'collection/getAll',
  async (_, thunkAPI) => {
    try {
      const { token } = thunkAPI.getState().auth.user
      return await collectionService.getCollection(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

// Get user Album by id
export const getAlbumById = createAsyncThunk(
  'collection/getById',
  async (id, thunkAPI) => {
    try {
      console.log(`getAlbumById: ${id}`)
      const { token } = thunkAPI.getState().auth.user
      return await collectionService.getAlbumById(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  },
)

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    resetCollection: () => initialState,
    resetCollectionBools: (state) => ({
      ...state,
      isError: false,
      isSuccess: false,
      isLoading: false,
      isEdit: false,
      message: '',
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAlbum.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAlbum.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        console.log(`createAlbum.fulfilled: ${JSON.stringify(action.payload)}`)
        state.collection.push(action.payload)
      })
      .addCase(createAlbum.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getCollection.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCollection.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collection = action.payload
      })
      .addCase(getCollection.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })

      .addCase(getAlbumById.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getAlbumById.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.album = action.payload
      })
      .addCase(getAlbumById.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { resetCollection, resetCollectionBools } = collectionSlice.actions

export default collectionSlice.reducer
