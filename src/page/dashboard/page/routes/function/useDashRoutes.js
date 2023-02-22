import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../helper/context/Context";
import { useAxiosJWT } from "../../../../../function/AxiosJWT";
import axios from "axios";

export const useDashRoutes = (axiosInstance, configAxios) => {
  const navigate = useNavigate();
  const baseURL = process.env.REACT_APP_API_URL;

  const { setIsLoggedIn, setUserRole } = useContext(AuthContext);

  const { axiosJWT, name, token, expired } = useAxiosJWT();

  const Logout = async () => {
    try {
      const instance = axios.create({ withCredentials: true });

      console.log(baseURL);

      const response = await instance.post(`${baseURL}logout`);

      window.localStorage.removeItem("isLoggedIn");
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("isNewUser");

      setIsLoggedIn(false);
      setUserRole("");

      if (response) {
        navigate("/login");
      }
    } catch (error) {
      console.log("error logout");
      console.log(error);
    }
  };

  return { name, token, expired, Logout, axiosJWT };
};
