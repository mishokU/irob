import {useState} from "react";
import {CreateContentState, initCreateContentState} from "./CreateContentState";
import {useCreateContentMutation} from "../../../data/store/content/ContentApi";
import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../../firebaseConfig";
import {getVideoCover} from "@rajesh896/video-thumbnails-generator";
import {useModalsContext} from "../../main/contexts/ModalsProvider";


export default function CreateLicenseViewModel() {

    const [state, setState] = useState<CreateContentState>(initCreateContentState)

    const [createContent] = useCreateContentMutation()

    const modalsContext = useModalsContext()

    const handleFileChange = (event: any) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setState({
            ...state, video: {
                url: url,
                file: file,
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

    const onDescriptionChange = (description: string) => {
        setState({...state, description: description})
    }

    const onActorsChange = (actors: string) => {
        setState({...state, actors: actors})
    }

    const onContentTypeChange = (contentType: string) => {
        setState({...state, contentType: contentType})
    }

    const onDirectorChange = (director: string) => {
        setState({...state, director: director})
    }

    const clearVideo = () => {
        setState({...state, video: null})
    }

    const onResetClick = async () => {
        setState(initCreateContentState)
    }

    const onCreateClick = async () => {

        if (state.video) {

            const mountainVideosRef = ref(storage, `videos/${state.video.name}`);
            const mountainVideoPreviewRef = ref(storage, `videoPreviews/${state.video.name}`);

            const url = URL.createObjectURL(state.video.file)

            console.log(url)

            getVideoCover(state.video.url, 1).then(async (thumbnail) => {
                console.log(thumbnail)

                async function dataUrlToFile(dataUrl: string): Promise<File> {

                    const res: Response = await fetch(dataUrl);
                    const blob: Blob = await res.blob();
                    return new File([blob], "test", { type: 'image/png' });
                }

                const file = await dataUrlToFile(thumbnail)

                if(state.video?.file){
                    uploadBytes(mountainVideosRef, state.video.file).then(async (snapshot) => {
                        console.log('Uploaded a video file!');
                        getDownloadURL(snapshot.ref).then(async (videoUrl) => {

                            uploadBytes(mountainVideoPreviewRef, file).then(async (snapshot) => {
                                console.log('Uploaded a video preview file!');
                                getDownloadURL(snapshot.ref).then(async (videoPreview) => {
                                    await createContentWithVideoUrl(videoUrl, videoPreview)
                                })
                            })

                        })
                    })

                }

            }).catch((err) => {
                console.error(err);
            })

        }

    }

    async function createContentWithVideoUrl(videoUrl: string, videoPreview: string) {

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
        }).unwrap()

        if (result.success) {
            modalsContext?.setVisibility(false)
        } else {
            //Toast

        }
    }

    return {
        handleFileChange,
        clearVideo,
        onActorsChange,
        onCountryChange,
        onNameChange,
        onDescriptionChange,
        onContentTypeChange,
        onDirectorChange,
        onCreateClick,
        onResetClick,
        state,
    }


}