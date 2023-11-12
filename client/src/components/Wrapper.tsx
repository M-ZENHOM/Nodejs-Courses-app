import React from "react";
import { cn } from "../lib/utils";

interface IProps {
    children: React.ReactNode;
    className?: string
}

export default function Wrapper({ children, className }: IProps) {
    return (
        <div className={cn("w-full max-w-screen-xl mx-auto", className)}>
            {children}
        </div>
    )
}
