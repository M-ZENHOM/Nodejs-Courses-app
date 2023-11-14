import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { userLogout } from '../store/slices/userSlice'

const LogoutBtn = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    async function logout() {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/auth/logout`)
        dispatch(userLogout())
        navigate('/')
    }
    return <button className='text-red-500' onClick={logout}>Signout</button>
}

export default LogoutBtn