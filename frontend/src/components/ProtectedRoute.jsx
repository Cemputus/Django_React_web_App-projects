import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    
    const refreshToken = async () => {

    
}

const auth = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
        setIsAuthenticated(false);
        return;
    }
    const decoded = jwtDecode(token);
    const tokenExpiration = decoded.exp;
    const now = Date.now() / 1000;

    if (tokenExpiration < now) {
        await refreshToken();
    }else{
        setIsAuthenticated(true);
    }

    setIsAuthenticated(true);
}



if (isAuthorized === null) {

    return <div>Loading...</div>
}


return isAuthorized? children : <Navigate to="/login" />

}

export default ProtectedRoute;
