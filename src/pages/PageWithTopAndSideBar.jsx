import TopBarMenu from "./TopBarMenu.jsx";
import SideBar from "./SideBar.jsx";
import {useState} from "react";


export default function PageWithTopAndSideBar({children}) {
    const [showSidebar, setShowSidebar] = useState(false);



    return (
        <div className="min-h-screen bg-white w-full">

            <TopBarMenu onOpenSidebar={() => setShowSidebar(!showSidebar)} />

            <div className="flex justify-between">
                {showSidebar && (
                    <SideBar />
                )}

                <div className="relative w-[100%] min-h-[95vh] p-2 bg-pink-100 flex items-center justify-center">
                    {children}
                </div>

            </div>
        </div>
    );
}