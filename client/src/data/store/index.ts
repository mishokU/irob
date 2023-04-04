import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {AuthApi} from "./auth/AuthApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import {RoomsApi} from "./rooms/RoomsApi";
import {ProfileApi} from "./profile/ProfileApi";
import {RoomRequirementsApi} from "./rooms/RoomRequirementsApi";
import {RoomUsersApi} from "./rooms/RoomUsersApi";

import roomReducer from "../slices/RoomSlice";
import userReducer from "../slices/ProfileSlice";
import configReducer from "../slices/IrobConfigSlice";

import storage from "redux-persist/lib/storage";
import {persistReducer, persistStore} from "redux-persist";
import thunk from "redux-thunk";
import {RoomMessengerApi} from "./rooms/RoomMessengerApi";
import {SearchApi} from "./search/SearchApi";
import {RoomPaymentApi} from "./payment/RoomPaymentApi";
import {LicensesApi} from "./licenses/LicensesApi";

const persistConfig = {
    key: "root", storage,
};

const rootReducer = combineReducers({
    [AuthApi.reducerPath]: AuthApi.reducer,
    [RoomsApi.reducerPath]: RoomsApi.reducer,
    [ProfileApi.reducerPath]: ProfileApi.reducer,
    [RoomUsersApi.reducerPath]: RoomUsersApi.reducer,
    [RoomRequirementsApi.reducerPath]: RoomRequirementsApi.reducer,
    [RoomMessengerApi.reducerPath]: RoomMessengerApi.reducer,
    [RoomPaymentApi.reducerPath]: RoomPaymentApi.reducer,
    [SearchApi.reducerPath]: SearchApi.reducer,
    [LicensesApi.reducerPath]: LicensesApi.reducer,
    room: roomReducer,
    profile: userReducer,
    config: configReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(
        thunk,
        RoomsApi.middleware,
        AuthApi.middleware,
        ProfileApi.middleware,
        RoomMessengerApi.middleware,
        RoomUsersApi.middleware,
        RoomRequirementsApi.middleware,
        RoomPaymentApi.middleware,
        SearchApi.middleware,
        LicensesApi.middleware
    )
});

setupListeners(store.dispatch);

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;