import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import {useEffect, useState} from "react";
import {useGetProfileMutation, useUpdateProfileMutation} from "../../../data/store/profile/ProfileApi";
import {updateProfile} from "../../../data/slices/ProfileSlice";
import {storage} from "../../../firebaseConfig"
import {ref, uploadBytes, getDownloadURL} from "firebase/storage";
import { initNotification, usePopupContext } from "../../main/contexts/NotificationProvider";
import avatarPlaceholder from "../../../ui/assets/avatart_placeholder.png"

export default function ProfileInfoViewModel() {

    const profileReducer = useSelector((state: RootState) => state.profile)
    const dispatch = useDispatch();
    const popupContext = usePopupContext()

    const [getProfileMutation] = useGetProfileMutation()
    const [updateProfileMutation] = useUpdateProfileMutation()

    const [name, setName] = useState(profileReducer.name)
    const [surname, setSurname] = useState(profileReducer.surname)
    const [description, setDescription] = useState(profileReducer.description)
    const [website, setWebsite] = useState(profileReducer.website)
    const [imagePath, setImagePath] = useState(getAvatar())

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

    function getAvatar(): string {
        if(profileReducer.avatar === ""){
            return avatarPlaceholder
        } else {
            return profileReducer.avatar
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
            await updateWholeProfile(profileReducer.avatar)
        }
    }

    async function updateWholeProfile(avatar: string | null){
        const updatedProfile = await updateProfileMutation({name, surname, description, website, avatar}).unwrap()
        dispatch(updateProfile({
            user: {
                name: name,
                surname: surname,
                description: description,
                website: website,
                nickname: profileReducer.nickname,
                followersCount: profileReducer.followersCount,
                id: profileReducer.profileId,
                avatar: avatar
            }
        }))
        popupContext?.setState(initNotification(updatedProfile.message))
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
        website,
        imagePath,
        setName,
        setSurname,
        uploadImagesResult,
        setDescription,
        setWebsite
    }

}