/*
 *
 * @format
 * eslint-disable no-param-reassign
 */

/* eslint-disable no-param-reassign */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import searchService from './searchService'

const initialState = {
  searchResults: [],
  query: '', // search query
  localPage: 1, // results page for number for app
  requestPage: 1, // discog api page
  totalPages: 1,
  totalResults: 0, // total number of results for query
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Search for albums
//! RETURNS: searchResults, requestPage, totalPages, totalResults
export const searchAlbums = createAsyncThunk(
  'search/getAll',
  async (data, thunkAPI) => {
    try {
      const { query, requestPage } = data
      return await searchService.searchAlbums(query, requestPage)
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

export const searchResultsSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: () => initialState,
    // call this with the line: dispatch(setQuery(query)) in the search component
    setQueryReducer: (state, action) => {
      return {
        ...state,
        query: action.payload,
      }
    },
    setLocalPage: (state, action) => {
      return {
        ...state,
        localPage: action.payload,
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAlbums.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchAlbums.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.searchResults = action.payload.albumData
        state.requestPage = action.payload.currentPage
        state.totalPages = action.payload.totalPages
        state.totalResults = action.payload.totalResults
      })
      .addCase(searchAlbums.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset, setQueryReducer, setLocalPage } =
  searchResultsSlice.actions

export default searchResultsSlice.reducer
