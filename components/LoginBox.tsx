import { signIn } from "next-auth/react";
import React from "react";

export const LoginBox: React.FC = () => {
    return (
        <div className="flex items-center justify-center flex-col h-full">
            <div>
                You are not sign in
            </div>
            <div>
                <button
                    onClick={() => signIn()}
                    type="button"
                    className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                    Sign in
                </button>
            </div>
        </div>
    )
}