import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    username: "",
    name: "",
    surname: "",
    description: "",
    languages: "",
    website: "",
    avatar: "",
    fullName: "",
    location: "",
    nickname: "",
    followersCount: 0,
    id: 0
};

export const profileSlice = createSlice({
    name: "profileSlice", initialState: initialState, reducers: {
        updateProfile: (state, action) => {
            if (action.payload.user !== undefined) {
                state.name = action.payload.user.name;
                state.surname = action.payload.user.surname;
                state.description = action.payload.user.description;
                state.location = action.payload.user.location;
                state.website = action.payload.user.website;
                state.languages = action.payload.user.languages;
                state.nickname = action.payload.user.nickname;
                state.followersCount = action.payload.user.followersCount;
                state.id = action.payload.user.id;
                state.fullName = state.name + " " + state.surname;
            }
        }, clearProfile: (state) => {
            state.name = "";
            state.surname = "";
            state.description = "";
            state.location = "";
            state.website = "";
            state.languages = "";
            state.nickname = "";
            state.followersCount = 0;
            state.fullName = "";
            state.id = 0;
        },
    },
});

export const {updateProfile, clearProfile} = profileSlice.actions;

export default profileSlice.reducer;