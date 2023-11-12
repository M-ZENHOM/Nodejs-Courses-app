import { useParams } from "react-router-dom";
import UpdateCourse from "../../components/Forms/UpdateCourse";

export default function UpdateCoursePage() {
    const { courseId } = useParams();
    return (
        <div >
            <h2 className='text-center text-3xl font-extrabold tracking-tight'>Update Course</h2>
            <UpdateCourse id={courseId!} />
        </div>
    )
}
