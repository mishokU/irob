import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    reloadCatalogue: false
};

export const catalogueSlice = createSlice({
    name: "catalogueSlice", initialState: initialState, reducers: {
        updateCatalogueState: (state, action) => {
            state.reloadCatalogue = action.payload.reload
        }
    }
});

export const { updateCatalogueState } = catalogueSlice.actions;

export default catalogueSlice.reducer;