import UserDetails from "./UserDetails.jsx";
import api from "./axios/api.jsx";
import {useEffect, useState} from "react";
import CreateEditUserForm from "./AuthenticationPages/CreateEditUserForm.jsx";
import PageWithTopAndSideBar from "./pages/PageWithTopAndSideBar.jsx";


function MyDetails() {
    const [currentUser, setCurrentUser] = useState(null);

    const [enableEdit, setEnableEdit] = useState(false);

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const { data } = await api.get("/api/users/myself/get");
                setCurrentUser(data);
            } catch (error) {
                console.error("Error fetching current user data", error);
            }
        }

        void fetchCurrentUser();
    }, [])

    return(
        <PageWithTopAndSideBar>
            <div className="absolute top-20 flex justify-center items-center">
                {enableEdit ? (
                    <CreateEditUserForm
                        user={currentUser}
                        onExit={() => setEnableEdit(false)}
                        onSave={(editedUser) => {
                            setCurrentUser(editedUser);
                            setEnableEdit(false);
                        }}
                    />
                ) : (
                    <div className="bg-white text-black rounded-xl p-6 max-w-md w-full shadow-lg relative">
                        <h3 className="text-xl font-bold mb-4 text-center">Details</h3>
                        <UserDetails user={currentUser}/>
                        <div className="mt-4 pt-4 border-t">
                        <button
                            onClick={() => setEnableEdit(true)}
                            className="bg-yellow-500 text-black px-3 py-1 rounded m-1">Edit Details
                        </button>
                        </div>
                    </div>
                )}
            </div>
        </PageWithTopAndSideBar>
    );
}

export default MyDetails;