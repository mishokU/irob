import {Footer} from "../../footer/components/Footer";
import {ProfileTeammateCardComponent} from "./ProfileTeammateCardComponent";

export function AboutUsComponent() {
    return <div className="text-white">
        <div className="justify-center items-center text-center">
            <div className="mt-16 mb-32">
                <h2 className="text-[#EAB308] text-sm">ABOUT US</h2>
                <h1 className="text-5xl font-bold mt-12">We're united <br /> by our passion for online-cinema.</h1>
                <h2 className="text-lg mt-8 text-[#8fadc0]">We're devoted to bringing the 8th art to <br /> its ultimate
                    digital transformation!</h2>
            </div>
            <div className="h-20 w-full -rotate-1 bg-[#0c131a] -mt-8" />
            <div className="bg-[#0c131a] pt-8 -mt-4 pb-8">
                <div className="grid grid-cols-2 pl-48 pr-48">
                    <div>
                        <h1 className="text-5xl font-bold text-start pl-48">Greater efficiency <br /> means more
                            money <br /> for great cinema.</h1>
                    </div>
                    <div className="space-y-4 text-start text-[#8fadc0] pr-32">
                        <p>
                            Usov Mikhail and Vasiliy met at the end of 2022 whilst working in the technology and creative industries in Russia.
                            They both wanted to find a way for film professionals to buy and
                            sell film and TV rights in a seamless and secure way, cutting out additional costs. The idea of IROB was born.
                        </p>
                        <p>
                            In early 2023 Mikhail and Vasiliy pitched the idea at Okko company, where they can participate in conversation of a problem
                            on cinema content rights.
                        </p>
                        <p>
                            The IROB platform will officially launched at the Russia in February 2023 with possibilities on best rules and blockchain
                            technologies to provide excellent experience with deals.
                        </p>
                        <p>
                            IROB new platform is based on a cleaner design, new functionality and faster technology. For the user, whether a
                            buyer or seller of film or TV rights, IROB is a fast,
                            reliable and secure way of trading and keeping track rights worldwide.
                        </p>
                    </div>
                </div>
            </div>
            <div className="mt-16 justify-center items-center mb-16">
                <h1 className="text-[#EAB308] text-lg uppercase">Our team</h1>
                <div className="flex items-center justify-center mt-8">
                    <ProfileTeammateCardComponent />
                </div>
            </div>
        </div>
        <Footer />
    </div>
}