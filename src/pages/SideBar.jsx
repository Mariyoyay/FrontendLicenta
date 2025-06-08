import React from "react";
import NavigationMenu from "./NavigationMenu.jsx";
import AccountMenu from "./AccountMenu.jsx";

function SideBar() {


    return (
        <aside className="sticky sticky top-[5vh] min-w-[34vh] bg-yellow-300 text-white p-4 h-[95vh] overflow-auto">

            <NavigationMenu/>

            <AccountMenu/>

        </aside>
    );
}

export default SideBar;