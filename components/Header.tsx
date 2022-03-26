import { signOut, useSession } from "next-auth/react";
import React from "react";


export const Header: React.FC<{}> = () => {
    const { data: session } = useSession()

    return (
        <nav className="flex bg-white flex-wrap items-center justify-between p-4">
            <div className="lg:order-2 w-auto lg:w-1/5 lg:text-center">
                <a className="text-xl text-gray-800 font-semibold font-heading" href="#">
                    Facebook Tools
                </a>
            </div>
            <div className="navbar-menu lg:order-1 lg:block w-full lg:w-2/5">
                {session && session.user && <div>
                    <a className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600" href="#">
                        Home
                    </a>
                </div>}
            </div>
            <div className="navbar-menu lg:order-3 lg:block w-full lg:w-2/5 lg:text-right">
                {session && session.user && <div>
                    <div className="block lg:inline-block mt-4 lg:mt-0 mr-10">
                        Loging as {session.user.name}
                    </div>
                    <a onClick={() => signOut()} className="block lg:inline-block mt-4 lg:mt-0 text-blue-900 hover:text-indigo-600" href="#" >
                        Sign out
                    </a>
                </div>}
            </div>
        </nav>

    )
}