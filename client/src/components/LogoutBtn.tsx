import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { userLogout } from '../store/slices/userSlice'

const LogoutBtn = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    async function logout() {
        await axios.get('http://localhost:5000/api/auth/logout')
        localStorage.removeItem("user")
        dispatch(userLogout())
        navigate('/')
    }
    return <button className='text-red-500' onClick={logout}>Signout</button>
}

export default LogoutBtn