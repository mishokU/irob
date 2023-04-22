import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    roomId: "",
    roomName: "untitled",
    isAdmin: false,
    ownerId: 0,
    userId: 0,
    firstAgreement: false,
    secondAgreement: false,
    isFinished: false,
    contentId: null
}

export const roomSlice = createSlice({
    name: 'roomSlice', initialState: initialState, reducers: {
        updateRoom: (state, action) => {
            if (action.payload !== undefined) {
                state.roomId = action.payload.roomId
                state.isAdmin = action.payload.isAdmin
                state.roomName = action.payload.roomName
                state.ownerId = action.payload.ownerId
                state.userId = action.payload.userId
                state.firstAgreement = action.payload.firstAgreement
                state.secondAgreement = action.payload.secondAgreement
                state.contentId = action.payload.contentId
                state.isFinished = state.firstAgreement === true && state.secondAgreement === true
            }
        }, updateRoomId: (state, action) => {
            state.roomId = action.payload
        }, updateRoomName: (state, action) => {
            state.roomName = action.payload.name
            state.userId = action.payload.userId
        }, clearRoom: (state) => {
            state.roomId = ""
            state.roomName = ""
            state.isAdmin = false
            state.firstAgreement = false
            state.secondAgreement = false
            state.ownerId = 0
            state.userId = 0
            state.contentId = null
            state.isFinished = false
        }, updateFirstAgreement: (state, action) => {
            state.firstAgreement = action.payload
            state.isFinished = state.firstAgreement === true && state.secondAgreement === true
        }, updateSecondAgreement: (state, action) => {
            state.secondAgreement = action.payload
            state.isFinished = state.firstAgreement === true && state.secondAgreement === true
        }
    }
})

export const {
    updateRoom, updateRoomId, updateRoomName, clearRoom, updateFirstAgreement, updateSecondAgreement
} = roomSlice.actions

export default roomSlice.reducer