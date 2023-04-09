

export function DevelopersPage() {
    const value = "{\n" +
        "    \"success\": false,\n" +
        "    \"message\": \"There is no available type in requirements!\"\n" +
        "}"
    const goodValue = "{\n" +
        "    \"success\": true,\n" +
        "    \"message\": \"Requirement with type: Duration days was increased!\"\n" +
        "}"
    return <div className="ml-4 mt-4 space-y-2">
        <h1 className="text-2xl">On this page you can find all necessary information about IROB API</h1>
        <h2 className="text-xl mt-4">Update requirement value by current license id and type</h2>
        <h2>Returns the success and message</h2>
        <div className="bg-[#4a5058] w-[500px] rounded-lg p-2 mt-2 flex space-x-2">
            <h2>POST: </h2>
            <p>http://localhost:5000/api/update</p>
        </div>
        <p>With body</p>
        <div className="bg-[#4a5058] w-[500px] rounded-lg p-2 mt-2">
            <p>licenseKey: da9147d1-c0e8-4416-99a6-bc8001a9bf05</p>
            <p>type: Duration Days</p>
        </div>
        <h2>Good response</h2>
        <div className="bg-[#4a5058] w-[500px] rounded-lg p-2 mt-2">
            <p>{goodValue}</p>
        </div>
        <h2>Bad response</h2>
        <div className="bg-[#4a5058] w-[500px] rounded-lg p-2 mt-2">
            <p>{value}</p>
        </div>
    </div>
}