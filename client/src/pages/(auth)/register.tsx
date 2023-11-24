import Register from '../../components/Forms/Register'
import Wrapper from '../../components/Wrapper'
import SEO from '../../lib/SEO'

const RegisterPage = () => {
    return (
        <Wrapper>
            <SEO title="Register" description="Register Page" />
            <h2 className='text-center text-2xl font-extrabold tracking-tight'>Register Page</h2>
            <Register />
        </Wrapper>
    )
}

export default RegisterPage