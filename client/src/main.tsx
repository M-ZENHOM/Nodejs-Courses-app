import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom'
import Index from './pages/Index'
import Root from './Root'
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/(auth)/login'
import RegisterPage from './pages/(auth)/register'
import CoursePage from './pages/course/page'
import Profile from './pages/(profile)/Profile'
import CreateCourse from './pages/(CourseCrud)/CreateCourse'
import UpdateCoursePage from './pages/(CourseCrud)/UpdateCourse'
import UserCourses from './pages/(profile)/UserCourses'
import Dashboard from './pages/(profile)/dashboard'



const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Index />,
        index: true,
      },
      {
        path: "/auth/register",
        element: <RegisterPage />,
      },
      {
        path: "/auth/login",
        element: <LoginPage />,
      },
      {
        path: "/courses/:courseId",
        element: <CoursePage />,
      },
      {
        path: "/",
        element: <Dashboard />,
        children: [
          {
            path: "/profile",
            element: <Profile />,
          },
          {
            path: "/profile/courses",
            element: <UserCourses />,
          }
        ]
      },
      {
        path: "/create-course",
        element: <CreateCourse />,
      },
      {
        path: "/update-course/:courseId",
        element: <UpdateCoursePage />,
      },
    ]
  },
]);



ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
