import {useState} from "react";
import {CreateContentState, initCreateContentState} from "./CreateContentState";
import {useCreateContentMutation} from "../../../data/store/content/ContentApi";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../../firebaseConfig";
import {getVideoCover} from "@rajesh896/video-thumbnails-generator";
import {initCreateCardProps, useModalsContext} from "../../main/contexts/ModalsProvider";
import {Stepper} from "./CreateContentStepper";
import {renameFile} from "../../../domain/hooks/Utils";
import {initNotification, usePopupContext} from "../../main/contexts/NotificationProvider";
import {useDispatch} from "react-redux";
import {updateCatalogueState} from "../../catalogue/redux/CatalogueSlice";


export default function CreateLicenseViewModel(roomId: string | null) {

    const dispatch = useDispatch()

    const [state, setState] = useState<CreateContentState>(initCreateContentState)

    const [stepper, setStepper] = useState<Stepper>(Stepper.INFO)

    const [leftButtonText, setLeftButtonText] = useState("Next")
    const [rightButtonText, setRightButtonText] = useState("Reset")

    const [createContent] = useCreateContentMutation()

    const popupContext = usePopupContext()
    const modalsContext = useModalsContext()

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setState({
            ...state, video: {
                url: url,
                file: renameFile(file, Date.now().toString() + ".mp4"),
                name: file.name
            }
        })
    }

    const handleTrailerChanged = (event: any) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setState({
            ...state, trailer: {
                url: url,
                file: renameFile(file, Date.now().toString() + ".mp4"),
                name: file.name
            }
        })
    }

    const onNameChange = (name: string) => {
        setState({...state, name: name})
    }

    const onCountryChange = (country: string) => {
        setState({...state, country: country})
    }

    const onOwnerChanged = (owner: string) => {
        setState({...state, owner: owner})
    }

    const onDescriptionChange = (description: string) => {
        setState({...state, description: description})
    }

    const onActorsChange = (actors: string) => {
        setState({...state, actors: actors})
    }

    const onGenresChanged = (genres: string) => {
        setState({...state, genres: genres})
    }

    const onYearChanged = (year: string) => {
        setState({...state, year: year})
    }

    const onContentTypeChange = (contentType: string) => {
        setState({...state, contentType: contentType})
    }

    const onDirectorChange = (director: string) => {
        setState({...state, director: director})
    }

    const onCostChanged = (cost: string) => {
        setState({...state, cost: cost})
    }

    const onDistributionStartDateChanged = (date: string) => {
        setState({...state, startDate: date})
    }

    const onDistributionEndDateChanged = (date: string) => {
        setState({...state, endDate: date})
    }

    const clearVideo = () => {
        setState({...state, video: null})
    }

    const clearTrailer = () => {
        setState({...state, trailer: null})
    }

    const onResetClick = async () => {
        setState(initCreateContentState)
    }

    const onLeftButtonClick = async () => {
        if (stepper === Stepper.INFO) {
            setStepper(Stepper.ADDITIONAL)
            setLeftButtonText("Next")
            setRightButtonText("Back")
        } else if (stepper === Stepper.ADDITIONAL) {
            setStepper(Stepper.CONDITIONS)
            setLeftButtonText("Create")
            setRightButtonText("Back")
        } else if (stepper === Stepper.CONDITIONS) {
            await onCreateClick()
        }
    }

    const onRightButtonClick = async () => {
        if (stepper === Stepper.INFO) {
            await onResetClick()
            setRightButtonText("Reset")
            setLeftButtonText("Next")
        } else if (stepper === Stepper.ADDITIONAL) {
            setStepper(Stepper.INFO)
            setRightButtonText("Reset")
            setLeftButtonText("Next")
        } else if (stepper === Stepper.CONDITIONS) {
            setStepper(Stepper.ADDITIONAL)
            setLeftButtonText("Next")
            setRightButtonText("Back")
        }
    }

    async function onCreateClick() {

        if (state.video) {

            const mountainVideosRef = ref(storage, `videos/${"video" + Date.now() + "irob"}`);
            const mountainVideoPreviewRef = ref(storage, `videoPreviews/${"preview" + Date.now() + "irob"}`);

            setState({...state, isLoading: true})

            getVideoCover(state.video.url, 1).then(async (thumbnail) => {

                async function dataUrlToFile(dataUrl: string): Promise<File> {

                    const res: Response = await fetch(dataUrl);
                    const blob: Blob = await res.blob();
                    return new File([blob], "test", {type: 'image/png'});
                }

                const file = await dataUrlToFile(thumbnail)

                if (state.video?.file) {
                    uploadBytes(mountainVideosRef, state.video.file).then(async (snapshot) => {
                        console.log('Uploaded a video file!');
                        getDownloadURL(snapshot.ref).then(async (videoUrl) => {

                            uploadBytes(mountainVideoPreviewRef, renameFile(file, Date.now() + ".jpg")).then(async (snapshot) => {
                                console.log('Uploaded a video preview file!');
                                getDownloadURL(snapshot.ref).then(async (videoPreview) => {

                                    if (state.trailer) {
                                        const mountainVideoTrailerPreviewRef = ref(storage, `videoTrailers/${state.trailer.name}`);
                                        uploadBytes(mountainVideoTrailerPreviewRef, state.trailer.file).then(async (snapshot) => {
                                            console.log('Uploaded a video trailer file!');
                                            getDownloadURL(snapshot.ref).then(async (videoTrailerPreview) => {
                                                await createContentWithVideoUrl(videoUrl, videoPreview, videoTrailerPreview)
                                            })
                                        })
                                    } else {
                                        await createContentWithVideoUrl(videoUrl, videoPreview, null)
                                    }
                                })
                            })
                        })
                    })

                }

            }).catch((err) => {
                setState({...state, isLoading: false})
                console.error(err);
            })

        }

    }

    async function createContentWithVideoUrl(videoUrl: string, videoPreview: string, videoTrailerPreview: string | null) {
        const result = await createContent({
            name: state.name,
            description: state.description,
            actors: state.actors,
            videoUrl: videoUrl,
            owner: state.owner,
            country: state.country,
            videoPreview: videoPreview,
            director: state.director,
            type: state.contentType,
            category: state.category,
            genres: state.genres,
            trailerUrl: videoTrailerPreview,
            year: state.year,
            startDate: state.startDate,
            endDate: state.endDate,
            cost: state.cost,
            roomId: roomId
        }).unwrap()

        modalsContext?.setState(initCreateCardProps())
        if (!result.success) {
            popupContext?.setState(initNotification(result.message))
        } else {
            dispatch(updateCatalogueState({reload: true}))
        }
    }

    return {
        handleFileChange,
        clearVideo,
        onActorsChange,
        onCountryChange,
        handleTrailerChanged,
        onNameChange,
        onDescriptionChange,
        onContentTypeChange,
        onDirectorChange,
        onYearChanged,
        onOwnerChanged,
        clearTrailer,
        onGenresChanged,
        onCostChanged,
        onDistributionStartDateChanged,
        onDistributionEndDateChanged,
        onLeftButtonClick,
        onRightButtonClick,
        leftButtonText,
        rightButtonText,
        stepper,
        setStepper,
        state,
    }


}