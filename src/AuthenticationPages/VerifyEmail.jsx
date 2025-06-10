import {Link, useNavigate} from "react-router-dom";
import store from "../redux/store.jsx";
import {useEffect, useState} from "react";
import api from "../axios/api.jsx";

function VerifyEmail() {
    const navigate = useNavigate();

    const [isSent, setIsSent] = useState(false);
    const [verificationCode, setVerificationCode] = useState('');
    const [timeLeft, setTimeLeft] = useState(300);
    const [isVerified, setIsVerified] = useState(false);
    const [error, setError] = useState('');
    const [sendingCode, setSendingCode] = useState(false);

    // Timer countdown
    useEffect(() => {
        if (!isSent || timeLeft <= 0) return;

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [isSent, timeLeft]);



    const isAuthenticated = store.getState().auth.isAuthenticated;
    const recognizedAccount = store.getState().auth.recognizedAccount;
    const email = store.getState().auth.username;





    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleSendVerification = () => {
        setSendingCode(true);

        const askForVerificationCode = async () => {
            try {
                const { data } = await api.get(`/api/auth/request_verification_email/${email}`);
                if (!data) return;
                setIsSent(true);
                setTimeLeft(300);
                setSendingCode(false);
            } catch (error) {
                console.log(error);
                alert("Email is not valid");
            }
        }

        void askForVerificationCode();
    };

    const handleVerifyCode = () => {

        const verify = async () => {
            try {
                const { data } = await api.post(`/api/auth/verify`, {
                    email: email,
                    code: verificationCode,
                });

                if (data === true) {
                    setIsVerified(true);
                    setError('');
                } else {
                    setError('Invalid verification code');
                }
            } catch (error) {
                setError(error);
            }
        }

        void verify();
    };

    const handleReset = () => {
        setIsSent(false);
        setVerificationCode('');
        setTimeLeft(300);
        setIsVerified(false);
        setError('');
    };

    const loggedOutComponent = (
        <>
            <div>You are currently logged out</div>
            <Link to="/login"><button>Go to the Login Page</button></Link>
        </>
    );


    if (isAuthenticated) {
        navigate('/home');
    }

    return !recognizedAccount ? loggedOutComponent : (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Email Verification</h2>

                {!isSent ? (
                    <div className="space-y-4">
                        <input
                            type="email"
                            value={email || ''}
                            readOnly={true}
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />


                        <button
                            onClick={() => {
                                if (!sendingCode)
                                    handleSendVerification();
                            }}
                            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                        >
                            {sendingCode ? "Wait..." : "Send Verification Email"}
                        </button>
                    </div>
                ) : isVerified ? (
                    <div className="text-center space-y-4">
                        <p className="text-green-600 font-medium">Email verified successfully!</p>
                        <button
                            onClick={() => navigate('/login')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                        >
                            Retry Login
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <p className="text-gray-700">A verification code has been sent to <span className="font-medium">{email}</span></p>
                        <p className="text-gray-700">Time remaining: <span className="font-mono">{formatTime(timeLeft)}</span></p>

                        {timeLeft > 0 ? (
                            <>
                                <input
                                    type="text"
                                    value={verificationCode||''}
                                    onChange={(e) => setVerificationCode(e.target.value)}
                                    placeholder="Enter verification code"
                                    maxLength="6"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                                <button
                                    onClick={handleVerifyCode}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                                >
                                    Verify Code
                                </button>
                                {error && <p className="text-red-500 text-sm">{error}</p>}
                            </>
                        ) : (
                            <>
                                <p className="text-red-500">The verification code has expired</p>
                                <button
                                    onClick={handleReset}
                                    className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-md transition duration-200"
                                >
                                    Send New Code
                                </button>
                            </>
                        )}
                    </div>
                )}
        </div>
    );
}
export default VerifyEmail;