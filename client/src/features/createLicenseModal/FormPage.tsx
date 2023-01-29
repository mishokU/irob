import {ContentTypeDropDown} from "./ContentTypeDropDown";

export function FormPage() {
    const inputStyle = `border-[#29303A] border-2 rounded-lg pt-2 pl-4 pr-4 pb-2 bg-transparent mt-2 w-full `
    return <div>
        <div>
            <p className="mt-4">Content Type</p>
            <ContentTypeDropDown />
        </div>
        <div className="flex space-x-6">
            <div>
                <div>
                    <p className="mt-4">Content Name</p>
                    <input className={inputStyle} />
                </div>
                <div>
                    <p className="mt-4">Description</p>
                    <textarea className="border-[#29303A] align-text-top border-2 rounded-lg pt-2 pl-4 pr-4 pb-2 bg-transparent mt-2 w-full h-[100px]" />
                </div>
                <div>
                    <p className="mt-4">Director</p>
                    <input className={inputStyle} />
                </div>
                <div>
                    <p className="mt-4">Actors</p>
                    <input className={inputStyle} />
                </div>
                <div>
                    <p className="mt-4">Country</p>
                    <input className={inputStyle} />
                </div>
            </div>
            <div>
                <div>
                    <p className="mt-4">Description</p>
                    <textarea className="border-[#29303A] align-text-top border-2 rounded-lg pt-2 pl-4 pr-4 pb-2 bg-transparent mt-2 w-full h-[100px]" />
                </div>
                <div>
                    <p className="mt-4">Director</p>
                    <input className={inputStyle} />
                </div>
                <div>
                    <p className="mt-4">Actors</p>
                    <input className={inputStyle} />
                </div>
                <div>
                    <p className="mt-4">Country</p>
                    <input className={inputStyle} />
                </div>
            </div>
        </div>
    </div>
}