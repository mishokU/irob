import { Footer } from "../../footer/components/Footer";
import { ProfileTeammateCardComponent } from "./ProfileTeammateCardComponent";

export function AboutUsComponent() {
  return (
    <div className="text-white">
      <div className="justify-center items-center text-center">
        <div className="mt-16 mb-32">
          <h2 className="text-[#EAB308] text-sm">ABOUT US</h2>
          <h1 className="text-5xl font-bold mt-12">
            Our love for online movies <br /> brings us together as a community.
            
          </h1>
          <h2 className="text-lg mt-8 text-[#8fadc0]">
          Our passion for online movies unites us as a community committed <br />
           to revolutionizing the way the 8th art is experienced digitally.
          </h2>
        </div>
        <div className="h-20 w-full opacity-5 -rotate-1 bg-[#0c131a] -mt-8" />
        <div className="bg-[#0c131a] pt-8 -mt-4 pb-8">
          <div className="grid md:grid-cols-1 lg:grid-cols-2 sm:grid-cols-1 lg:pl-48 lg:pr-48 space-y-6 lg:space-y-0">
            <div>
              <h1 className="text-5xl font-bold lg:text-start lg:pl-40 text-center">
                 Excellent films that are more effective in engaging audiences will generate higher profits.
              </h1>
            </div>
            <div className="space-y-4 lg:text-start text-center pl-32 pr-32 text-[#8fadc0] pr-32">
              <p>
                Usov Mikhail and Vasiliy met at the end of 2022 whilst working
                in the technology and creative industries in Russia. They both
                wanted to find a way for film professionals to buy and sell film
                and TV rights in a seamless and secure way, cutting out
                additional costs. The idea of IROB was born.
              </p>
              <p>
                In early 2023 Mikhail and Vasiliy pitched the idea at Okko
                company, where they can participate in conversation of a problem
                on cinema content rights.
              </p>
              <p>
                The IROB platform will officially launched at the Russia in
                February 2023 with possibilities on best rules and blockchain
                technologies to provide excellent experience with deals.
              </p>
              <p>
                IROB new platform is based on a cleaner design, new
                functionality and faster technology. For the user, whether a
                buyer or seller of film or TV rights, IROB is a fast, reliable
                and secure way of trading and keeping track rights worldwide.
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
  );
}
