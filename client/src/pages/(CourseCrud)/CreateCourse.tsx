import AddCourse from '../../components/Forms/AddCourse'
import SEO from '../../lib/SEO'
export default function CreateCourse() {
    return (
        <>
            <SEO title="Create New Course" description="Create Course Page" />
            <h2 className='text-center text-3xl font-extrabold tracking-tight'>Create Course</h2>
            <AddCourse />
        </>
    )
}
