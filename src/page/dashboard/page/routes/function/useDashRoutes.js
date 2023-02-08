import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../../helper/context/Context";
import { useAxiosJWT } from "../../../../../function/AxiosJWT";

export const useDashRoutes = (axiosInstance, configAxios) => {
  const navigate = useNavigate();

  const { setIsLoggedIn, setUserRole } = useContext(AuthContext);

  const { axiosJWT, name, token, expired } = useAxiosJWT();

  const Logout = async () => {
    try {
      await axiosJWT.delete("/logout", configAxios);
      window.localStorage.removeItem("isLoggedIn");
      window.localStorage.removeItem("username");
      window.localStorage.removeItem("isNewUser");

      setIsLoggedIn(false);
      setUserRole("");

      navigate("/login");
    } catch (error) {
      console.log("error logout");
      console.log(error);
    }
  };

  return { name, token, expired, Logout, axiosJWT };
};
