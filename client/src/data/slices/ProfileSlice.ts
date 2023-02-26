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
    profileId: 0
};

export const profileSlice = createSlice({
    name: "profileSlice", initialState: initialState, reducers: {
        updateProfile: (state, action) => {
            if (action.payload.user !== undefined) {
                console.log("profile id slice" + action.payload.user.id)
                state.name = action.payload.user.name;
                state.surname = action.payload.user.surname;
                state.description = action.payload.user.description;
                state.location = action.payload.user.location;
                state.website = action.payload.user.website;
                state.languages = action.payload.user.languages;
                state.nickname = action.payload.user.nickname;
                state.followersCount = action.payload.user.followersCount;
                state.profileId = action.payload.user.id;
                state.avatar = action.payload.user.avatar
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
            state.profileId = 0;
        },
    },
});

export const {updateProfile, clearProfile} = profileSlice.actions;

export default profileSlice.reducer;