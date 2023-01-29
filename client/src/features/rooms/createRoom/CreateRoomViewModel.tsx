import {useState} from "react";

export default function CreateRoomViewModal() {

    const [linkText] = useState(generateRoomLink())

    function generateRoomLink() {
        const randomRoom = (Math.random() + 1).toString(36).substring(7);
        return "http://localhost:3000/rooms/" + randomRoom
    }

    return {
        linkText
    }

}