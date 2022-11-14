

export function getWholeCatalogue() {
    try {
        // let data = [];
        // let dataString = window.localStorage.getItem(COLLECTION)
        // if (dataString) {
        //     data = JSON.parse(dataString)
        // }
        return Promise.resolve({ error: "", result: [] })

    } catch (err) {
        return Promise.resolve({ error: "", result: [] })
    }
}