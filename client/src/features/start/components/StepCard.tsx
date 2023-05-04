export interface IStepCard {
    number: number
    title: string
}

export function StepCard({number, title}: IStepCard) {
    const stepStyle = "w-[220px] h-[260px] bg-[#111b24] overflow-hidden relative rounded-lg m-8"
    return (<div className={stepStyle}>
            <div className="w-[120px] h-[200px] bg-[#1d2b37] z-10 rotate-45 absolute -m-10 rounded-lg overflow-hidden" />
            <div className="text-7xl text-start relative mt-4 ml-8 font-bold text-[#ffb81c] z-10">{number}</div>
            <p className="text-start z-10 absolute bottom-12 left-10 text-white text-2xl font-bold">{title}</p>
        </div>)
}