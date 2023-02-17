import {Dispatch} from "react";

export interface DeleteDialogProms {
    isDeleteDialogVisible: boolean,
    setIsDeleteDialogVisible: Dispatch<boolean>,
    handleDeleteRoomClick: () => void
}