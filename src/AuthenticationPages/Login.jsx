import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../axios/authService.jsx";
import { Link, useNavigate } from "react-router-dom";
import PageWithTopAndSideBar from "../pages/PageWithTopAndSideBar.jsx";

function Login() {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        await dispatch(login(credentials));
        navigate("/home");
    };

    return (
        <PageWithTopAndSideBar>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <form
                    onSubmit={handleLogin}
                    className="bg-white shadow-md rounded-lg p-8 w-full max-w-md space-y-6"
                >
                    <h2 className="text-2xl font-semibold text-gray-800 text-center">
                        Please provide your login details below
                    </h2>

                    <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            onChange={(e) =>
                                setCredentials({ ...credentials, username: e.target.value })
                            }
                            type="email"
                            id="email"
                            placeholder="you@example.com"
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            onChange={(e) =>
                                setCredentials({ ...credentials, password: e.target.value })
                            }
                            type="password"
                            id="password"
                            placeholder="••••••••"
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition"
                    >
                        Log In
                    </button>

                    <div className="text-center pt-4 border-t border-gray-200">
                        <p className="text-sm text-gray-600 mb-2">Don't have an account yet?</p>
                        <Link to="/register">
                            <button
                                type="button"
                                className="text-blue-600 hover:text-blue-800 font-medium"
                            >
                                Register
                            </button>
                        </Link>
                    </div>
                </form>
            </div>
        </PageWithTopAndSideBar>
    );
}

export default Login;
