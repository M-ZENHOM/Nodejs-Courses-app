import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../store/hooks'
import { userLogout } from '../store/slices/userSlice'
import { Button } from './Button'

const LogoutBtn = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    async function logout() {
        dispatch(userLogout())
        await axios.get(`${import.meta.env.PROD ? import.meta.env.VITE_API_URL : "http://localhost:5000"}/api/auth/logout`)
        navigate('/')
    }
    return <Button variant="secondary" onClick={logout}>Signout</Button>
}

export default LogoutBtn