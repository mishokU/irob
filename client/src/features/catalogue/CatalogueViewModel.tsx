import {useState} from "react";

export default function CatalogueViewModel() {
    const [error, setError] = useState("");
    const [catalogue, setProducts] = useState([]);
    async function getCatalogue() {
        //const { result, error } = await GetCatalogueItems();
        setError(error)
        //setProducts(result)
    }
    return {
        error, getCatalogue, catalogue,
    }
}