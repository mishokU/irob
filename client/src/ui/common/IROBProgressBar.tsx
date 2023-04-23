export function IROBProgressBar() {
    return <div className="absolute z-80 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <div
            className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-white
            border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
        </div>
    </div>
}