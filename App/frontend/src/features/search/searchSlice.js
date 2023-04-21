import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import searchService from './searchService'

const initialState = {
  searchResults: [],
  page: 1, 
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Search for albums
export const searchAlbums = createAsyncThunk(
  'search/getAll',
  async (data, thunkAPI) => {
    try {
      const { query, currentPage } = data
      console.log(`from search slice thunk: ${query}, ${currentPage}`)
      return await searchService.searchAlbums(query, currentPage)
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

export const searchResultsSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    reset: (state) => initialState,
  }, 
  extraReducers: (builder) => {
    builder
      .addCase(searchAlbums.pending, (state) => {
        state.isLoading = true
      })
      .addCase(searchAlbums.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.searchResults = action.payload.albums
        state.page = action.payload.page
      })
      .addCase(searchAlbums.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = searchResultsSlice.actions

export default searchResultsSlice.reducer

