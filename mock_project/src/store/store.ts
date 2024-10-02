/** @format */

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { authReducer } from './reducer/authReducers';
import storage from 'redux-persist/lib/storage';
import { thunk } from 'redux-thunk';
import { productReducer } from './reducer/productReducers';
import { categoryReducer } from './reducer/categoryReducers';
import { colorReducer } from './reducer/colorReducers';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  category: categoryReducer,
  color: colorReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
});
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store;
