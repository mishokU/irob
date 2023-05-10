import {Footer} from "../footer/components/Footer";
import {email} from "../../constants/Constants";

export function PolicyPrivacyPage() {
    return <div>
        <div className="ml-56 mr-56 mt-16 mb-16">
            <h1 className="text-xl text-[#EAB308] text-center">IROB Privacy Policy</h1>
            <div className="mt-12 w-[600px] m-auto">
                <div className="space-y-6">
                    <div>
                        <p className="text-start text-[#8fadc0]">
                            At IROB, we take your privacy very seriously.
                            We understand the importance of protecting your personal information and are committed
                            to maintaining the confidentiality and security of any data that you share with us.
                            This privacy policy outlines how we collect, use, and protect your personal information.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[#EAB308] text-lg"> Information We Collect</h2>
                        <p className="text-start text-[#8fadc0]">
                            We collect various types of information from our users, including: <br/>

                            - Personal Information: This includes your name, email address, phone number, and other
                            contact
                            information.
                            - Demographic Information: This includes your age, gender, and other demographic details.
                            - Usage Information: This includes information about how you use our website, such as the
                            pages
                            you visit,
                            the links you click on, and the content you view.
                            - Device Information: This includes information about the device you use to access our
                            website,
                            such as your
                            IP address, browser type, and operating system.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[#EAB308] text-lg">How We Use Your Information</h2>
                        <p className="text-start text-[#8fadc0]">
                            We use your personal information for a variety of purposes, including:

                            - To provide you with the products and services you request.
                            - To communicate with you about our products and services.
                            - To improve our website and services.
                            - To personalize your experience on our website.
                            - To comply with legal requirements.

                            We may also use your information for other purposes that are disclosed to you at the time we
                            collect it or
                            with your consent.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[#EAB308] text-lg">How We Protect Your Information</h2>
                        <p className="text-start text-[#8fadc0]">
                            We take appropriate measures to protect your personal information from unauthorized access,
                            disclosure,
                            alteration, or destruction. We use a variety of security technologies and procedures to help
                            protect your
                            information from unauthorized access, use, or disclosure.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[#EAB308] text-lg">Sharing Your Information</h2>
                        <p className="text-start text-[#8fadc0]">
                            We may share your personal information with third-party service providers who perform
                            services
                            on our
                            behalf. These service providers are required to use the information only for the purpose of
                            providing
                            services to us and are contractually obligated to maintain the confidentiality and security
                            of
                            your personal
                            information.

                            We may also share your personal information if required by law or if we believe that such
                            disclosure is
                            necessary to protect our rights or the safety of others.

                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[#EAB308] text-lg">Your Choices</h2>
                        <p className="text-start text-[#8fadc0]">

                            You have the right to request access to, correction of, or deletion of your personal
                            information. You may
                            also opt-out of receiving marketing communications from us at any time.

                            Changes to This Privacy Policy

                            We may update this privacy policy from time to time. We will notify you of any changes by
                            posting the new
                            privacy policy on our website.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[#EAB308] text-lg">Contact Us</h2>
                        <p className="text-start text-[#8fadc0]">
                            If you have any questions or concerns about our privacy policy, please contact us at
                            {email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
}