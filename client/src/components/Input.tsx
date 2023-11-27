import { UseFormRegister } from "react-hook-form"
import { cn } from "../lib/utils"

// type refactor later!
interface IProps {
    className?: string
    register: UseFormRegister<any>
    name: string
    placeholder?: string
    type?: string
    defaultValue?: string

}


export const Input = ({ className, register, name, defaultValue, placeholder = "Input placeholder", type = 'text', ...rest }: IProps) => {
    return (
        <input className={cn("flex h-12 w-full max-w-xs  rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:text-white", className)}
            {...register(name)}
            placeholder={placeholder}
            type={type}
            defaultValue={defaultValue}
            {...rest} />
    )

}

