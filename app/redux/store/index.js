// import { legacy_createStore as createStore, applyMiddleware, compose } from 'redux';
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from '../reducer/rootReducer';
import { persistStore, persistReducer, REHYDRATE } from 'redux-persist';
import thunk from 'redux-thunk';
import { createLogger } from "redux-logger";
import AsyncStorage from '@react-native-community/async-storage';

const logger = createLogger();

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    //blacklist and whitelist reducer as per needs
    blacklist: [
        "homeReducer"
    ],
    whitelist: [
        "homeReducer",
    ]
};
const storeReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
    reducer: storeReducer, middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }).concat(logger)
});
export const persistor = persistStore(store);
export default store;
