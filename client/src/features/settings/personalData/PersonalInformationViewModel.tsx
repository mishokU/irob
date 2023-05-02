import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../../data/store";
import {useUpdateLocationAndLanguageMutation} from "../../../data/store/profile/ProfileApi";
import {updateLocationAndLanguage} from "../../../data/slices/ProfileSlice";
import { initNotification, usePopupContext } from "../../main/contexts/NotificationProvider";

export default function PersonalInformationViewModel() {

    const profileReducer = useSelector((state: RootState) => state.profile)

    const dispatch = useDispatch();

    const [location, setLocation] = useState(profileReducer.location)
    const [language, setLanguage] = useState(profileReducer.language)

    const popupContext = usePopupContext()

    const [update] = useUpdateLocationAndLanguageMutation()

    const handleUpdateData = async () => {
        async function updateData() {
            return update({location, language}).unwrap()
        }

        updateData()
            .catch((error) => console.log(error))
            .then((result: any) => {
                if (result !== undefined) {
                    dispatch(updateLocationAndLanguage({
                        location: result.location,
                        language: result.language
                    }))
                    popupContext?.setState(initNotification(result.message))
                }
            })
    }

    function handleUndoData() {

    }

    return {
        handleUpdateData,
        handleUndoData,
        location,
        setLanguage,
        language,
        setLocation
    }

}