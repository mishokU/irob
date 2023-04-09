import {useState} from "react";
import {DevelopersResponseTypes} from "./DevelopersResponseTypes";


export function DevelopersResponseController() {

    const [page, setPage] = useState(DevelopersResponseTypes.GOOD)

    return {
        page
    }

}