import {Dispatch} from "react";

export interface DeleteContentDialogProms {
    isDeleteDialogVisible: boolean,
    setIsDeleteDialogVisible: Dispatch<boolean>,
    handleDeleteRoomClick: () => void
}