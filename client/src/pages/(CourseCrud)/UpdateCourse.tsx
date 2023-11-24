import { useParams } from "react-router-dom";
import UpdateCourse from "../../components/Forms/UpdateCourse";
import SEO from "../../lib/SEO";

export default function UpdateCoursePage() {
    const { courseId } = useParams();
    return (
        <>
            <SEO title="Update Exits Course" description="Update Course Page" />
            <h2 className='text-center text-3xl font-extrabold tracking-tight'>Update Course</h2>
            <UpdateCourse id={courseId!} />
        </>
    )
}
