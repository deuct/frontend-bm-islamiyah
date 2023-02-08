import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useAxiosJWT } from "../../../function/AxiosJWT";
import { AuthProvider } from "../../../helper/context/AuthProvider";
import { AuthContext } from "../../../helper/context/Context";

export const useFirstLogin = (configAxios) => {
  const navigate = useNavigate();
  const { axiosJWT } = useAxiosJWT();

  const { userRole } = useContext(AuthContext);

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    checkNewUser();
  }, [userRole]);

  const checkNewUser = async () => {
    try {
      const response = await axiosJWT.get("/user/one", configAxios);

      if (response) {
        const isNewUser = response.data[0].isNewUser;
        console.log(isNewUser);

        if (isNewUser !== "Y") {
          navigate("/404");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");

  const changePassword = async (e) => {
    try {
      e.preventDefault();

      const valueForm = {
        oldPassword: oldPassword,
        password: newPassword,
        secondPassword: secondPassword,
      };

      if (oldPassword) {
        const response = await axiosJWT.post(
          "/changepasswd",
          valueForm,
          configAxios
        );

        if (response) {
          const changeFlag = await axiosJWT.post(
            "/update-isnewuser",
            { isNewUser: "N" },
            configAxios
          );

          if (changeFlag) {
            window.alert(
              "Success change your password. We will redirect you to the dashboard. :)"
            );

            navigate("/dashboard");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    changePassword,
    oldPassword,
    setOldPassword,
    secondPassword,
    setSecondPassword,
    newPassword,
    setNewPassword,
  };
};
