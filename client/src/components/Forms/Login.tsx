import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { useForm } from "react-hook-form"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { toast } from 'sonner'
import { z } from 'zod'
import { LoginSchema } from "../../Schemas/Login"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { setUser } from "../../store/slices/userSlice"
import { Button } from "../Button"
import ErrorLabel from "../ErrorLabel"
import { Input } from "../Input"

export default function Login() {
    const currentUser = useAppSelector(state => state.currentUser)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof LoginSchema>>({ resolver: zodResolver(LoginSchema) })

    async function onSubmit(values: z.infer<typeof LoginSchema>) {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
                email: values.email,
                password: values.password
            }).then((res) => {
                dispatch(setUser({
                    _id: res.data.data.user._id,
                    name: res.data.data.user.name,
                    email: res.data.data.user.email,
                }))
                navigate('/')
            }).catch(error => toast.error(error.response.data.message))
        } catch (error) {
            return error
        }
    }
    if (currentUser) return <Navigate to='/profile' />

    return (
        <form className="flex flex-col justify-center items-center space-y-4 py-24 " onSubmit={handleSubmit(onSubmit)}>
            <Input name="email" placeholder="email" type="email" register={register} />
            {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
            <Input
                name="password"
                placeholder="password"
                type="password"
                register={register}
            />
            {errors.password && <ErrorLabel>{errors.password.message}</ErrorLabel>}
            <Button className="w-full max-w-xs" type="submit" >Login</Button>
            <span >Don't have an account? <Link to='/auth/register' className='text-center underline'>Sign Up </Link></span>
        </form>
    )
}
