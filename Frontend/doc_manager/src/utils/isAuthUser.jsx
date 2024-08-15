import { jwtDecode } from "jwt-decode";
import axios from 'axios'

const updateUserToken = async () => {
    const refreshToken = localStorage.getItem("refresh");
    const baseURL = 'http://127.0.0.1:8000'

    try {
        const res = await axios.post(baseURL + '/auth/token/refresh/', {
            'refresh': refreshToken
        })
        if (res.status === 200) {
            localStorage.setItem('access', res.data.access)
            localStorage.setItem('refresh', res.data.refresh)
            console.log("Token updated");

            let decoded = jwtDecode(res.data.access);
            console.log("Decoded Token:", decoded);
            return { 'name': decoded.username, isAuthenticated: true }
        } else {
            return { 'name': null, isAuthenticated: false }
        }

    } catch (error) {
        return { 'name': null, isAuthenticated: false }
    }
}

const isAuthUser = async () => {
    const accessToken = localStorage.getItem("access");

    if (!accessToken) {
        return { 'name': null, isAuthenticated: false }
    }

    const currentTime = Date.now() / 1000;
    let decoded = jwtDecode(accessToken);
    console.log("Decoded Token:", decoded);

    if (decoded.exp > currentTime) {
        console.log('Token is valid');
        console.log(decoded.username);
        
        return { 'name': decoded.username, isAuthenticated: true }
    } else {
        const updateSuccess = await updateUserToken();
        return updateSuccess;
    }
}

export default isAuthUser;
