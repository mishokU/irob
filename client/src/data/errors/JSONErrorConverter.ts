export const getErrorMsg = (inputData: any) => {
    console.log("input: " + inputData.data)
    if(inputData.data !== undefined){
        return inputData.data.error
    } else {
        return inputData.data
    }
}