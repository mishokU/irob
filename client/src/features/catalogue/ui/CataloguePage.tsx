import useViewModel from "./CatalogueViewModel"
import {CatalogueUi} from "../items/CatalogueUi";
import {CatalogueItemComponent} from "../items/CatalogueItemComponent";
import {buttonTheme} from "../../../ui/themes/Themes";
import {useModalsContext} from "../../main/contexts/ModalsProvider";

export function CataloguePage() {
    const {content, isEmptyVisible} = useViewModel()
    const modalsContext = useModalsContext()
    const style = !isEmptyVisible ? "w-screen relative" : "w-screen h-screen relative"
    return (<div className={style}>
        <div className="pt-6 lg:pl-12 lg:ml-24 lg:mr-24 ml-4 mr-4">
            {isEmptyVisible && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px]">
                <div className="space-y-6 items-center">
                    <h1 className="text-2xl text-center text-white">
                        There are no content to show <br/> let's create it!</h1>
                    <button
                        onClick={() => {
                            modalsContext?.setState({
                                isVisible: true,
                                roomId: null
                            })
                        }}
                        className={buttonTheme + " ml-auto mr-auto w-full"}>
                        Create new content!
                    </button>
                </div>
            </div>}
            {!isEmptyVisible && <div>
                <h1 className="text-3xl pb-4 text-white">Catalogue</h1>
                <div className="pb-4 text-[#8fadc0]">Get a preview of what’s available for licensing on
                    IROB. Sign in or Sign up for free to access all content!
                </div>
                <div className="lg:flex w-fit gap-4 lg:grid lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-1 lg:m-0 space-y-4 lg:space-y-0 m-auto">
                    {content.map((item: CatalogueUi) => <CatalogueItemComponent item={item}/>)}
                </div>
            </div>}
        </div>
    </div>)
}