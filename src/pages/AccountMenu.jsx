import {useNavigate} from "react-router-dom";
import store from "../redux/store.jsx";
import LogoutButton from "../AuthenticationPages/LogoutButton.jsx";


export default function AccountMenu() {
    const navigate = useNavigate();

    const isLoggedIn = store.getState().auth.isAuthenticated;


    return (
        <div className="mb-6 p-4 bg-yellow-200 rounded-lg shadow text-black w-64 space-y-1">
            <h2 className="text-xl font-bold mb-4 border-b border-yellow-400 pb-2">Account{isLoggedIn && ': ' + store.getState().auth.username}</h2>

            {isLoggedIn ? (
                <>
                    <button
                        className="w-full text-left px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded"
                        onClick={() => navigate(`/my-details`)}
                    >
                        Account Details
                    </button>
                    <LogoutButton className="w-full text-left px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded"/>
                </>
            ):(
                <>
                    <button
                    className="w-full text-left px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded"
                    onClick={() => navigate(`/login`)}
                    >
                        Login
                    </button>
                    <button
                        className="w-full text-left px-2 py-1 bg-blue-500 text-white hover:bg-blue-600 rounded"
                        onClick={() => navigate(`/register`)}
                    >
                        Register
                    </button>
                </>
            )}
        </div>
    );
}
