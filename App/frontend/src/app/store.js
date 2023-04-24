import { configureStore } from '@reduxjs/toolkit'

/// REDUCERS /// 
import authReducer from '../features/auth/authSlice'
import collectionReducer from '../features/collection/collectionSlice'
import searchResultsReducer from '../features/search/searchSlice'
import custFieldSliceReducer from '../features/custFields/fieldSlice'
import dummySliceReducer from '../features/dummyState/dummySlice'

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
