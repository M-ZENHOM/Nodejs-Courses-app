import { FC } from 'react'
import { cn } from '../lib/utils'

interface ErrorLabelProps {
    children: React.ReactNode
    className?: string
}

const ErrorLabel: FC<ErrorLabelProps> = ({ children, className }) => {
    return <span className={cn("text-red-500 transition-all duration-1000 -  -z-10",
        className)}>{children}</span>
}

export default ErrorLabel