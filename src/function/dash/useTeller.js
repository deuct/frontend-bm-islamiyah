import { useState, useEffect } from "react";

export const useAllTeller = (axiosJWT, configAxios) => {
  const [tellerData, setTellerData] = useState([]);

  useEffect(() => {
    getTellerData();
  }, []);

  const getTellerData = async () => {
    const response = await axiosJWT.get("/teller/all", configAxios);

    if (response) {
      setTellerData(response.data);
    }
  };

  return { tellerData };
};

export const useCurrentTeller = () => {
  const [currentTeller, setCurrentTeller] = useState("");

  useEffect(() => {
    setCurrentTeller(window.localStorage.getItem("username"));
  }, []);

  return { currentTeller };
};
