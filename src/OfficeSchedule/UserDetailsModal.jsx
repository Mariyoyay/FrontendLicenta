import UserDetails from "../UserDetails.jsx";
import {useEffect, useState} from "react";
import api from "../axios/api.jsx";
import CreateEditUserForm from "../AuthenticationPages/CreateEditUserForm.jsx";

function UserDetailsModal ({ email, onClose, userType }) {
    const [user, setUser] = useState({});
    const [enableEdit, setEnableEdit] = useState(false);

    useEffect(() => {
        const fetchUser = async (email) => {
            const { data } = await api.get(`/api/users/user/${email}`);
            setUser(data);
        }

        void fetchUser(email);
    }, [email])

    if (!email) onClose();



    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center z-50">
            {enableEdit ? (
                <CreateEditUserForm
                    user={user}
                    onExit={() => setEnableEdit(false)}
                    onSave={(editedUser) => {
                        console.log(editedUser);
                        window.location.reload();
                    }}
                />
            ) : (
                <div className="bg-white text-black rounded-xl p-6 max-w-md w-full shadow-lg relative">
                    <button
                        className="absolute top-2 right-2 text-black font-bold text-lg"
                        onClick={onClose}
                    >
                        &times;
                    </button>
                    <h3 className="text-xl font-bold mb-4 text-center">{userType.beautiful} Details</h3>
                    <UserDetails user={user}/>
                    <button
                        onClick={() => setEnableEdit(true)}
                        className="bg-yellow-500 text-black px-3 py-1 rounded m-1">Edit
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserDetailsModal;