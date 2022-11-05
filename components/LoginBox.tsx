import { signIn } from "next-auth/react";
import React from "react";
import { Button } from "./Button";

export const LoginBox: React.FC = () => {
    return (
        <div className="flex items-center justify-center flex-col h-full">
            <div>
                You are not sign in
            </div>
            <div className="my-4">
                <Button
                    onClick={() => signIn()}
                    className="bg-blue-600 text-white hover:bg-blue-700 focus:bg-blue-700"
                >
                    SIGN IN
                </Button>
            </div>
        </div>
    )
}