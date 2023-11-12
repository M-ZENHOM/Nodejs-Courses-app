import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { isRouteErrorResponse } from 'react-router-dom'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}


export function ErrorMessage(error: unknown): string {
    if (isRouteErrorResponse(error)) {
        return `${error.status} ${error.statusText}`
    } else if (error instanceof Error) {
        return error.message
    } else if (typeof error === 'string') {
        return error
    } else {
        console.error(error)
        return 'Unknown error'
    }
}