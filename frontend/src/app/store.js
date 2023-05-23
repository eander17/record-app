/** @format */

import { configureStore } from '@reduxjs/toolkit'

/// REDUCERS ///
import authReducer from '../features/auth/authSlice'
import collectionReducer from '../features/collection/collectionSlice'
import searchResultsReducer from '../features/search/searchSlice'
import custFieldSliceReducer from '../features/custFields/fieldSlice'
import themeReducer from '../features/Theme/themeSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    collection: collectionReducer,
    search: searchResultsReducer,
    custFields: custFieldSliceReducer,
    theme: themeReducer,
  },
})

export default store
