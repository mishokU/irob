import {StepCard} from "./StepCard";

export function HowItWorksSection() {
    return <section className="text-center bg-[#0c131a] -mt-8">
        <div className="w-[480px] m-auto">
            <h2 className="text-yellow-400 pt-16 text-base">HOW IT WORKS</h2>
            <h1 className="mt-8 text-2xl text-left">IROB offers a secure 24/7 digital film market for the
                film industry.</h1>
            <p className="mt-8 pb-16 text-left">IROB is an innovative blockchain-based platform that
                allows users to buy and sell movie licenses securely and transparently. With IROB,
                filmmakers can easily monetize their content by licensing it to interested buyers,
                while buyers can access a vast library of licensed movies at competitive prices.
                The platform utilizes blockchain technology to ensure secure and tamper-proof transactions,
                while also providing a decentralized marketplace for movie licensing.
                With IROB, the movie industry can benefit from increased transparency, efficiency, and profitability.
            </p>
        </div>
        <section className="lg:w-[800px] m-auto">
            <div className="grid lg:grid-cols-3 sm:grid-cols-1 md:grid-cols-2 justify-center">
                <StepCard number={1} title="Registration of an account" />
                <StepCard number={2} title="Posting / purchasing content" />
                <StepCard number={3} title="Conclusion of a purchase / sale agreement" />
                <StepCard number={4} title="Pledge connection" />
                <StepCard number={5} title="Fulfillment of conditions" />
                <StepCard number={6} title="Refund / burning of collateral" />
            </div>
        </section>
    </section>
}