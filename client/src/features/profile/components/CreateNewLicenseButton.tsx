export interface CreateNewLicenseButtonProps {
    setIsCreateNewLicenseModalVisible: (isVisible: boolean) => void
}

export function CreateNewLicenseButton({setIsCreateNewLicenseModalVisible}: CreateNewLicenseButtonProps) {

    return <div className="p-16 border-white text-center border rounded-2xl hover:bg-gray-800 bg-transparent mt-8 hover:border-amber-300 flex justify-center"
                onClick={() => {
                    setIsCreateNewLicenseModalVisible(true)
                }}>
        <h1 className="p-2">Create new license</h1>
        <div className="p-2 bg-black rounded-xl ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd"
                      d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                      clipRule="evenodd" />
            </svg>
        </div>
    </div>
}