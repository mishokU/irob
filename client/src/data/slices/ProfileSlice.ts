import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    username: "",
    name: "",
    surname: "",
    description: "",
    language: "",
    website: "",
    avatar: "",
    fullName: "",
    location: "",
    nickname: "",
    email: "",
    disabled: false,
    followersCount: 0,
    profileId: 0
};

export const profileSlice = createSlice({
    name: "profileSlice", initialState: initialState, reducers: {
        updateProfile: (state, action) => {
            if (action.payload.user !== undefined) {
                console.log("profile id slice" + action.payload.user.id)
                state.name = action.payload.user.name
                state.surname = action.payload.user.surname
                state.description = action.payload.user.description
                state.location = action.payload.user.location
                state.website = action.payload.user.website
                state.language = action.payload.user.language
                state.nickname = action.payload.user.nickname
                state.followersCount = action.payload.user.followersCount
                state.profileId = action.payload.user.id
                state.avatar = action.payload.user.avatar
                state.disabled = action.payload.user.disabled
                state.email = action.payload.user.email

                if (state.name === "" || state.surname === "") {
                    state.fullName = state.email
                } else {
                    state.fullName = state.name + " " + state.surname;
                }
            }
        },
        clearProfile: (state) => {
            state.name = ""
            state.surname = ""
            state.description = ""
            state.location = ""
            state.website = ""
            state.language = ""
            state.nickname = ""
            state.followersCount = 0
            state.fullName = ""
            state.email = ""
            state.profileId = 0
        },
        updateLocationAndLanguage: (state, action) => {
            state.language = action.payload.language
            state.location = action.payload.location
        },
        updateIsDisabled: (state, action) => {
            state.disabled = action.payload.disabled
        }
    },
});

export const {updateProfile, clearProfile, updateLocationAndLanguage, updateIsDisabled} = profileSlice.actions

export default profileSlice.reducer