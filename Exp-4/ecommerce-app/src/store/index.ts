import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';

const storage = {
  getItem(_key: string) {
    return Promise.resolve(typeof window !== 'undefined' ? window.localStorage.getItem(_key) : null);
  },
  setItem(_key: string, value: string) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(_key, value);
    }
    return Promise.resolve(value);
  },
  removeItem(_key: string) {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem(_key);
    }
    return Promise.resolve();
  },
};

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['cart'] // only cart will be persisted
};

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore serialization warnings for redux-persist
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
