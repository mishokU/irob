import meImg from "../assets/me.jpg"

export function ProfileTeammateCardComponent() {
    return <div className="bg-white border w-[344px] border-gray-200 rounded-lg shadow-md">
        <img
            className="rounded-t-lg w-[344px]"
            src={meImg}
            alt=""/>
        <div className="p-5">
            <p className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">Usov Mikhail 23 y.o.</p>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                CEO of IROB, Master in CS, Full-Time Android and Web Developer
            </p>
        </div>
    </div>
}