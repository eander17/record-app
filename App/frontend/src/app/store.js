import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import collectionReducer from '../features/collection/collectionSlice'
import searchResultsReducer from '../features/search/searchSlice'
import socketReducer from '../features/socket/socketSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collection: collectionReducer,
    search: searchResultsReducer,
    socket: socketReducer, 
  },
})
