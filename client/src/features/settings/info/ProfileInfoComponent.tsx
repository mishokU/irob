import {buttonTheme, settingsInputStyle} from "../../../ui/themes/Themes";
import {SettingsStrings} from "../strings/SettingsStrings";
import useViewModel from "./ProfileInfoViewModel"


export function ProfileInfoComponent() {
    const {
        name,
        surname,
        website,
        description,
        setDescription,
        setWebsite,
        handleUpdateProfile,
        handleUndoProfileData,
        setName,
        imagePath,
        uploadImagesResult,
        setSurname
    } = useViewModel()
    return <div className="border-[#29303A] -mt-4 rounded-2xl p-4 text-white">
        <h1 className="text-3xl">{SettingsStrings.PublicProfile}</h1>
        <p className="text-[#8fadc0]">Your profile will be able to see the specified information</p>
        <p className="mt-4 mb-2">Photo</p>
        <div className="flex items-center">
            <img
                id="profile_image"
                src={imagePath}
                className="object-cover rounded-full bg-white w-[75px] h-[75px]"/>
            <label
                htmlFor="image_uploads"
                className="rounded-full ml-6 bg-[#4a5058] pt-2 pl-4 pr-4 pb-2 cursor-pointer">Choose</label>
            <input
                type="file"
                onChange={uploadImagesResult}
                id="image_uploads"
                name="image_uploads"
                className="hidden"
                readOnly={true}
                accept=".jpg, .jpeg, .png"/>
        </div>
        <div className="flex">
            <div>
                <p className="mt-4">Name</p>
                <input
                    className={settingsInputStyle}
                    value={name}
                    onChange={(nameField) => setName(nameField.target.value)}
                />
            </div>
            <div className="ml-4">
                <p className="mt-4">Surname</p>
                <input
                    className={settingsInputStyle}
                    value={surname}
                    onChange={(surnameField) => setSurname(surnameField.target.value)}
                />
            </div>
        </div>
        <div>
            <p className="mt-4">Description</p>
            <textarea
                value={description}
                onChange={(surnameField) => setDescription(surnameField.target.value)}
                className="border-[#29303A] outline-none align-text-top border-2 rounded-2xl p-4 bg-transparent mt-2 w-full h-[120px]"/>
        </div>
        <div>
            <p className="mt-4">Website</p>
            <input
                value={website}
                onChange={(surnameField) => setWebsite(surnameField.target.value)}
                className={settingsInputStyle}/>
        </div>
        <div className="flex space-x-2">
            <button
                className={buttonTheme + " mt-4 w-full"}
                onClick={handleUpdateProfile}>
                Save
            </button>
            <button
                className={buttonTheme + " mt-4 w-full"}
                onClick={handleUndoProfileData}>
                Reset
            </button>
        </div>
    </div>
}