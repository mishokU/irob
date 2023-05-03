import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    chainId: 1337,
    chainHexId: '0x539',
    networkUrl: ""
};

export const irobConfigSlice = createSlice({
    name: "irobConfigSlice", initialState: initialState, reducers: {
        setConfig: (state, action) => {
            state.chainId = action.payload.chainId;
            state.chainHexId = action.payload.chainHexId;
            state.networkUrl = action.payload.networkUrl;
        }
    }
});

export const { setConfig } = irobConfigSlice.actions;

export default irobConfigSlice.reducer;