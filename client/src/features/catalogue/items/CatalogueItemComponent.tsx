import {CatalogueUi} from "./CatalogueUi";
import {useNavigate} from "react-router-dom";
import {IROBRoutes} from "../../../routes/IROBRoutes";

export interface CatalogueItemProps {
    item: CatalogueUi
}

export function CatalogueItemComponent({item}: CatalogueItemProps) {
    const navigate = useNavigate()
    return <div
        className="cursor-pointer w-fit"
        onClick={() => navigate(IROBRoutes.card, {state: {contentId: item.contentId, fromCatalogue: true}})}>
        <div className="rounded-xl border-sm border-2 border-gray-700 max-w-[16em] w-fit lg:h-[10em] overflow-hidden">
            <img
                placeholder="bg-black"
                src={item.videoPreview}
                className="fill bg-black w-full h-full object-cover min-w-[16em] flex overflow-y-hidden"/>
        </div>
        <h1 className="text-xl text-ellipsis max-w-[270px] text-white overflow-hidden lg:pl-4 pl-0 pr-4 pt-1">{item.name}</h1>
    </div>
}