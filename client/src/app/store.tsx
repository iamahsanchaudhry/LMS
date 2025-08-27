import{configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/authSlice'
import rootReducer from './rootReducer';
import { authApi } from '@/features/api/authApi';

export const appStore = configureStore({
    reducer:rootReducer,
    middleware:(defaultMiddleware) => defaultMiddleware().concat(authApi.middleware)
});


export const initializeApp = async (): Promise<void> => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate(undefined, { forceRefetch: true })
  ).unwrap()
}
initializeApp();