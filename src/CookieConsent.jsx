import {useEffect, useState} from "react";


function CookieConsent() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie_consent');
        if (!consent) {
            setShow(true);
        }
    }, []);

    const acceptCookies = () => {
        localStorage.setItem('cookie_consent', 'true');
        setShow(false);
    };

    if (!show) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 z-50 flex justify-between items-center">
      <span>
        We are only using necessary cookies to authenticate you once you are logged in. By using our website, you accept our cookie policy.
      </span>
            <button
                onClick={acceptCookies}
                className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded"
            >
                Accept
            </button>
        </div>
    );
}

export default CookieConsent;