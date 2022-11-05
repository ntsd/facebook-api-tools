import React from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";


export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 bg-indigo-50 p-4">
                {children}
            </main>
            <Footer />
        </div>
    )
}