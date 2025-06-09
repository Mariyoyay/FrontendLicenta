import React from "react";
import UserSelector from "./UserSelector.jsx"; // Assumes your API client is set up

const SelectUserModal = ({ fromList: givenUsers,  byRoles: roles, enableAdd, onSelect, onClose }) => {


    return (
        <div className="fixed inset-0 z-50 bg-[rgba(0,0,0,0.5)] flex items-center justify-center">
            <UserSelector fromList={givenUsers} byRoles={roles} enableAdd={enableAdd} onSelect={onSelect}
                          onClose={onClose}/>
        </div>
    );
};

export default SelectUserModal;
