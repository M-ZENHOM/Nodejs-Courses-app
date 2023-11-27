import { Link, Outlet } from 'react-router-dom'
import { buttonVariants } from '../../components/Button'
import Wrapper from '../../components/Wrapper'
import { cn } from '../../lib/utils'

export default function Dashboard() {
    return (
        <Wrapper className='flex flex-col justify-center  items-center md:items-start w-full md:flex-row gap-5 pb-6 '>
            <div className='w-full max-w-[16rem]  md:min-h-[70vh] md:h-full border rounded-lg flex flex-col  p-8 space-y-5 '>
                <h2 className='font-extrabold tracking-wide text-2xl border-b py-2 text-center'>Dashboard</h2>
                <ul className='flex flex-row space-x-3 md:flex-col md:space-y-3 md:space-x-0 uppercase'>
                    <Link className={cn(buttonVariants({ variant: "neon" }))} to="/profile">Profile</Link>
                    <Link className={cn(buttonVariants({ variant: "neon" }))} to="/profile/courses">courses</Link>
                </ul>
            </div>
            <main className='flex-1'>
                <Outlet />
            </main>
        </Wrapper>
    )
}
