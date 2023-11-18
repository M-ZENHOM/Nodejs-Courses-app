import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { Button, buttonVariants } from "../components/Button"
import { Card, CardDescription, CardTitle } from "../components/Card"
import UserProfile from "../components/Forms/UserProfile"
import { Icons } from "../components/Icons"
import Wrapper from "../components/Wrapper"
import { useAppSelector } from "../store/hooks"
import { cn } from "../lib/utils"
import { toast } from "sonner"
import { Skeleton } from "../components/Skeleton"

interface CourseType {
    _id: string
    title: string
    price: number
}
export default function Profile() {
    const [showCourse, setShowcourse] = useState(false)
    const currentUser = useAppSelector(state => state.currentUser)
    const { data: userData, isPending: userDataPending } = useQuery({
        queryKey: ['user', currentUser],
        queryFn: () => axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:5000"}/api/users/${currentUser?._id}`).then((response) => response.data.data),
    })
    const { data: userCourses, isPending } = useQuery({
        queryKey: ["userCourses"],
        queryFn: () => axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:5000"}/api/courses/userCourses/${currentUser?._id}`).then((response) => response.data.data),
    })
    async function handleDelete(id: string) {
        try {
            await axios.delete(`${import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:5000"}/api/courses/${id}`, { headers: { 'userId': `${currentUser?._id}` } })
                .then(() => { toast.success('Course Deleted Successfully'), location.reload() })
                .catch(error => toast.error(error.response.data.message))
        } catch (error) {
            return error
        }
    }

    if (!currentUser) return <Navigate to='/auth/login' />

    return (
        <Wrapper className="flex flex-col justify-center items-center">
            <UserProfile userData={userData} userDataPending={userDataPending} />
            <button onClick={() => setShowcourse(!showCourse)} className="text-green-500 py-4 text-center">{!showCourse ? "Show Courses 👇" : "Hide Courses 👆"}</button>
            {showCourse && <div className="grid grid-cols-1 md:grid-cols-2 gap-3 py-5 px-4 ">
                {isPending ?
                    Array.from({ length: 2 }).map((_, i) => (
                        <Card key={i} className="p-6 space-y-4 w-full max-w-md min-h-[130px]" >
                            <Skeleton className="w-40 h-4" />
                            <Skeleton className="w-20 h-4" />
                        </Card>))
                    : userCourses?.courses.length > 0 ? userCourses?.courses.map((course: CourseType) => (
                        <Card key={course._id} className="p-6 space-y-4 w-full max-w-xs" >
                            <div className="flex justify-between items-center space-x-4">
                                <CardTitle>{course.title}</CardTitle>
                                <div className="md:space-y-0 md:space-x-3 space-y-3 space-x-0 flex md:flex-row flex-col  items-center justify-center">
                                    <Link className={cn(buttonVariants({ variant: "default" }))} to={`/update-course/${course._id}`}><Icons.Edit /></Link>
                                    <Button className="w-10" onClick={() => handleDelete(course._id)} size="icon" variant="destructive"><Icons.Delete /></Button>
                                </div>
                            </div>
                            <CardDescription>{course.price}$</CardDescription>
                        </Card>
                    )) : <p className="text-red-500 ">You don't have any courses ❌</p>}
            </div>}
        </Wrapper>
    )
}
