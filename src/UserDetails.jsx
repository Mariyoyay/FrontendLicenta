import './UserDetails.css';

function UserDetails ({user}) {
    if (!user) {
        return (<div className="user-details">No user data is available.</div>);
    }

    return (
        <div className="user-details">
            {/*<h2>User Details</h2>*/}
            <div className="user-detail-row"><strong>First Name:</strong> {user.firstName}</div>
            <div className="user-detail-row"><strong>Last Name:</strong> {user.lastName}</div>
            <div className="user-detail-row"><strong>Email:</strong> {user.email}</div>
            <div className="user-detail-row"><strong>Phone:</strong> {user.phone}</div>
            <div className="user-detail-row"><strong>Date of Birth:</strong> {user.dateOfBirth}</div>
        </div>
    );
}

export default UserDetails;