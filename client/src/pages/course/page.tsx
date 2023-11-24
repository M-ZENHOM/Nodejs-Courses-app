import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Skeleton } from "../../components/Skeleton";
import SEO from "../../lib/SEO";

interface Course {
    title: string
    price: number
}

export default function CoursePage() {
    const { courseId } = useParams();
    const { data, isPending } = useQuery<Course>({
        queryKey: ["courseId", courseId],
        queryFn: async () => await axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:5000"}/api/courses/${courseId}`).then(res => res.data.data.course)
    })
    return (
        <>
            <SEO title={data?.title!} description="Course Page" />
            {isPending ? <div className="flex flex-col justify-center items-center space-y-3">
                <Skeleton className="w-40 h-4" />
                <Skeleton className="w-20 h-4" />
            </div>
                : <div className="text-center text-2xl space-y-3">
                    <h2 className="font-extrabold text-2xl tracking-tight">{data?.title}</h2>
                    <span>{data?.price}$</span>
                </div>}
        </>
    )
}
