import {Link} from "react-router-dom";

function NotFoundPage() {

    return(
        <>
            <div>Error 404: Page not found</div>
            <Link to="/home"><button>Go to the homepage</button></Link>
        </>
    );
}

export default NotFoundPage;