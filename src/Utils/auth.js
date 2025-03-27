import { jwtDecode } from "jwt-decode";

const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null;
};

const getUserRole = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const decoded = jwtDecode(token);
        return decoded?.user?.role || null;
    } catch (error) {
        console.error("Invalid token:", error);
        return null;
    }
};

const logout = () => {
    localStorage.removeItem("token");
};


export { isAuthenticated, getUserRole, logout };
