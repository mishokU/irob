import useViewModel from "./CatalogueViewModel"
import {CatalogueUi} from "../items/CatalogueUi";
import {CatalogueItemComponent} from "../items/CatalogueItemComponent";

export function CataloguePage() {
    const {content} = useViewModel()
    return (<div className="h-screen w-screen">
        <div className="pt-8 pl-12 ml-24">
            <div>
                <h1 className="text-2xl pb-4 text-white">Catalogue</h1>
                <div className="text-white pb-4 text-[#8fadc0]">Get a preview of what’s available for licensing on
                    IROB. Sign in or Sign up for free to access ALL titles!
                </div>
                <div className="flex grid gap-2 lg:grid-cols-6 md:grid-cols-3 sm:grid-cols-2">
                    {content.map((item: CatalogueUi) => <CatalogueItemComponent item={item}/>)}
                </div>
            </div>
        </div>
    </div>)
}