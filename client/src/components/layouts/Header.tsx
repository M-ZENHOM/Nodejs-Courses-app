import { NavLink, } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useAppSelector } from '../../store/hooks';
import { buttonVariants } from '../Button';
import ThemeToggle from '../ThemeToggle';
export default function Header() {
    const currentUser = useAppSelector(state => state.currentUser)
    return (
        <header className='w-full py-14 '>
            <div className='space-y-10 flex flex-col items-center'>
                <div className='space-y-3 text-center'>
                    <h1 className='text-2xl md:text-5xl font-extrabold tracking-wider'>Curd Courses Website</h1>
                    <p className='text-foreground'>This website built with react, nodejs and mongodb</p>
                </div>
                <ul className='flex items-center space-x-4'>
                    <NavLink className={cn('active:bg-accent', buttonVariants({ variant: 'outline' }))} to="/" >Home</NavLink>
                    <ThemeToggle />
                    {currentUser ? <NavLink className={cn(buttonVariants({ variant: 'outline' }), 'active:bg-accent')} to="/profile" >
                        Profile
                        {/* <img className="w-10 h-10 rounded-full" src={`http://localhost:5000/${currentUser?.user.avatar}`} /> */}
                    </NavLink> : <NavLink className={cn('active:bg-accent', buttonVariants({ variant: 'outline' }))} to="/auth/login" >SignIn</NavLink>}
                </ul>
            </div>
        </header>
    )
}
