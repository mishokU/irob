import {ContentTypeDropDown} from "./ContentTypeDropDown";
import {buttonTheme, inputStyle} from "../../../../../themes/Themes";
import useViewModel from "./CreateRequrementViewModel"
import {IROBProgressBar} from "../../../../../ui/common/IROBProgressBar";
import {CreateRequirementsProps} from "./CreateRequirementsDialog";

export const contentTypes = [{id: 1, name: 'Duration days', unavailable: false}, {
    id: 2, name: 'Hold deposit', unavailable: false
}, {id: 3, name: 'Views count', unavailable: false}, {id: 4, name: 'Cost', unavailable: false}, {
    id: 5, name: 'Else', unavailable: false
}]

export function CreateRequirementFormPage({isVisibleState, setIsVisibleState}: CreateRequirementsProps) {
    const {
        title,
        setTitle,
        setDescription,
        description,
        setValue,
        value,
        contentType,
        setType,
        customType,
        setCustomType,
        onActionClick,
        requirementId,
        isProgress,
        roomReducer,
        error
    } = useViewModel(isVisibleState, setIsVisibleState)

    const maxTitleLength = 30
    const customTypeNumber = 5
    const maxValueLength = 10
    const maxDescriptionLength = 300

    return <div className="relative">
        {isProgress && error === "" && <IROBProgressBar />}
        <div className={(isProgress || error !== "") ? "invisible" : ""}>
            <h1 className="text-3xl font-bold">
                {requirementId === null ? "Requirement creation" : "Requirement updating"}
            </h1>
            <div className="flex space-x-4">
                <div className="w-full">
                    <p className="mt-4">Title</p>
                    <div className="flex relative">
                        <input
                            maxLength={maxTitleLength}
                            value={title}
                            readOnly={!!roomReducer.isFinished}
                            placeholder="For example: Contract duration"
                            onChange={(titleField) => {
                                setTitle(titleField.target.value)
                            }}
                            className={inputStyle} />
                        <p className="absolute right-4 bottom-2">{title.length} / {maxTitleLength} max</p>
                    </div>
                </div>
                <div>
                    <p className="mt-4">Content type</p>
                    <ContentTypeDropDown type={contentType} setType={setType} />
                </div>
                <div>
                    <p className="mt-4">Value</p>
                    <input
                        maxLength={maxValueLength}
                        value={value}
                        placeholder="0"
                        readOnly={!!roomReducer.isFinished}
                        pattern="[0-9]*"
                        onChange={(valueField) => {
                            setValue((value) => valueField.target.validity.valid ? Number(valueField.target.value) : value)
                        }}
                        className={inputStyle} />
                </div>
            </div>
            {contentType.id === customTypeNumber && <div>
                <p className="mt-4">Custom type</p>
                <textarea
                    maxLength={40}
                    value={customType}
                    readOnly={!!roomReducer.isFinished}
                    placeholder="Write there your custom requirement type with numeric meaning"
                    onChange={(customTypeField) => {
                        setCustomType(customTypeField.target.value)
                    }}
                    className="resize-none border-[#29303A] align-text-top border-2 rounded-lg pt-2 pl-4 pr-4 pb-2 bg-transparent mt-2 w-full h-[46px]"
                />
            </div>}
            <div>
                <p className="mt-4">Description</p>
                <div className="flex z-10">
                <textarea
                    maxLength={maxDescriptionLength}
                    value={description}
                    readOnly={!!roomReducer.isFinished}
                    placeholder="Some words about your requirement to current situation"
                    onChange={(descriptionField) => {
                        setDescription(descriptionField.target.value)
                    }}
                    className="resize-none border-[#29303A] align-text-top border-2 rounded-lg pt-2 pl-4 pr-4 pb-2 bg-transparent mt-2 w-full h-[140px]"
                />
                    <p className="absolute right-10 bottom-[90px]">{description.length} / {maxDescriptionLength} max</p>
                </div>
            </div>
            <div className="flex justify-between space-x-2">
                {
                    !roomReducer.isFinished && <button
                        className={buttonTheme + " mt-4 w-full"}
                        onClick={onActionClick}>
                        {requirementId === null ? "Save" : "Update"}
                    </button>
                }
                <button className={buttonTheme + " mt-4 w-full"} onClick={() => {
                    setIsVisibleState({isVisible: false, requirement: null})
                }}>Cancel
                </button>
            </div>
        </div>
        {
            error !== "" && <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                <h1>{error}</h1>
            </div>
        }
    </div>
}