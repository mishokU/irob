import {CatalogueUi} from "./CatalogueUi";
import {useContentFullCardContext} from "../../main/contexts/ContentFullCardProvider";

export interface CatalogueItemProps {
    item: CatalogueUi
}

export function CatalogueItemComponent({item}: CatalogueItemProps) {
    const useContext = useContentFullCardContext()
    return <div>
        <div className="rounded-xl border-sm border-2 border-gray-700 w-[16em] h-[10em] overflow-hidden"
             onClick={() => {
                 useContext?.setVisibility({
                     isVisible: true,
                     contentId: item.contentId,
                     fromCatalogue: true
                 })
             }}>
            <img src={item.videoPreview} className="fill bg-black w-full h-full object-cover flex overflow-y-hidden"/>
        </div>
        <h1 className="text-xl text-ellipsis text-white overflow-hidden pl-4 pr-4 pt-1">{item.name}</h1>
    </div>
}