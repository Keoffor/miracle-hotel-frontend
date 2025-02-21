import React, {createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const AuthContext = createContext({
  user: null,
  handleLogin: (token) => {},
  handleLogout: () => {},
});
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      const decodedToken = jwtDecode(storedToken);
      setUser(decodedToken);
    }
  }, []);



  const handleLogin = (token) => {
    const decodeToken = jwtDecode(token);
    localStorage.setItem("userId", decodeToken.sub);
    localStorage.setItem("userRole", decodeToken.role);
    localStorage.setItem("token", token);
    localStorage.setItem("firstName", decodeToken.principal)

    setUser(decodeToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    localStorage.removeItem("firstName")
    localStorage.removeItem("customerId")
    localStorage.removeItem("customerCart")
  

    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
