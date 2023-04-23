import {ServerUrl} from "../../../../constants/Constants";

export function GetVideoUrlInfo() {
    const value = "{\n" +
        "    \"success\": false,\n" +
        "    \"message\": \"There is no video with this key!\"\n" +
        "}"
    const goodValue = "{\n" +
        "    \"success\": true,\n" +
        "    \"videoUrl\": \"url video\"\n" +
        "}"
    return <div className="space-y-4">
        <h2 className="text-xl mt-4">Get video url by current license key</h2>
        <div className="space-y-2">
            <h2>Returns the success and message</h2>
            <div className="bg-[#4a5058] w-[500px] rounded-lg p-2 flex space-x-2">
                <h2>GET: </h2>
                <p>{ServerUrl}/api/getVideoUrl</p>
            </div>
        </div>
        <div className="space-y-2">
            <p>With query</p>
            <div className="bg-[#4a5058] w-[500px] rounded-lg p-2">
                <p>licenseKey: da9147d1-c0e8-4416-99a6-bc8001a9bf05</p>
            </div>
        </div>
        <div className="space-y-2">
            <h2>Good response</h2>
            <div className="bg-[#4a5058] w-[500px] rounded-lg p-2">
                <p>{goodValue}</p>
            </div>
        </div>
        <div className="space-y-2">
            <h2>Bad response</h2>
            <div className="bg-[#4a5058] w-[500px] rounded-lg p-2">
                <p>{value}</p>
            </div>
        </div>
    </div>
}