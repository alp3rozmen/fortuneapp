import React, { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const AuthContext = createContext(null as any);

export const AuthContextProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState(0);
  const [role, setRole] = useState("");
  const [userProfilePicture, setUserProfilePicture] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Yükleme durumu ekle

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (token) {
      // Token varsa, kullanıcı bilgilerini al
      getUserInfo().then(() => {
        setIsLogin(true);
        setIsLoading(false); // Yükleme bitti
      }).catch(() => {
        setIsLogin(false);
        setIsLoading(false); // Yükleme bitti
      });
    } else {
      setIsLogin(false);
      setIsLoading(false); // Yükleme bitti
    }
  }, []);

  const getUserInfo = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/getUserInfo", {
        method: "POST",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
          accessControlAllowOrigin: "*",
        },
        body: JSON.stringify({ userid: localStorage.getItem("userid") }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setUserId(data.userid);
        setUserName(data.userName);
        setRole(data.user_role);
        setEmail(data.email);
        setBalance(data.balance);
        setUserProfilePicture(data.profile_image);
        localStorage.setItem("userid", data.userid);
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("userType", data.user_role);
      } else {
        handleLogout();
      }
    } catch (error) {
      handleLogout();
      throw new Error('Fetch user info failed');
    }
  };

  const login = async (userName: string, password: string) => {
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          accessControlAllowOrigin: "*",
        },
        body: JSON.stringify({ username: userName, password: password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        setToken(data.token);
        setUserId(data.userid);
        setIsLogin(true);
        setUserName(data.userName);
        setRole(data.user_role);
        setEmail(data.email);
        setBalance(data.balance);
        localStorage.setItem("token", data.token);
        localStorage.setItem("userid", data.userid);
        localStorage.setItem("userName", data.userName);
        localStorage.setItem("userType", data.user_role);
        setUserProfilePicture(data.profile_image);
        navigate("/");
        toast.success(data.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        const errorData = await response.json();
        toast.error(errorData.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setIsLogin(false);
      }
    } catch (error) {
      toast.error("Bir hata oluştu", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setIsLogin(false);
    }
  };

  const handleLogout = () => {
    setIsLogin(false);
    localStorage.clear();
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        userName,
        isLogin,
        email,
        role,
        balance,
        login,
        logout: handleLogout,
        getUserInfo,
        userProfilePicture,
      }}
    >
      {!isLoading ? children : <div>Yükleniyor...</div>} {/* Yükleniyor göstergesi */}
    </AuthContext.Provider>
  );
};

export default AuthContext;
