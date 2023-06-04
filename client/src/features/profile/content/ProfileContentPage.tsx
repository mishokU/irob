import {CatalogueUi} from "../../catalogue/items/CatalogueUi";
import {CatalogueItemComponent} from "../../catalogue/items/CatalogueItemComponent";
import useViewModel from "./ProfileContentViewModel"

export function ProfileContentPage() {
    const {content, isEmptyVisible} = useViewModel()
    return (<>
        <div className="pt-2 ml-2 lg:mr-24 mr-4">
            {isEmptyVisible && <div className="text-xl text-[#8fadc0]">
                You do not have any content! Let's create it!
            </div>}
            <div className="lg:flex lg:grid lg:grid-cols-4 lg:pr-24 lg:gap-4 w-fit md:grid-cols-3 grid-cols-1">
                {content.map((item: CatalogueUi) => <CatalogueItemComponent key={item.contentId} item={item}/>)}
                {content.map((item: CatalogueUi) => <CatalogueItemComponent key={item.contentId} item={item}/>)}
                {content.map((item: CatalogueUi) => <CatalogueItemComponent key={item.contentId} item={item}/>)}
                {content.map((item: CatalogueUi) => <CatalogueItemComponent key={item.contentId} item={item}/>)}
            </div>
        </div>
    </>)
}