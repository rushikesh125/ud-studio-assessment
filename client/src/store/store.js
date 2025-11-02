import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistStore, persistReducer } from 'redux-persist';
import authSlice from './authSlice';
import searchSlice from './searchSlice';
import { enableMapSet } from 'immer';
enableMapSet();
const authPersistConfig = {
    key:"auth",
    storage,
    whitelist:['user']
}

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authSlice),
    search: searchSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
export default store;