import {buttonTheme} from "../../themes/Themes";

export interface ErrorPageProps {
    onClick: () => void
}

export function ErrorPage({onClick}: ErrorPageProps) {
    return <div className="h-screen flex justify-center items-center">
        <div className="w-[400px] h-[200px] rounded-2xl border-2 border-[#ffb81c] flex justify-center items-center">
            <div className="text-white text-center space-y-4">
                <h1 className="text-7xl">404</h1>
                <h2>Something went wrong...</h2>
                <button
                    onClick={onClick}
                    className={buttonTheme}>
                    Retry
                </button>
            </div>
        </div>
    </div>
}