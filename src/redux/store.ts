import { configureStore } from "@reduxjs/toolkit";
import contactReducer from "./contactSlice";
import { persistStore,persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key:'root',
    storage,
}

const persistStoreReducer = persistReducer(persistConfig,contactReducer)

export const store = configureStore({
    reducer: persistStoreReducer
})

export const persister = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch