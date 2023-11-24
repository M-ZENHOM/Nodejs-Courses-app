import Login from '../../components/Forms/Login'
import Wrapper from '../../components/Wrapper'
import SEO from '../../lib/SEO'

const LoginPage = () => {
    return (
        <Wrapper>
            <SEO title="Login" description="Login Page" />
            <h2 className='text-center text-2xl font-extrabold tracking-tight'>Login Page</h2>
            <Login />
        </Wrapper>
    )
}

export default LoginPage