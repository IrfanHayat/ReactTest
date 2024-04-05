import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import starApiSlice from '../features/starApiSlice/starApiSlice'
import { authApi } from './services/auth/authService'

const store = configureStore({
  reducer: {
    auth: authReducer,
    categories:starApiSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

export default store
