import {CatalogueUi} from "../../catalogue/items/CatalogueUi";
import {CatalogueItemComponent} from "../../catalogue/items/CatalogueItemComponent";
import useViewModel from "./ProfileContentViewModel"

export function ProfileContentPage() {
    const {content, isEmptyVisible} = useViewModel()
    return (<div className="w-screen">
        <div className="pt-2 ml-2 mr-24">
            {isEmptyVisible && <div className="text-xl text-[#8fadc0]">
                You do not have any content! Let's create it!
            </div>}
            <div className="flex grid lg:grid-cols-4 gap-4 w-fit md:grid-cols-3 sm:grid-cols-2">
                {content.map((item: CatalogueUi) => <CatalogueItemComponent item={item}/>)}
            </div>
        </div>
    </div>)
}