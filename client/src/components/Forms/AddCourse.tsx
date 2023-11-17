import { zodResolver } from "@hookform/resolvers/zod"
import axios from 'axios'
import { useForm } from "react-hook-form"
import { Navigate } from "react-router-dom"
import { toast } from 'sonner'
import { z } from 'zod'
import { courseSchema } from "../../Schemas/Course"
import { useAppSelector } from "../../store/hooks"
import { Button } from "../Button"
import ErrorLabel from "../ErrorLabel"
import { Input } from "../Input"

export default function AddCourse() {
    const currentUser = useAppSelector(state => state.currentUser)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof courseSchema>>({ resolver: zodResolver(courseSchema) })

    async function onSubmit(values: z.infer<typeof courseSchema>) {
        try {
            await axios.post(`${import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:5000"}/api/courses`, {
                title: values.title,
                price: Number(values.price),
                userOwner: currentUser?._id
            }).then(() => { toast.success('Course Added Successfully') }).catch(error => toast.error(error.response.data.message))
        } catch (error) {
            return error
        }
    }

    if (!currentUser) return <Navigate to='/auth/login' />

    return (
        <form className="flex flex-col justify-center items-center space-y-4 py-24 " onSubmit={handleSubmit(onSubmit)}>
            <Input name="title" placeholder="Title" type="text" register={register} />
            {errors.title && <ErrorLabel>{errors.title.message}</ErrorLabel>}
            <Input name="price" placeholder="Price" type="number" register={register} />
            {errors.price && <ErrorLabel>{errors.price.message}</ErrorLabel>}
            <Button className="w-full max-w-xs" type="submit" >Add New Course</Button>
        </form>
    )
}
