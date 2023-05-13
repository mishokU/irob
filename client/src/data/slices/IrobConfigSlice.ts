import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    chainId: 1337,
    chainHexId: '0x539'
};

export const irobConfigSlice = createSlice({
    name: "irobConfigSlice", initialState: initialState, reducers: {
        setConfig: (state, action) => {
            state.chainId = action.payload.chainId;
            state.chainHexId = action.payload.chainHexId;
        }
    }
});

export const { setConfig } = irobConfigSlice.actions;

export default irobConfigSlice.reducer;