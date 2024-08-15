// persistConfig.js
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Default storage engine (localStorage)
import { configureStore } from '@reduxjs/toolkit';
import authenticationSliceReducer from './authenticationSlice';
import { thunk } from 'redux-thunk';

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, authenticationSliceReducer);
const middleware = () => [thunk]
const store = configureStore({
  reducer: {
    authentication_user: persistedReducer,
  },
  middleware,  // Use the function returning the middleware array
  devTools: process.env.NODE_ENV !== 'production',
});

const persistor = persistStore(store);

export { store, persistor };
