import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import collectionReducer from '../features/collection/collectionSlice'
import searchResultsSlice from '../features/search/searchResultsSlice'
// import socketSlice from '../features/socket/socketSlice'
// import socketMiddleware from '../src/middleWare/socketMiddleWare'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collection: collectionReducer,
    search: searchResultsSlice.reducer,
   // socket: socketSlice.reducer,
  }
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(socketMiddleware),
})
