import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export const useNBGetNasabah = (axiosJWT, configAxios) => {
  const [nasabah, setNasabah] = useState([]);
  const [norek, setNorek] = useState("");

  useEffect(() => {
    getNasabah();
  }, [norek]);

  const getNasabah = async () => {
    try {
      if (norek === "") {
        setNasabah([]);
      } else {
        const response = await axiosJWT.get(
          `/nasabah/one/${norek}`,
          configAxios
        );

        setNasabah(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { norek, setNorek, nasabah };
};

export const useNBSubmitMobileUser = (axiosJWT, configAxios, norek) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const [userId, setUserId] = useState("");

  useEffect(() => {
    getNewId();
  }, []);

  const getNewId = async () => {
    let response = await axiosJWT.get("nasabah/mobileuser/newid", configAxios);

    setUserId(response.data);
  };

  const valueForm = {
    userId: userId,
    norek: norek,
    password: "",
  };

  const submitMobileUser = async (e) => {
    try {
      e.preventDefault();

      if (password !== secondPassword) {
        console.log("value not match");
      } else {
        valueForm.password = password;

        const response = await axiosJWT.post(
          "nasabah/mobileuser/add",
          valueForm,
          configAxios
        );

        if (response) {
          setIsSuccess(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isSuccess,
    submitMobileUser,
    setPassword,
    setSecondPassword,
    userId,
  };
};

export const useNBEditMobileUser = (axiosJWT, configAxios, norek, setNorek) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const [norekEdit, setNorekEdit] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("");

  const [urlParams] = useSearchParams();
  const userId = urlParams.get("targetKey");

  const [dataMobileUser, setDataMobileUser] = useState([]);

  useEffect(() => {
    getMobileUser();
  }, [userId]);

  const getMobileUser = async () => {
    try {
      const response = await axiosJWT.get(
        `/nasabah/mobileuser/one/${userId}`,
        configAxios
      );

      if (response) {
        // setDataMobileUser(response.data[0]);
        setNorekEdit(response.data[0].norek);
        setNorek(response.data[0].norek);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const submitMobileUser = async (e) => {
    try {
      e.preventDefault();

      const valueForm = {
        userId: userId,
        norek: norek,
        photoDir: "",
        password: password,
      };

      const response = await axiosJWT.post(
        "nasabah/mobileuser/update",
        valueForm,
        configAxios
      );

      if (response) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    submitMobileUser,
    isSuccess,
    userId,
    norekEdit,
    setNorekEdit,
    setPassword,
    setSecondPassword,
  };
};
