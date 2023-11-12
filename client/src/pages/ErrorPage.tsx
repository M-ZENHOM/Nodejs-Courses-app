import { useRouteError } from "react-router-dom";
import { ErrorMessage } from "../lib/utils";
import { Link } from 'react-router-dom'

export default function ErrorPage() {
    const error = useRouteError();
    const errMsg = ErrorMessage(error);
    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-violet-500 flex flex-col justify-center items-center space-y-3">
            <h1 className="text-4xl md:text-5xl tracking-widest font-extrabold">{errMsg}</h1>
            <p className="text-lg md:text-xl">Sorry, an unexpected error has occurred.</p>
            <Link to="/" className="bg-black text-white px-6 py-4 rounded-xl w-full max-w-xs text-center hover:bg-black/75 uppercase">Go to Home</Link>
        </div>
    );
}