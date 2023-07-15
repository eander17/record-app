/*
 *
 * @format
 * eslint-disable no-param-reassign
 */

/* eslint-disable no-param-reassign */

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import searchService from './searchService'

const initialState = {
  searchResults: [],
  pagination: {
    page: 1,
    pages: 0,
    per_page: 0,
  },
  query: '', // search query
  localPage: 1, // results page for number for app
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Search for albums
//! RETURNS: searchResults, requestPage, totalPages, totalResults
export const searchAlbums = createAsyncThunk(
  'search/getAll',
  async (_, thunkAPI) => {
    try {
      const {
        query,
        pagination: { page },
      } = thunkAPI.getState().search

      console.log(`triggered searchAlbums - query: ${query}, page: ${page}`)

      return await searchService.searchAlbums(query, page)
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
    resetSearch: () => initialState,
    // call this with the line: dispatch(setQuery(query)) in the search component
    updateSearchQuery: (state, action) => ({
      ...state,
      query: action.payload,
    }),
    updatePagination: (state, action) => ({
      ...state,
      pagination: {
        ...state.pagination,
        ...action.payload,
      },
    }),
    updateLocalPage: (state, action) => ({
      ...state,
      localPage: action.payload,
    }),
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchAlbums.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchAlbums.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.searchResults = action.payload.results
        state.pagination = action.payload.pagination
      })
      .addCase(searchAlbums.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const {
  resetSearch,
  updateSearchQuery,
  updateLocalPage,
  updatePagination,
} = searchResultsSlice.actions

export default searchResultsSlice.reducer
