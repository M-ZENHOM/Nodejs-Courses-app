import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Navigate } from "react-router-dom"
import UserProfile from "../../components/Forms/UserProfile"
import Wrapper from "../../components/Wrapper"
import SEO from "../../lib/SEO"
import { useAppSelector } from "../../store/hooks"


export default function Profile() {
    const currentUser = useAppSelector(state => state.currentUser)
    const { data: userData, isPending: userDataPending } = useQuery({
        queryKey: ['user', currentUser],
        queryFn: () => axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:5000"}/api/users/${currentUser?._id}`).then((response) => response.data.data),
    })

    if (!currentUser) return <Navigate to='/auth/login' />

    return (
        <Wrapper className="flex flex-col items-center">
            <UserProfile userData={userData} userDataPending={userDataPending} />
            <SEO title="Profile" description="Profile Page" />
        </Wrapper>
    )
}
