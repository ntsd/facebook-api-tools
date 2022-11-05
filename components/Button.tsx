import React from "react";

interface ButtonProps {
    onClick?: () => void
    className?: string
    children: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({onClick, className, children}) => {
    return (
        <button
            onClick={onClick}
            type="button"
            className={`
                inline-block
                px-7 py-3
                font-medium
                text-sm
                leading-snug
                rounded
                shadow-md
                hover:shadow-lg
                focus:shadow-lg
                focus:outline-none
                focus:ring-0
                active:shadow-lg
                transition
                duration-150
                ease-in-out
                ${className}
            `}
        >
            {children}
        </button>
    )
}