import {Footer} from "../footer/components/Footer";
import {email} from "../../constants/Constants";


export function TermsOfUsePage() {
    return <div>
        <div className="lg:ml-56 lg:mr-56 ml-4 mr-4 mt-16 mb-16">
            <h1 className="text-xl text-[#EAB308] text-center">IROB Terms of use</h1>
            <div className="mt-12 lg:w-[600px] w-fit m-auto">
                <div className="space-y-6">
                    <div>
                        <p className="text-start text-[#8fadc0]">
                            Welcome to IROB! These terms of use (“Terms”) govern your access to and use of the IROB
                            website
                            and services (collectively, the “Service”). By using the Service, you agree to be bound by
                            these Terms.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[#EAB308] text-lg">Use of the Service</h2>
                        <p className="text-start text-[#8fadc0]">
                            You may use the Service only for lawful purposes and in accordance with these Terms. You
                            agree
                            not to use the Service:<br/> <br/>

                            - In any way that violates any applicable federal, state, local, or international law or
                            regulation. <br/>
                            - To transmit, or procure the sending of, any advertising or promotional material, including
                            any “junk mail,” “chain letter,” “spam,” or any other similar solicitation. <br/>
                            - To impersonate or attempt to impersonate IROB, an IROB employee, another user, or any
                            other person or entity. <br/>
                            - To engage in any other conduct that restricts or inhibits anyone’s use or enjoyment of the
                            Service, or which, as determined by IROB, may harm IROB or users of the Service or expose them to liability.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[#EAB308] text-lg">Intellectual Property Rights</h2>
                        <p className="text-start text-[#8fadc0]">
                            The Service and its entire contents, features, and functionality (including but not limited
                            to all information, software, text, displays, images, video, and audio) are owned by IROB or its licensors
                            and are protected by United States and international copyright, trademark, patent, trade
                            secret, and other intellectual property or proprietary rights laws.

                            You may not copy, modify, create derivative works of, publicly display or perform,
                            republish, download, store, or transmit any of the material on our Service, except as follows:<br/><br/>

                            - Your computer may temporarily store copies of such materials in RAM incidental to your
                            accessing and viewing those materials. <br/>
                            - You may store files that are automatically cached by your Web browser for display enhancement purposes. <br/>
                            - You may print or download one copy of a reasonable number of pages of the Service for your own
                            personal, non-commercial use and not for further reproduction, publication, or distribution.<br/> <br/>

                            If we provide desktop, mobile, or other applications for download, you may download a single
                            copy to your computer or mobile device solely
                            for your own personal, non-commercial use, and not for further reproduction, publication, or
                            distribution. If we provide social media features
                            with certain content, you may take such actions as are enabled by such features.

                            You must not:<br/><br/>

                            - Modify copies of any materials from the Service.<br/>
                            - Use any illustrations, photographs, video or audio sequences, or any graphics separately
                            from the accompanying text. <br/>
                            - Delete or alter any copyright, trademark, or other proprietary rights notices from copies
                            of materials from the Service. <br/>
                            - Access or use for any commercial purposes any part of the Service or any services or
                            materials available through the Service. <br/>
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[#EAB308] text-lg">Disclaimer of Warranties</h2>
                        <p className="text-start text-[#8fadc0]">
                            The Service is provided “as is” and “as available” without any representations or warranties
                            of any kind, express or implied. IROB does not warrant that the Service will be error-free or
                            uninterrupted.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[#EAB308] text-lg">Limitation of Liability</h2>
                        <p className="text-start text-[#8fadc0]">
                            In no event shall IROB be liable for any direct, indirect, incidental, special,
                            consequential, or punitive damages arising out of or in connection with your use of the Service.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[#EAB308] text-lg">Indemnification</h2>
                        <p className="text-start text-[#8fadc0]">
                            You agree to indemnify and hold harmless IROB and its affiliates, officers, agents, and
                            employees from any claim or demand made by any third party due to or arising out of your use of the
                            Service.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[#EAB308] text-lg">Termination</h2>
                        <p className="text-start text-[#8fadc0]">
                            IROB may terminate your access to all or any part of the Service at any time,
                            with or without cause, with or without notice, effective immediately.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[#EAB308] text-lg">Governing Law</h2>
                        <p className="text-start text-[#8fadc0]">
                            These Terms shall be governed by and construed in accordance with the laws of the State of
                            California without regard to its conflict of law provisions.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[#EAB308] text-lg">Changes to These Terms</h2>
                        <p className="text-start text-[#8fadc0]">
                            IROB may revise these Terms at any time by updating this page. By using the Service,
                            you are agreeing to be bound by the then-current version of these Terms.
                        </p>
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-[#EAB308] text-lg">Contact Us</h2>
                        <p className="text-start text-[#8fadc0]">
                            If you have any questions or concerns about these Terms, please contact us at
                            {email}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <Footer/>
    </div>
}