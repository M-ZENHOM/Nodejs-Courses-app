import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { z } from 'zod'
import { userProfileSchema } from "../../Schemas/UserProfile.schema"
import { cn } from "../../lib/utils"
import { useAppDispatch } from "../../store/hooks"
import { setUser } from "../../store/slices/userSlice"
import { Button, buttonVariants } from "../Button"
import ErrorLabel from "../ErrorLabel"
import { Input } from "../Input"
import LogoutBtn from "../LogoutBtn"
import DeleteUser from "../DeleteUser"
import { Skeleton } from "../Skeleton"

export default function UserProfile({ userData, userDataPending }: { userData: { user: { _id: string, name: string, email: string, avatar: string } }, userDataPending: boolean }) {
    const dispatch = useAppDispatch();
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<z.infer<typeof userProfileSchema>>({ resolver: zodResolver(userProfileSchema) })

    async function onSubmit(values: z.infer<typeof userProfileSchema>) {
        try {
            await axios.put(`${import.meta.env.VITE_API_URL}/api/users/${userData.user._id}`, {
                name: values.name,
                email: values.email
            }).then((res) => {
                dispatch(setUser({
                    _id: res.data.data.user._id,
                    name: res.data.data.user.name,
                    email: res.data.data.user.email,
                }))
            }).catch(error => toast.error(error.response.data.message))
        } catch (error) {
            return error
        }
    }

    return (
        <form className="flex flex-col justify-center items-center space-y-4 w-full max-w-xs" onSubmit={handleSubmit(onSubmit)}>
            {userDataPending ? <Skeleton className="w-20 h-20 rounded-full" /> : <img className="w-20 h-20 rounded-full" src={`${import.meta.env.VITE_API_URL}/${userData?.user.avatar}`} />}
            <Input name="name" placeholder="name" type="text" register={register} defaultValue={userDataPending ? "Username" : userData?.user.name} />
            {errors.name && <ErrorLabel>{errors.name.message}</ErrorLabel>}
            <Input name="email" placeholder="email" type="email" register={register} defaultValue={userDataPending ? "Email" : userData?.user.email} />
            {errors.email && <ErrorLabel>{errors.email.message}</ErrorLabel>}
            <Button className="w-full max-w-xs" type="submit" >Update</Button>
            <Link to="/create-course" className={cn(buttonVariants({ variant: "default" }), "w-full bg-green-500 hover:bg-green-700")}>Create Course</Link>
            <div className="flex justify-between items-center w-full">
                <DeleteUser userId={userData?.user._id} />
                <LogoutBtn />
            </div>
        </form>
    )
}
