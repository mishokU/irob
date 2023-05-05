import {ReactComponent as Logo} from '../assets/logo-vertical.svg';

export function BenefitsForAll() {
    let topBlockStyle = "border-2 text-center p-6 rounded-t-md border-[#40484f] text-2xl font-bold bg-[#111b24]"
    let middleBlockStyle = "border-2 text-center p-12 border-[#40484f] -mt-0.5"
    let bottomBlockStyle = "border-2 text-center p-12 rounded-b-md border-[#40484f] -mt-0.5"
    return (<section className="bg-[#0c131a]">
        <div className="pt-16">
            <h1 className="flex justify-center text-md font-bold text-[#ffb81c]">BENEFITS FOR ALL</h1>
            <div className="column-3 flex mt-8 pb-16 justify-center">
                <div className="w-[400px] m-4">
                    <h1 className={topBlockStyle}>Seller</h1>
                    <h1 className={middleBlockStyle}>Find the best buyers for your films.</h1>
                    <h1 className={middleBlockStyle}>Conveniently keep track of all rights and contracts for each project. You can keep track of who owns which rights, for which film, in which territory and for how long.</h1>
                    <h1 className={middleBlockStyle}>Fastrack sales and monetisation of added value assets such as subtitles, posters, stills photos, flyers and behind the scenes material.</h1>
                    <h1 className={bottomBlockStyle}>Receive your share of royalties in a timely manner.</h1>
                </div>
                <Logo className="m-auto ml-0 mr-0" />
                <div className="w-[400px] m-4">
                    <h1 className={topBlockStyle}>Buyer</h1>
                    <h1 className={middleBlockStyle}>Find the films that best match your audiences.</h1>
                    <h1 className={middleBlockStyle}>Verifiable chain of titles assembled in one place for your convenience and security.</h1>
                    <h1 className={middleBlockStyle}>Faster, more efficient planning and budgeting for marketing materials. Buyers can see what marketing materials (subtitles, posters, trailers) are already available and those that are still needed before buying a title.</h1>
                    <h1 className={bottomBlockStyle}>Make traceable payments securely and instantly.</h1>
                </div>
            </div>
        </div>
    </section>)
}