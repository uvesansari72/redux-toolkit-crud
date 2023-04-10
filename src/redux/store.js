import { configureStore, } from "@reduxjs/toolkit";
import { persistReducer , persistStore} from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";
// import { composeWithDevTools } from "redux-devtools-extension";

const persistConfig = {
    key:"root",
    storage,
}

const reducers = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer:reducers,
    devTools: process.env.NODE_ENV !== "production",
    // enhancers: [composeWithDevTools()],

})

const persistor = persistStore(store);

export { store, persistor}

