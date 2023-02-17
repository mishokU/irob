import lockImg from "./assets/lock_46px.png"

export function NonAuthPage() {
    return <div className="justify-center items-center">
        <div className="pt-32 space-y-4">
            <img src={lockImg} className="w-16 h-16 w-fit m-auto" />
            <h1 className="text-center text-white text-2xl">Oops, you are not login to your account, please login or register above</h1>
        </div>
    </div>
}