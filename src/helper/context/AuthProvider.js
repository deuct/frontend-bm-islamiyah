import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./Context.js";
import jwt_decode from "jwt-decode";
import axios from "axios";
import axiosInstance from "../../function/AxiosInstance.js";
import configAxios from "../../config/ConfigAxios.js";

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userRole, setUserRole] = useState("");

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      refreshToken();
    } else if (!isLoggedIn) {
      setIsLoggedIn(window.localStorage.getItem("isLoggedIn"));
    }
  }, [isLoggedIn]);

  const refreshToken = async () => {
    try {
      const response = await axiosInstance.get("/token", configAxios);

      const accessToken = response.data.accessToken;
      setToken(accessToken);

      const decoded = jwt_decode(response.data.accessToken);
      const decodedExp = decoded.exp;
      const decodedName = decoded.adminName;

      setName(decodedName);
      setExpired(decodedExp);
    } catch (error) {
      console.log("error");
      window.localStorage.removeItem("isLoggedIn");
      window.localStorage.removeItem("isNewUser");
    }
  };

  const axiosJWT = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();

      if (expired * 10 < currentDate.getTime()) {
        const response = await axiosInstance.get("/token", configAxios);

        if (response) {
          config.headers.Authorization = `Bearer ${response.data.accessToken}`;
          setToken(response.data.accessToken);

          const decoded = jwt_decode(response.data.accessToken);

          setName(decoded.adminName);
          setExpired(decoded.exp);
        }
      }
      return config;
    },
    (error) => {
      console.log("authprovide promise error");
      return Promise.reject(error);
    }
  );

  useEffect(() => {
    if (isLoggedIn) {
      currentRole();
    }
  }, [isLoggedIn]);

  const currentRole = async () => {
    try {
      const response = await axiosJWT.get("/user-role", configAxios);
      // console.log(response)

      if (response) {
        setUserRole(response.data);
      }
    } catch (error) {
      console.log("error");
    }
  };
  return (
    <AuthContext.Provider
      value={{ userRole, setUserRole, isLoggedIn, setIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};
