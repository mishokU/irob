import {StepCard} from "./StepCard";

export function HowItWorksSection() {
    return <section className="text-center bg-[#0c131a] -mt-8">
        <div className="w-[480px] m-auto">
            <h2 className="text-yellow-400 pt-16 text-base">HOW IT WORKS</h2>
            <h1 className="mt-8 text-2xl text-left">IROB offers a secure 24/7 digital film market for the
                film industry.</h1>
            <p className="mt-8 pb-16 text-left">Our platform makes the connection between sellers and buyers
                faster, easier and fairer.
                IROB is the one-stop-shop for the film industry, the only place where everything from film
                screening to film licensing,
                license payments and material delivery can happen in days instead of months.
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