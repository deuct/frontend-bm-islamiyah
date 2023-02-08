import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../helper/context/Context";

export const useLogin = (axiosInstance, configAxios) => {
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const { setIsLoggedIn } = useContext(AuthContext);

  const Login = async (e) => {
    try {
      e.preventDefault();

      if (userRole !== 0) {
        const response = await axiosInstance.post(
          "/login",
          {
            username: userName,
            password: password,
            userRole: userRole,
          },
          configAxios
        );

        if (response.data.msg === "failed login") {
          setErrMsg("Failed login!");
        } else {
          if (response.data.isNewUser === "Y") {
            window.localStorage.setItem("isLoggedIn", true);
            window.localStorage.setItem("username", userName);
            window.localStorage.setItem("isNewUser", "Y");

            setIsLoggedIn(true);

            navigate("/firstlogin");
          } else if (response.data.isNewUser === "N") {
            window.localStorage.setItem("isLoggedIn", true);
            window.localStorage.setItem("username", userName);
            window.localStorage.setItem("isNewUser", "N");

            setIsLoggedIn(true);

            navigate("/dashboard");
          } else {
            setErrMsg("Something went Wrong");
          }
        }
      } else {
        setErrMsg("Please select your role!");
      }
    } catch (error) {
      setErrMsg("Failed login!");
    }
  };

  return {
    Login,
    errMsg,
    userName,
    setUserName,
    password,
    setPassword,
    userRole,
    setUserRole,
  };
};
