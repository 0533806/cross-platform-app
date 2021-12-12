import { createStore, combineReducers } from "redux";
import { reducer } from "./reducer";
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const rootReducer = combineReducers({
    self: reducer,

})


const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = createStore(persistedReducer);
export const persistor = persistStore(store);

    export default { store, persistor };
