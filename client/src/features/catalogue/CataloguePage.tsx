import useViewModel from "./CatalogueViewModel"
import {useNavigate} from "react-router-dom";
import React from "react";

export function CataloguePage() {
    let navigate = useNavigate();
    //const { name, price, onChange, saveProduct } = useViewModel();
    return (<div className="h-screen w-screen">
        <div className="pt-8 pl-12 ml-36">
            <div>
                <h1 className="text-2xl pb-4 text-white">Catalogue</h1>
                <div className="text-white pb-4 text-[#8fadc0]">Get a preview of what’s available for licensing on
                    IROB. Sign in or Sign up for free to access ALL titles!
                </div>
                <input className="4px initial px-4 text-black w-[450px] h-10"
                       type="text"
                       placeholder="Search licenses..."
                />
            </div>
        </div>
    </div>)
}