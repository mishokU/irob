import {Footer} from "../../footer/components/Footer";
import {ProfileTeammateCardComponent} from "./ProfileTeammateCardComponent";
import {ServiceValuesComponent} from "./ServiceValuesComponent";
import {MotivationComponent} from "./MotivationComponent";
import {RoadmapComponent} from "./RoadmapComponent";
import {JoinComponent} from "../join/JoinComponent";

export function AboutUsComponent() {
    return (<div className="text-white">
        <div className="justify-center items-center text-center">
            <div className="mt-16 mb-32">
                <h2 className="text-[#EAB308] text-2xl">ABOUT US</h2>
                <h1 className="text-5xl font-bold mt-12">
                    Our love for online movies <br/> brings us together as a community.
                </h1>
                <h2 className="text-lg mt-8 text-[#8fadc0]">
                    Our passion for online movies unites us as a community committed <br/>
                    to revolutionizing the way the 8th art is experienced digitally.
                </h2>
            </div>
            <div className="h-20 w-full opacity-5 -rotate-1 bg-[#0c131a] -mt-8"/>
            <MotivationComponent/>
            <RoadmapComponent/>
            <div className="mt-16 justify-center items-center mb-16">
                <ServiceValuesComponent/>
                <JoinComponent />
                <div className="pt-16 pb-16">
                    <h1 className="text-[#EAB308] text-2xl uppercase">Our team</h1>
                    <div className="flex items-center justify-center mt-8">
                        <ProfileTeammateCardComponent/>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>)
}
