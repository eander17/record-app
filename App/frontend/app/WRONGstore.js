import { configureStore } from '@reduxjs/toolkit'

/// REDUCERS /// 
import authReducer from '../src/features/auth/authSlice'
import collectionReducer from '../src/features/collection/collectionSlice'
import searchResultsReducer from '../src/features/search/searchSlice'
import custFieldSliceReducer from '../src/features/custFields/fieldSlice'
import dummySliceReducer from '../src/features/dummyState/dummySlice'

const store =  configureStore({
  reducer: {
    auth: authReducer,
    collection: collectionReducer,
    search: searchResultsReducer,
    custFields: custFieldSliceReducer,
    dummy: dummySliceReducer,
  } 
})

export default store
