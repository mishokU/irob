import {ReactComponent as Logo} from '../assets/logo-vertical.svg';

export function BenefitsForAll() {
    let topBlockStyle = "border-2 text-center p-6 rounded-t-md border-[#40484f] text-2xl font-bold bg-[#111b24]"
    let middleBlockStyle = "border-2 text-center p-12 border-[#40484f] -mt-0.5"
    let bottomBlockStyle = "border-2 text-center p-12 rounded-b-md border-[#40484f] -mt-0.5"
    return (<section className="bg-[#0c131a]">
        <div className="pt-16">
            <h1 className="flex justify-center text-xs text-[#ffb81c]">BENEFITS FOR ALL</h1>
            <div className="column-3 flex mt-8 pb-16 justify-center">
                <div className="w-[300px] m-4">
                    <h1 className={topBlockStyle}>Seller</h1>
                    <h1 className={middleBlockStyle}>wefwefewfeweww</h1>
                    <h1 className={middleBlockStyle}>wefwefewfeweww</h1>
                    <h1 className={middleBlockStyle}>wefwefewfeweww</h1>
                    <h1 className={bottomBlockStyle}>wefwefewfeweww</h1>
                </div>
                <Logo className="m-auto ml-0 mr-0" />
                <div className="w-[300px] m-4">
                    <h1 className={topBlockStyle}>Buyer</h1>
                    <h1 className={middleBlockStyle}>wefwefewfeweww</h1>
                    <h1 className={middleBlockStyle}>wefwefewfeweww</h1>
                    <h1 className={middleBlockStyle}>wefwefewfeweww</h1>
                    <h1 className={bottomBlockStyle}>wefwefewfeweww</h1>
                </div>
            </div>
        </div>
    </section>)
}