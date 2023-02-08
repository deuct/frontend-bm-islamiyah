import { useState, useEffect } from "react";

export const useSTChangePassword = (axiosJWT, configAxios, windowType) => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const [username, setUsername] = useState([]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axiosJWT.get("/user/one", configAxios);
      if (response) {
        setUsername(response.data[0].username);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const valueForm = {
    username: username,
    oldPassword: "",
    password: "",
    secondPassword: "",
  };

  const submitPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axiosJWT.post(
        "/changepasswd",
        valueForm,
        configAxios
      );

      if (response) {
        if (windowType === "popup") {
          window.alert("Successfully Change Password");
          window.close();
        } else {
          setMessage(response.data.message);
          setIsSuccess(true);
        }
      }
    } catch (error) {
      console.log(error);
      setMessage(error.response.data.msg);
    }
  };

  return { valueForm, submitPassword, message, setMessage, isSuccess };
};
