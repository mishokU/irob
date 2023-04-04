import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    depositAddress: "0xd4039eB67CBB36429Ad9DD30187B94f6A5122215"
};

export const irobConfigSlice = createSlice({
    name: "irobConfigSlice", initialState: initialState, reducers: {
        setConfig: (state, action) => {
            if (action.payload.user !== undefined) {
                console.log("config: " + action.payload)
                state.depositAddress = action.payload.user.name;
            }
        }
    }
});

export const {setConfig} = irobConfigSlice.actions;

export default irobConfigSlice.reducer;