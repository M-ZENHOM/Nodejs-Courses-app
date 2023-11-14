
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import axios from 'axios'
import { useForm } from "react-hook-form"
import { toast } from 'sonner'
import { z } from 'zod'
import { UpdateCourseSchema } from "../../Schemas/UpdateCourse"
import { Button } from "../Button"
import ErrorLabel from "../ErrorLabel"
import { Input } from "../Input"
import { useAppSelector } from "../../store/hooks"
import { Navigate, useNavigate } from "react-router-dom"

interface UpdateCourse {
    title: string
    price: number
}

export default function UpdateCourse({ id }: { id: string }) {
    const currentUser = useAppSelector(state => state.currentUser)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof UpdateCourseSchema>>({ resolver: zodResolver(UpdateCourseSchema) })
    const { error, data } = useQuery({
        queryKey: ["courseId", id],
        queryFn: async () => await axios.get(`${import.meta.env.VITE_API_URL}/api/courses/${id}`).then(res => res.data.data.course)
    })
    async function onSubmit(values: z.infer<typeof UpdateCourseSchema>) {
        try {
            await axios.patch(`${import.meta.env.VITE_API_URL}/api/courses/${id}`, { ...values, })
                .then(() => { toast.success('Course Updated Successfully'), navigate('/profile') })
                .catch(error => toast.error(error.response.data.message))
        } catch (error) {
            return error
        }
    }

    if (!currentUser) return <Navigate to='/auth/login' />
    if (error?.message === "Course not found") return <Navigate to='/create-course' />

    return (
        <form className="flex flex-col justify-center items-center space-y-4 py-24 " onSubmit={handleSubmit(onSubmit)}>
            <Input name="title" placeholder="Title" type="text" defaultValue={data?.title} register={register} />
            {errors.title && <ErrorLabel>{errors.title.message}</ErrorLabel>}
            <Input name="price" placeholder="Price" type="text" defaultValue={data?.price} register={register} />
            {errors.price && <ErrorLabel>{errors.price.message}</ErrorLabel>}
            <Button className="w-full max-w-xs" type="submit" >Update  Course</Button>
        </form>
    )
}
