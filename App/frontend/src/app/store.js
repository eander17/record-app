import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import collectionReducer from '../features/collection/collectionSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    collection: collectionReducer,
  },
})
