import { useState, useEffect, useContext } from "react";
import { useAxiosJWT } from "../../../../../function/AxiosJWT";

export const usePFIndex = (configAxios, name) => {
  const [photoNew, setPhotoNew] = useState([]);
  const [photoPath, setPhotoPath] = useState([]);
  const [profileName, setProfileName] = useState("");
  const [username, setUsername] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const { axiosJWT } = useAxiosJWT();

  // const getPicture = async () => {
  //   try {
  //     const response =
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await axiosJWT.get("/user/one", configAxios);
      if (response) {
        setPhotoPath(response.data[0].photo_dir);
        setUsername(response.data[0].username);
        setProfileName(response.data[0].full_name);

        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (e) => {
    setPhotoNew(e.target.files[0]);
  };

  const submitProfile = async (e) => {
    try {
      e.preventDefault();

      let formData = new FormData();
      formData.append("profilePict", photoNew);
      formData.append("username", username);
      formData.append("name", name);

      // for (var key of formData.entries()) {
      //   console.log("test: " + key[0] + ", " + key[1]);
      // }

      const response = await axiosJWT.post("/user/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (response) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changePassword = () => {
    window.open(
      `http://localhost:3000/dashboard/setting/user/changepwd`,
      "",
      "MsgWindow"
    );
  };

  return {
    photoNew,
    setPhotoNew,
    photoPath,
    profileName,
    setProfileName,
    username,
    handleImageChange,
    changePassword,
    submitProfile,
    isSuccess,
  };
};
