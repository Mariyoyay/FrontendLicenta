import {Link} from "react-router-dom";

function HomePage() {
    return(
        <>
            <div>This is the Home Page</div>
            <Link to="/ptp"><button>Go to the Protected Test Page</button></Link>
        </>
    );
}

export default HomePage;