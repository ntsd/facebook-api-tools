/* eslint-disable @next/next/no-img-element */
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";


export const Header: React.FC = () => {
    const { data: session } = useSession()

    return (
        <nav className="flex bg-white flex-wrap items-center justify-between p-4">
            <div className="lg:order-2 w-auto lg:w-1/5 lg:text-center">
                <Link className="text-xl text-gray-900 font-semibold font-heading" href="/">
                    Facebook Tools
                </Link>
            </div>
            <div className="block lg:hidden">
                <button className="navbar-burger flex items-center py-2 px-3 text-gray-500 rounded border border-gray-500">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z">
                        </path>
                    </svg>
                </button>
            </div>
            <div className="navbar-menu lg:order-1 hidden lg:block w-full lg:w-2/5">
                {session && session.user && <div>
                    <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-gray-900 hover:text-gray-400" href="/">
                        Home
                    </Link>
                    <Link className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-gray-900 hover:text-gray-400" href="/likes">
                        Likes
                    </Link>
                </div>}
            </div>
            <div className="navbar-menu lg:order-3 hidden lg:block w-full lg:w-2/5 lg:text-right">
                {session && session.user && <div>
                    <img alt="profile" src={session.user.image || ""} className="object-cover rounded-full block lg:inline-block mr-5" />
                    <a onClick={() => signOut()} className="block lg:inline-block text-gray-900 hover:text-gray-400" href="#" >
                        Sign out
                    </a>
                </div>}
            </div>
        </nav>

    )
}