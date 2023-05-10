export const getErrorMsg = (inputData: any) => {
    if(inputData.data !== undefined){
        return inputData.data.error
    } else {
        return inputData.data
    }
}