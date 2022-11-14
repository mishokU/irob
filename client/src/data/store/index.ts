import {configureStore} from "@reduxjs/toolkit";
import {IROBApi} from "./irob/IROBApi";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        [IROBApi.reducerPath]: IROBApi.reducer
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(IROBApi.middleware)
})

setupListeners(store.dispatch)