import {ICatalogueFields} from "./ICatalogueFields";
import image from "../../assets/text_img.jpg"
import {useModalsContext} from "../../../features/main/ModalsProvider";

export function CatalogueItemComponent({type, description, contentAuthor, creationDate}: ICatalogueFields) {
    const cardContext = useModalsContext()
    return <div className="rounded-2xl border-sm border-2 border-gray-700 w-[16em] h-[10em] overflow-hidden"
                onClick={() => {
                    cardContext?.setVisibility(true)
                    console.log(cardContext?.isVisible)
                }}>
        <img src={image} className="fill bg-black w-full h-full object-cover flex overflow-y-hidden" />
        {/*<h1 className="text-xl text-ellipsis overflow-hidden pl-4 pr-4 pt-1">{type}</h1>*/}
        {/*<p className="pl-2 pr-2 line-clamp-3 bg-transparent w-full resize-none text-sm mt-2 text-ellipsis overflow-hidden">{description}</p>*/}
    </div>
}