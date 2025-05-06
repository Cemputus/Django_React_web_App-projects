import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useEffect, useState } from "react";

const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null);
    


    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));

    }, []);
    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try{
            const res = await api.post("api/token/refresh", {
                 refresh: refreshToken, 
                });

                if (res.status === 200){
                    const { access } = res.data;
                    localStorage.setItem(ACCESS_TOKEN, access);
                    setIsAuthenticated(true);
                }else {
                    setIsAuthenticated(false);
                }

        } catch (error){
            console.log(error);
            setIsAuthorized(false);
        }

    
};

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
