import { Dispatch } from "react"

export interface MobileRightTopOverlayProps {
    setIsVisible: Dispatch<boolean>
    onContentClick: () => Promise<void>
    onSettingsClick: Dispatch<boolean>
    onDeleteClick: Dispatch<boolean>
    isDeleteDialogVisible: boolean
    isSettingsDialogVisible: boolean
}

export function MobileRightTopOverlay({
    onContentClick,
    onSettingsClick,
    onDeleteClick,
    isDeleteDialogVisible,
    isSettingsDialogVisible,
    setIsVisible
}: MobileRightTopOverlayProps) {
    return <div className="fixed z-50 top-16 w-[160px] text-center bg-[#0E1420] border-2 rounded-2xl pt-2 pb-2 right-4 border-[#29303A] space-y-2">
        <div
            onClick={onContentClick}
            className="pl-2 pr-2 text-white">
            <h1>Content</h1>
        </div>
        <div className="w-full bg-black h-0.5" />
        <div
            onClick={() => {
                onSettingsClick(!isSettingsDialogVisible)
                setIsVisible(false)
            }}
            className="pl-2 pr-2 text-white">
            <h1>Settings</h1>
        </div>
        <div className="w-full bg-black h-0.5" />
        <div
            onClick={() => {
                onDeleteClick(!isDeleteDialogVisible)
                setIsVisible(false)
            }}
            className="pl-2 pr-2 text-red-600">
            <h1>Delete</h1>
        </div>
    </div>
}