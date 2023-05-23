/** @format */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import collectionService from './collectionService'

// TODO: separate custom fields from album object.
const initialState = {
  collection: [],
  album: {
    customFields: {},
  },
  isError: false,
  isSuccess: false,
  isLoading: false,
  isEdit: false,
  message: '',
}

// Create new Album
export const createAlbum = createAsyncThunk(
  'collection/create',
  async (albumData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
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
  }
)

// Get user Album Collection
export const getCollection = createAsyncThunk(
  'collection/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
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
  }
)

// Get user Album by id
export const getAlbumById = createAsyncThunk(
  'collection/getById',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
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
  }
)

// update user Album
export const updateAlbum = createAsyncThunk(
  'collection/update',
  async (album, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await collectionService.updateAlbum(
        album._id,
        album,
        token
      )
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user Album
export const deleteAlbum = createAsyncThunk(
  'collection/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await collectionService.deleteAlbum(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const collectionSlice = createSlice({
  name: 'collection',
  initialState,
  reducers: {
    reset: (state) => initialState,
    setAlbum: (state, action) => {
      return {
        ...state,
        album: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createAlbum.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createAlbum.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
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
      .addCase(updateAlbum.pending, (state) => {
        state.isLoading = true
        state.isEdit = true // set to true to prevent user from creating new album while editing
      })
      .addCase(updateAlbum.fulfilled, (state, action) => {
        state.isLoading = false
        state.isEdit = false // set to false to allow user to create new album
        state.collection = state.collection.map((album) => {
          if (album._id === action.payload.id) {
            return action.payload
          }
          return album
        })
        state.album = action.payload
        state.isSuccess = true
      })
      .addCase(updateAlbum.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isEdit = false
        state.message = action.payload
      })
      .addCase(deleteAlbum.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteAlbum.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.collection = state.collection.filter(
          (album) => album._id !== action.payload.id
        )
      })
      .addCase(deleteAlbum.rejected, (state, action) => {
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

export const { reset } = collectionSlice.actions

export default collectionSlice.reducer
