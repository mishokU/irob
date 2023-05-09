import {createSlice} from "@reduxjs/toolkit";
import {CatalogueUi} from "../items/CatalogueUi";

export interface CatalogueStateSlice {
    reloadCatalogue: boolean,
    items: CatalogueUi[]
}

export function initCatalogueSlice(): CatalogueStateSlice {
    return {
        reloadCatalogue: false,
        items: []
    }
}

export const catalogueSlice = createSlice({
    name: "catalogueSlice", initialState: initCatalogueSlice(), reducers: {
        updateCatalogueState: (state, action) => {
            state.reloadCatalogue = action.payload.reload
        },
        updateCatalogueItems: (state, action) => {
            state.items = action.payload.items
        }
    }
});

export const {updateCatalogueState, updateCatalogueItems} = catalogueSlice.actions;

export default catalogueSlice.reducer;