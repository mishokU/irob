import {createSlice} from "@reduxjs/toolkit";

export const testChain = '0x539'
export const testChainId = 1337

const initialState = {
    chainId: testChainId,
    chainHexId: testChain,
    networkUrl: ""
};

export const irobConfigSlice = createSlice({
    name: "irobConfigSlice", initialState: initialState, reducers: {
        setConfig: (state, action) => {
            if (action.payload.user !== undefined) {
                console.log("config: " + action.payload)
                state.chainId = action.payload.chainId;
                state.chainHexId = action.payload.chainHexId;
                state.networkUrl = action.payload.networkUrl;
            }
        }
    }
});

export const {setConfig} = irobConfigSlice.actions;

export default irobConfigSlice.reducer;