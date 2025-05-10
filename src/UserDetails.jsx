function UserDetails ({user}) {
    if (!user) {
        return (<div className="user-details">No user data is available.</div>);
    }

    return (
        <div className="space-y-4 text-sm">
            <div className="flex justify-between">
                <span className="font-semibold text-gray-600">First Name:</span>
                <span className="bg-blue-100 text-black px-3 py-1 rounded">{user.firstName}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Last Name:</span>
                <span className="bg-blue-100 text-black px-3 py-1 rounded">{user.lastName}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Email:</span>
                <span className="bg-blue-100 text-black px-3 py-1 rounded">{user.email}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Phone:</span>
                <span className="bg-blue-100 text-black px-3 py-1 rounded">{user.phone}</span>
            </div>
            <div className="flex justify-between">
                <span className="font-semibold text-gray-600">Date of Birth:</span>
                <span className="bg-blue-100 text-black px-3 py-1 rounded">{user.dateOfBirth}</span>
            </div>
        </div>
    );
}

export default UserDetails;