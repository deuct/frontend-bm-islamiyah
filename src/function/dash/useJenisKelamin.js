import { useEffect, useState } from "react";

export const useGetJK = (axiosJWT, configAxios) => {
  const [jkData, setJKData] = useState([]);

  useEffect(() => {
    getJKData();
  }, []);

  const getJKData = async () => {
    const response = await axiosJWT.get("/jenkel/all", configAxios);

    if (response) {
      setJKData(response.data);
    }
  };

  return { jkData };
};
