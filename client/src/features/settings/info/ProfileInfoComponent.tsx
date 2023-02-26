import {buttonTheme} from "../../../themes/Themes";
import {SettingsStrings} from "../strings/SettingsStrings";
import useViewModel from "./ProfileInfoViewModel"

export function ProfileInfoComponent() {
    const {
        name,
        surname,
        website,
        location,
        languages,
        description,
        setDescription,
        setLanguages,
        setWebsite,
        setLocation,
        handleUpdateProfile,
        handleUndoProfileData,
        setName,
        imagePath,
        uploadImagesResult,
        setSurname
    } = useViewModel()
    return <div className="border-[#29303A] -mt-4 rounded-2xl p-4 text-white">
        <h1 className="text-3xl">{SettingsStrings.PublicProfile}</h1>
        <p>Your profile will be able to see the specified information</p>
        <p className="mt-4">Photo</p>
        <div className="flex items-center">
            <img
                id="profile_image"
                src={imagePath} className="object-cover rounded-full bg-white w-[75px] h-[75px]" />
            <label
                htmlFor="image_uploads"
                className="rounded-full ml-6 bg-[#4a5058] pt-2 pl-4 pr-4 pb-2 cursor-pointer">Choose</label>
            <input
                type="file"
                onChange={uploadImagesResult}
                id="image_uploads"
                name="image_uploads"
                className="invisible"
                readOnly={true}
                accept=".jpg, .jpeg, .png" />
        </div>
        <div className="flex">
            <div>
                <p className="mt-4">Name</p>
                <input
                    className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2"
                    value={name}
                    onChange={(nameField) => {
                        setName(nameField.target.value)
                    }}
                />
            </div>
            <div className="ml-4">
                <p className="mt-4">Surname</p>
                <input
                    className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2"
                    value={surname}
                    onChange={(surnameField) => {
                        setSurname(surnameField.target.value)
                    }}
                />
            </div>
        </div>
        <div>
            <p className="mt-4">Description</p>
            <textarea
                value={description}
                onChange={(surnameField) => {
                    setDescription(surnameField.target.value)
                }}
                className="border-[#29303A] align-text-top border-2 rounded-2xl p-4 bg-transparent mt-2 w-full h-[100px]" />
        </div>
        <div>
            <p className="mt-4">Website</p>
            <input
                value={website}
                onChange={(surnameField) => {
                    setWebsite(surnameField.target.value)
                }}
                className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2 w-full" />
        </div>
        <div>
            <p className="mt-4">Location</p>
            <input
                value={location}
                onChange={(surnameField) => {
                    setLocation(surnameField.target.value)
                }}
                className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2 w-full" />
        </div>
        <div>
            <p className="mt-4">Languages</p>
            <input
                value={languages}
                onChange={(surnameField) => {
                    setLanguages(surnameField.target.value)
                }}
                className="border-[#29303A] border-2 rounded-2xl p-4 bg-transparent mt-2 w-full" />
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