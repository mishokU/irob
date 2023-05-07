import backImg from "../../../../ui/assets/left_24px.png"

export interface BackButtonLedgerProps {
    onBackClick: () => void
}

export function BackButtonLedger({onBackClick}: BackButtonLedgerProps) {
    return (<button
        type="button"
        onClick={onBackClick}
        className="w-[40px] h-[40px] bg-[#ffb81c] rounded-full p-2.5 text-center inline-flex">
        <img src={backImg}/>
        <span className="sr-only">Icon description</span>
    </button>)
}