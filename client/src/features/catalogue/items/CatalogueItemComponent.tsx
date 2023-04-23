import {CatalogueUi} from "./CatalogueUi";
import {useNavigate} from "react-router-dom";
import {IROBRoutes} from "../../../routes/IROBRoutes";

export interface CatalogueItemProps {
    item: CatalogueUi
}

export function CatalogueItemComponent({item}: CatalogueItemProps) {
    const navigate = useNavigate()
    return <div>
        <div className="rounded-xl border-sm border-2 border-gray-700 w-[16em] h-[10em] overflow-hidden"
             onClick={() => {
                 navigate(IROBRoutes.card, {state: {contentId: item.contentId, fromCatalogue: true}})
             }}>
            <img
                placeholder="bg-black"
                src={item.videoPreview}
                className="fill bg-black w-full h-full object-cover flex overflow-y-hidden"/>
        </div>
        <h1 className="text-xl text-ellipsis text-white overflow-hidden pl-4 pr-4 pt-1">{item.name}</h1>
    </div>
}