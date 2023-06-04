import React, { useState } from "react";
import AuthMiddleware from "../../auth/middleware/AuthMiddleware";
import { IROBRoutes } from "../../../routes/IROBRoutes";
import { NavLink, useNavigate } from "react-router-dom";
import { LogoImage } from "../assets/LogoImage";
import { useModalsContext } from "../../main/contexts/ModalsProvider";

export function MobileNavBar() {
    const navigate = useNavigate()
    const [navbar, setNavbar] = useState(false);
    const authMiddleware = AuthMiddleware()
    const createContent = useModalsContext()
    const isUserLogged = authMiddleware.getToken() !== null
    return <div className="lg:hidden md:hidden block">
        <div className="pr-4 pt-2 pb-2">
            <div className="flex justify-between items-center">
                <div onClick={() => navigate(IROBRoutes.home)}>
                    <LogoImage />
                </div>
                <div className="lg:ml-4 ml-0 space-x-6">
                    <NavLink className="text-2xl font-bold text-[#ffb81c]" to={IROBRoutes.home}>IROB</NavLink>
                </div>
                <div onClick={() => setNavbar(!navbar)}>
                    {navbar ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            viewBox="0 0 20 20"
                            fill="#ffb81c"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="#ffb81c"
                            strokeWidth={2}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </div>
            </div>
            <div
                className={`flex-1 justify-self-center pb-3 z-50 bg-[#0E1420] h-screen z-50 absolute w-full bg-opacity-60 ${navbar ? "block" : "hidden"
                    }`}
            >
                <div className="bg-[#0E1420] pb-8">
                    <ul className="items-center justify-center pt-8 ml-8 text-white space-y-8">
                        <li>
                            <a onClick={() => {
                                isUserLogged ? navigate(IROBRoutes.profile) : navigate(IROBRoutes.auth)
                                setNavbar(false)
                            }}>{isUserLogged ? "Profile" : "Sign in"}</a>
                        </li>
                        <li>
                            <a onClick={() => {
                                navigate(IROBRoutes.faq)
                                setNavbar(false)
                            }}>FAQ</a>
                        </li>
                        <li>
                            <a onClick={() => {
                                navigate(IROBRoutes.about)
                                setNavbar(false)
                            }}>About</a>
                        </li>
                        {isUserLogged && <li>
                            <a onClick={() => {
                                navigate(IROBRoutes.catalogue)
                                setNavbar(false)
                            }}>Catalogue</a>
                        </li>}
                        {isUserLogged && <li>
                            <a onClick={() => {
                                createContent?.setState({ isVisible: true, roomId: null })
                                setNavbar(false)
                            }}>Upload content</a>
                        </li>}
                    </ul>
                </div>
            </div>
        </div>
    </div>
}