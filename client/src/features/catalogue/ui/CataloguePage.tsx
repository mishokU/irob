import useViewModel from "./CatalogueViewModel"
import {CatalogueUi} from "../items/CatalogueUi";
import {CatalogueItemComponent} from "../items/CatalogueItemComponent";
import {buttonTheme} from "../../../themes/Themes";

export function CataloguePage() {
    const {content, isEmptyVisible} = useViewModel()
    return (<div className="h-screen w-screen relative">
        <div className="pt-8 pl-12 ml-24 mr-24">
            {
                isEmptyVisible && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="space-y-4 items-center">
                        <h1 className="text-2xl text-white">There are no content to show and buy, let's create it!</h1>
                        <button
                            className={buttonTheme + " ml-auto mr-auto w-full"}>
                            Create new content!
                        </button>
                    </div>
                </div>
            }
            <div>
                <h1 className="text-2xl pb-4 text-white">Catalogue</h1>
                <div className="text-white pb-4 text-[#8fadc0]">Get a preview of what’s available for licensing on
                    IROB. Sign in or Sign up for free to access ALL titles!
                </div>
                <div className="flex w-fit gap-4 grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2">
                    {content.map((item: CatalogueUi) => <CatalogueItemComponent item={item}/>)}
                </div>
            </div>
        </div>
    </div>)
}