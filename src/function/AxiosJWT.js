import { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import axiosInstance from "./AxiosInstance";
import configAxios from "../config/ConfigAxios";
import { useNavigate } from "react-router-dom";

export const useAxiosJWT = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [token, setToken] = useState("");
  const [expired, setExpired] = useState("");

  useEffect(() => {
    refreshToken();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axiosInstance.get("/token", configAxios);

      const accessToken = response.data.accessToken;
      setToken(accessToken);

      const decoded = jwt_decode(response.data.accessToken);
      const decodedExp = decoded.exp;
      const decodedName = decoded.userFullName;

      setName(decodedName);
      setExpired(decodedExp);
    } catch (error) {
      // console.log(error);
      console.log("err refresh token");
      if (error.response) {
        navigate("/404");
      }
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

          setName(decoded.userFullName);
          setExpired(decoded.exp);
        }
      }
      return config;
    },
    (error) => {
      console.log("promise error");
      return Promise.reject(error);
    }
  );

  return { axiosJWT, refreshToken, name, token, expired };
};
