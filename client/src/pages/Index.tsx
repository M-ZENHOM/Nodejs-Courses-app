import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link, useLocation } from "react-router-dom"
import { buttonVariants } from "../components/Button"
import { Card, CardDescription, CardTitle } from "../components/Card"
import Wrapper from "../components/Wrapper"
import { cn } from "../lib/utils"
import { Skeleton } from "../components/Skeleton"
import { Icons } from "../components/Icons"

interface course {
  _id: string
  title: string
  price: number
}
type Courses = {
  pages: number
  page: number
  courses: course[]
}

function Index() {
  const page = useLocation().search || "?page=1"
  const { isPending, data } = useQuery<Courses>({
    queryKey: ['courses', page],
    queryFn: () => axios.get(`http://localhost:5000/api/courses${page}&limit=6`).then((response) => response.data.data),
  })


  return (
    <Wrapper className="flex flex-col justify-center items-center pb-20" >
      {isPending ?
        <div className="grid grid-cols-1 px-4 md:px-0 md:grid-cols-3 place-items-center gap-3 pb-20">
          {Array.from({ length: 3 }).map((_, i) => (
            <Card key={i} className="p-6 space-y-4 w-full max-w-xs" >
              <Skeleton className="w-40 h-4" />
              <Skeleton className="w-20 h-4" />
            </Card>))}
        </div>
        : <div className="grid grid-cols-1 px-4 md:px-0 md:grid-cols-3 place-items-center gap-3 pb-20">
          {data?.courses.map((course: course) => (
            <Link className="w-full" key={course._id} to={`/courses/${course._id}`}>
              <Card className="p-6 space-y-4 w-full max-w-xs" >
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>Price: {course.price}$</CardDescription>
              </Card>
            </Link>
          ))}
        </div>}
      <div className="flex items-center space-x-4">
        <Link className={cn(buttonVariants({ variant: "outline" }),
          { "pointer-events-none opacity-50": Number(data?.page) === 1 })}
          to={`?page=${Number(data?.page) - 1}`} ><Icons.LeftArrow /></Link>
        <div className="flex space-x-3">
          {isPending ? (
            <>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="bg-secondary w-10 h-10 leading-10  rounded-full text-center hover:bg-secondary/50" />
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: Number(data?.pages) }).map((_, i) => (
                <Link key={i} className={cn("bg-secondary w-10 h-10 leading-10  rounded-full text-center hover:bg-secondary/50",
                  { "bg-green-500": i + 1 === Number(data?.page) })}
                  to={`?page=${i + 1}`}>{i + 1}</Link>
              ))}
            </>
          )}
        </div>
        <Link className={cn(buttonVariants({ variant: "outline" }),
          { "pointer-events-none opacity-50": Number(data?.page) === Number(data?.pages) })}
          to={`?page=${Number(data?.page) + 1}`} ><Icons.RightArrow /></Link>
      </div>
    </Wrapper >
  )
}

export default Index
