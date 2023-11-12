import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { toast } from 'sonner'
import { z } from 'zod'
import { registerSchema } from "../../Schemas/Register"
import { Button } from "../Button"
import ErrorLabel from "../ErrorLabel"
import { Input } from "../Input"


export default function Register() {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof registerSchema>>({ resolver: zodResolver(registerSchema) })

    async function onSubmit(values: z.infer<typeof registerSchema>) {
        try {
            await axios.post('http://localhost:5000/api/auth/register', {
                name: values.name,
                email: values.email,
                password: values.password
            }).then(res => {
                toast.success(res.data.data.user)
                navigate('/auth/login')
            }).catch(error => toast.error(error.response.data.message))
        } catch (error) {
            return error
        }
    }

    return (
        <form className="flex flex-col justify-center items-center space-y-4 py-24 " onSubmit={handleSubmit(onSubmit)}>
            <Input name="name" placeholder="name" type="text" register={register} />
            {errors.name && <ErrorLabel>{errors.name.message}</ErrorLabel>}
            <Input name="email" placeholder="email" type="email" register={register} />
            {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
            <Input
                name="password"
                placeholder="password"
                type="password"
                register={register}

            />
            {errors.password && <ErrorLabel>{errors.password.message}</ErrorLabel>}
            <Button className="w-full max-w-xs" type="submit" >SignUp</Button>
            <span >Already have an account?  <Link to='/auth/login' className='text-center underline'>Sign In </Link></span>
        </form>

    )
}
