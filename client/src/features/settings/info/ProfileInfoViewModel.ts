import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import {useEffect, useState} from "react";
import {useGetProfileMutation, useUpdateProfileMutation} from "../../../data/store/profile/ProfileApi";
import {updateProfile} from "../../../data/slices/ProfileSlice";

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
            const updatedProfile = await updateProfileMutation({
                name, surname, description, website, languages, location
            }).unwrap()
            dispatch(updateProfile({
                user: {
                    name, surname, description, website, languages, location
                }
            }))
            console.log("updated profile: " + updatedProfile)
        } catch (e) {
            console.log("error update: " + e)
        }
    }

    function uploadAvatarClick() {

    }

    function handleUndoProfileData() {
        setName(profileReducer.name)
        setSurname(profileReducer.surname)
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
        setLocation,
        setName,
        setSurname,
        setDescription,
        setWebsite,
        setLanguages,
        uploadAvatarClick
    }

}