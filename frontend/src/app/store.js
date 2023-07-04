/** @format */

import { configureStore } from '@reduxjs/toolkit'

/// REDUCERS ///
import authReducer from '../features/auth/authSlice'
import collectionReducer from '../features/collection/collectionSlice'
import searchResultsReducer from '../features/search/searchSlice'
import albumReducer from '../features/collection/albumSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    collection: collectionReducer,
    search: searchResultsReducer,
    album: albumReducer,
  },
})

export default store
