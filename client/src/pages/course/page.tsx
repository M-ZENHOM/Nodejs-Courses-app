import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Skeleton } from "../../components/Skeleton";

interface Course {
    title: string
    price: number
}

export default function CoursePage() {
    const { courseId } = useParams();
    const { data, isPending } = useQuery<Course>({
        queryKey: ["courseId", courseId],
        queryFn: async () => await axios.get(`${import.meta.env.VITE_API_URL}/api/courses/${courseId}`).then(res => res.data.data.course)
    })
    return (
        <>
            {isPending ? <div className="text-center text-2xl">
                <Skeleton className="w-40 h-4" />
                <Skeleton className="w-20 h-4" />
            </div>
                : <div className="text-center text-2xl">
                    <h2>{data?.title}</h2>
                    <span>{data?.price}$</span>
                </div>}
        </>
    )
}
