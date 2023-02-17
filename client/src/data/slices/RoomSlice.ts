import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    roomId: "",
    roomName: "untitled",
    isAdmin: false
}

export const roomSlice = createSlice({
    name: 'roomSlice',
    initialState: initialState,
    reducers: {
        updateRoom: (state, action) => {
            if(action.payload !== undefined){
                state.roomId = action.payload.roomId
                state.isAdmin = action.payload.isAdmin
                state.roomName = action.payload.roomName
            }
        },
        updateRoomId: (state, action) => {
            state.roomId = action.payload
        },
        updateRoomName: (state, action) => {
            state.roomName = action.payload.name
        },
        clearRoom: (state) => {
            state.roomId = ""
            state.roomName = ""
            state.isAdmin = false
        }
    }
})

export const {
    updateRoom,
    updateRoomId,
    updateRoomName,
    clearRoom
} = roomSlice.actions

export default roomSlice.reducer