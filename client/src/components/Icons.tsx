import { FaArrowLeft, FaArrowRight, FaEdit, FaHandPeace, FaMoon, FaReact, FaSearchengin, FaTrash } from 'react-icons/fa'
import { HiOutlineSun } from 'react-icons/hi'
import { SiTypescript } from 'react-icons/si'
import { PiConfettiDuotone, PiWebhooksLogoFill, PiLink } from 'react-icons/pi'

export const Icons = {
    Nice: FaHandPeace,
    Sun: HiOutlineSun,
    Moon: FaMoon,
    TypeScript: SiTypescript,
    React: FaReact,
    Confetti: PiConfettiDuotone,
    Hook: PiWebhooksLogoFill,
    Link: PiLink,
    SEO: FaSearchengin,
    Delete: FaTrash,
    Edit: FaEdit,
    RightArrow: FaArrowRight,
    LeftArrow: FaArrowLeft,
    Yes: (props: any) => (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" x="0" y="0" viewBox="0 0 64 64">
            <path
                fill="#FFF"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.5"
                d="M24.345 50.641H18.68a2.544 2.544 0 01-2.544-2.544V33.004a2.544 2.544 0 012.544-2.544h5.665a2.544 2.544 0 012.544 2.544v15.093a2.544 2.544 0 01-2.544 2.544z"
            ></path>
            <path
                fill="#FFF"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.5"
                d="M42.906 30.46h-3.423c-.88 0-1.593-.713-1.593-1.593v-1.744a5.978 5.978 0 00-5.978-5.978h0c-.985 0-1.784.799-1.784 1.784v3.393a8.573 8.573 0 01-3.239 6.711h0v16.055h14.564a4.957 4.957 0 004.889-4.141l1.453-8.716a4.956 4.956 0 00-4.889-5.771z"
            ></path>
            <g
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit="10"
                strokeWidth="1.5"
            >
                <path d="M31.68 16.464L31.68 13.359"></path>
                <path d="M42.77 22.516L44.965 20.32"></path>
                <path d="M20.61 22.698L18.415 20.503"></path>
            </g>
        </svg>
    )
}