import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import {useEffect, useState} from "react";
import {useGetProfileMutation, useUpdateProfileMutation} from "../../../data/store/profile/ProfileApi";
import {updateProfile} from "../../../data/slices/ProfileSlice";
import {storage} from "../../../firebaseConfig"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";

export default function ProfileInfoViewModel() {

    const profileReducer = useSelector((state: RootState) => state.profile)
    const dispatch = useDispatch();

    const [getProfileMutation] = useGetProfileMutation()
    const [updateProfileMutation] = useUpdateProfileMutation()

    const [name, setName] = useState(profileReducer.name)
    const [surname, setSurname] = useState(profileReducer.surname)
    const [description, setDescription] = useState(profileReducer.description)
    const [website, setWebsite] = useState(profileReducer.website)
    const [location, setLocation] = useState(profileReducer.location)
    const [languages, setLanguages] = useState(profileReducer.languages)
    const [imagePath, setImagePath] = useState(profileReducer.avatar)

    const [imageFile, setImageFile] = useState<File>()

    useEffect(() => {
        async function fetchData() {
            try {
                return await getProfileMutation().unwrap()
            } catch (e) {
                console.log("load profile error: " + e)
            }
        }

        fetchData().then(data => {
            dispatch(updateProfile(data))
        });
    }, [dispatch, getProfileMutation])

    const handleUpdateProfile = async () => {
        try {
            await firstUploadNewAvatar()
        } catch (e) {
            console.log("error update: " + e)
        }
    }

    async function firstUploadNewAvatar() {
        if (imageFile !== undefined) {
            const mountainImagesRef = ref(storage, `images/${imageFile.name}`);
            uploadBytes(mountainImagesRef, imageFile).then(async (snapshot) => {
                console.log('Uploaded a blob or file!');
                getDownloadURL(snapshot.ref).then(async (avatar) => {
                    setImagePath(avatar)
                    await updateWholeProfile(avatar)
                });
            })
        } else {
            await updateWholeProfile(null)
        }
    }

    async function updateWholeProfile(avatar: string | null){
        const updatedProfile = await updateProfileMutation({
            name, surname, description, website, languages, location, avatar
        }).unwrap()
        dispatch(updateProfile({
            user: {
                name: name,
                surname: surname,
                description: description,
                website: website,
                languages: languages,
                location: location,
                nickname: profileReducer.nickname,
                followersCount: profileReducer.followersCount,
                id: profileReducer.profileId,
                avatar: avatar
            }
        }))
        console.log("updated profile: " + updatedProfile)
    }

    function handleUndoProfileData() {
        setName(profileReducer.name)
        setSurname(profileReducer.surname)
    }

    const uploadImagesResult = (event: any) => {
        if (event.target.files[0]) {
            setImageFile(event.target.files[0])
            const reader = new FileReader();
            const selectedFile = event.target.files[0];
            const imgtag: HTMLImageElement = document.getElementById("profile_image") as HTMLImageElement;
            reader.onload = function(event) {
                imgtag.src = event?.target?.result as string;
            };
            reader.readAsDataURL(selectedFile);
        }
    }

    return {
        handleUpdateProfile,
        handleUndoProfileData,
        name,
        surname,
        description,
        languages,
        website,
        location,
        imagePath,
        setLocation,
        setName,
        setSurname,
        uploadImagesResult,
        setDescription,
        setWebsite,
        setLanguages
    }

}