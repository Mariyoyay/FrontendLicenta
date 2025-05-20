import UserDetails from "./UserDetails.jsx";
import api from "./axios/api.jsx";
import {useEffect, useState} from "react";


function MyDetails() {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const { data } = await api.get("/api/users/myself");
                setCurrentUser(data);
            } catch (error) {
                console.error("Error fetching current user data", error);
            }
        }

        void fetchCurrentUser();
    }, [])

    const handleClick = (e) => {
        e.preventDefault();

        console.log(currentUser);
    }

    return(
        <div>
            <UserDetails user={currentUser} />
            <button onClick={handleClick}>Log user</button>
        </div>
    );
}

export default MyDetails;