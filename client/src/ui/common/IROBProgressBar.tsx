export function IROBProgressBar() {
    return <div className="absolute left-2/4 bottom-2/4">
        <div
            className="h-12 w-12 animate-spin rounded-full border-4 border-solid
            border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status">
        </div>
    </div>
}