import lockImg from "./assets/lock_46px.png"

export function NotExistsPage() {
    return <div className="flex h-screen justify-center items-center">
        <div className="space-y-4">
            <img src={lockImg} className="w-16 h-16 w-fit m-auto" />
            <h1 className="text-center text-white text-2xl">Oops, page is not exists!</h1>
        </div>
    </div>
}