import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem("token"));

    // Configure axios defaults
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            localStorage.setItem("token", token);
            // Ideally here we would fetch user profile to validate token
            // For now we just assume if token exists, we are logged in or will fail on request
            setUser({ email: "user@example.com" }); // Placeholder or decode JWT
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("token");
            setUser(null);
        }
        setLoading(false);
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
                username: email,
                password: password
            }, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            setToken(response.data.access_token);
            return { success: true };
        } catch (error) {
            console.error("Login failed", error);
            return { success: false, error: error.response?.data?.detail || "Login failed" };
        }
    };

    const register = async (email, password) => {
        try {
            await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
                email,
                password
            });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.response?.data?.detail || "Registration failed" };
        }
    };

    const logout = () => {
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading, token }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
