// store.js (Redux Store Configuration)
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';  
import { persistReducer, persistStore } from 'redux-persist';  
import storage from 'redux-persist/lib/storage';  


const rootReducer = combineReducers({
  user: userReducer,  
});

// Persist configuration for Redux Persist
const persistConfig = {
  key: 'root',  
  storage,  
  version: 1, 
  whitelist: ['user'], 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Create the persistor to manage the persistence process
export const persistor = persistStore(store);

export const logout = () => {
  persistor.purge(); // This clears the persisted data
};