import { useEffect, useState } from "react";

export const useSTLogo = (axiosJWT, configAxios) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const [image, setImage] = useState([]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const submitImage = async () => {
    try {
      let formData = new FormData();
      formData.append("images", image);

      const response = await axiosJWT.post(
        "/setting/system/logo/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
        configAxios
      );

      if (response) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [logo, setLogo] = useState([]);

  useEffect(() => {
    getLogo();
  }, []);

  const getLogo = async () => {
    try {
      const response = await axiosJWT.get("/setting/system/logo", configAxios);

      if (response) {
        setLogo(response.data[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { logo, submitImage, handleImageChange, isSuccess };
};
