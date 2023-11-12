import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "react-router-dom";

interface Course {
    title: string
    price: number
}

export default function CoursePage() {
    const { courseId } = useParams();
    const { data } = useQuery<Course>({
        queryKey: ["courseId"],
        queryFn: async () => await axios.get(`http://localhost:5000/api/courses/${courseId}`).then(res => res.data.data.course)
    })
    return (
        <div className="text-center text-2xl">
            <h2>{data?.title}</h2>
            <span>{data?.price}$</span>
        </div>
    )
}
