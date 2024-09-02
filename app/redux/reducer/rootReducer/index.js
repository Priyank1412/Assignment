import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import { combineReducers } from 'redux';
import { HomeReducer } from '../homeReducer';

const homeReducerConfig = {
    key: 'homeReducer',
    storage: AsyncStorage,
    blacklist: ['movies']
    // whitelist: [
    // ]
};

const rootReducer = combineReducers({
    homeReducer: persistReducer(homeReducerConfig, HomeReducer)
});

export default rootReducer;
