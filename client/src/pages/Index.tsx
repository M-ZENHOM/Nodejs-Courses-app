import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { Link, useSearchParams } from "react-router-dom"
import { Button, buttonVariants } from "../components/Button"
import { Card, CardDescription, CardTitle } from "../components/Card"
import { Icons } from "../components/Icons"
import { Skeleton } from "../components/Skeleton"
import Wrapper from "../components/Wrapper"
import { useDebounce } from "../hooks/useDebounce"
import { cn } from "../lib/utils"
import SEO from "../lib/SEO"

interface course {
  _id: string
  title: string
  price: number
}
type Courses = {
  pagination: {
    pages: number
    page: number
  }
  courses: course[]
}

function Index() {
  const [query, setQuery] = useState("")
  const deboucedQuery = useDebounce(query)
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') !== null ? `${'&page='}` + searchParams.get('page') : ''
  const title = searchParams.get('title') !== null ? `${'&title='}` + searchParams.get('title') : ''
  const sort = searchParams.get('sort') !== null ? `${'&sort='}` + searchParams.get('sort') : '&sort=new'
  const { isPending, data } = useQuery<Courses>({
    queryKey: ['courses', searchParams.get('title'), searchParams.get('page'), searchParams.get('sort')],
    queryFn: () => axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:5000"}/api/courses?limit=6${page}${title}${sort}`).then((response) => response.data.data),
  })
  const handelSearch = () => {
    if (deboucedQuery !== "")
      setSearchParams({ title: deboucedQuery, sort: searchParams.get('sort') ?? "new" })
  }
  return (
    // Refactor Styles later!
    <Wrapper className="flex flex-col justify-center items-center pb-20" >
      <div className="flex flex-wrap space-y-3 md:space-y-0 items-center justify-center w-full max-w-lg mx-auto space-x-3 py-10">
        <input placeholder="Search by course title..." className="flex h-9 w-full max-w-xs rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 dark:text-white"
          type="text" onChange={(e) => setQuery(e.target.value)} />
        <Button onClick={handelSearch}>Search</Button>
        <select defaultValue={searchParams.get('sort') ?? 'new'} className="flex h-12 w-full max-w-[90px]  items-center justify-between whitespace-nowrap rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
          onChange={(e) => setSearchParams({ sort: e.target.value, title: deboucedQuery })}>
          <option className="bg-background " disabled>Sorting Options</option>
          <option className="bg-background" value="new">New</option>
          <option className="bg-background" value="old">Old</option>
        </select>
      </div>
      {isPending ?
        <div className="grid grid-cols-1 px-4 md:px-0 md:grid-cols-3 place-items-center gap-3 pb-20">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="p-6 space-y-4 w-full max-w-md min-h-[100px]" >
              <Skeleton className="w-28 h-4" />
              <Skeleton className="w-20 h-4" />
            </Card>))}
        </div>
        : <div className="grid grid-cols-1 px-4 md:px-0 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-3 pb-20">
          {data?.courses.map((course: course) => (
            <Link className="w-full" key={course._id} to={`/courses/${course._id}`}>
              <Card className="p-6 space-y-4 w-full max-w-md min-h-[100px]" >
                <CardTitle>{course.title}</CardTitle>
                <CardDescription>Price: {course.price}$</CardDescription>
              </Card>
            </Link>
          ))}
        </div>}
      <div className="flex items-center space-x-4">
        <Link className={cn(buttonVariants({ variant: "outline" }),
          { "pointer-events-none opacity-50": Number(data?.pagination.page) === 1 || Number.isNaN(Number(data?.pagination.pages)) })}
          to={`?page=${Number(data?.pagination.page) - 1}${title}${sort}`} ><Icons.LeftArrow /></Link>
        <Link className={cn(buttonVariants({ variant: "outline" }),
          { "pointer-events-none opacity-50": Number(data?.pagination.page) === Number(data?.pagination.pages) || Number.isNaN(Number(data?.pagination.pages)) })}
          to={`?page=${Number(data?.pagination.page) + 1}${title}${sort}`} ><Icons.RightArrow /></Link>
      </div>
      <SEO title="Courses Home Page" description="Courses Page" />
    </Wrapper >
  )
}

export default Index
