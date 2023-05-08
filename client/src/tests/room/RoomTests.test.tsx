import {getRoomId} from "../../features/rooms/main/page/RoomViewModel";


describe('Logic test', () => {
    test('Navigate from link to room', () => {

        expect(getRoomId("", "http://client:3000/rooms/test")).toMatch("test")
    })
})