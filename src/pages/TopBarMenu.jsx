import {Link, useNavigate} from "react-router-dom";

function TopBarMenu({onOpenSidebar}) {

    const navigate = useNavigate();

    return (
        <header className="sticky z-10 top-0 bg-orange-700 h-[5vh] text-white flex items-center justify-between px-4 py-3 w-full">
            <div className="flex items-center bg-orange-700">
                <div
                    className="cursor-pointer text-white text-2xl font-bold mr-4"
                    onClick={onOpenSidebar}
                >
                    ≡
                </div>
                <span
                    className="text-xl font-bold cursor-pointer text-white"
                    onClick={() => navigate(`/home`)}
                >DENTAL YAY</span>
            </div>
            <nav className="space-x-4">
                <Link to="/home#contact-info" className="hover:underline">
                    Contact
                </Link>
                <Link to="/privacy-policy" className="hover:underline">
                    Privacy Policy & GDPR
                </Link>
            </nav>


        </header>
    );
}

export default TopBarMenu;