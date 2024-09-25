import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { thunk } from "redux-thunk";
import { authReducer } from "./reducer/authReducers";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  auth: authReducer,
})

const persistedReducer = persistReducer(persistConfig)

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(thunk)
})

export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
export default store