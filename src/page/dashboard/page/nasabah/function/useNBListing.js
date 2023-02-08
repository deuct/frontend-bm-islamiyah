import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export const useNBListing = (axiosJWT, configAxios, role) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const [isDeleteData, setIsDeleteData] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [idSelected, setIdSelected] = useState("");

  const [nasabah, setNasabah] = useState([]);
  const [webUser, setWebUser] = useState([]);
  const [mobileUser, setMobileUser] = useState([]);

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");

  const changePage = ({ selected }) => {
    setPage(selected);
    if (selected === 9) {
      setMsg("The page doesn't exist");
    } else {
      setMsg("");
    }
  };

  const searchData = (e) => {
    e.preventDefault();
    setPage(0);
    setMsg("");
    setKeyword(query);
  };

  useEffect(() => {
    getData();
  }, [page, keyword]);

  const getData = async () => {
    let response;

    if (role === "Nasabah") {
      response = await axiosJWT.get(
        `/nasabah/listing?search_query=${keyword}&page=${page}&limit=${limit}`,
        configAxios
      );

      setNasabah(response.data.result);
    } else if (role === "Web User") {
      response = await axiosJWT.get(
        `/nasabah/webuser/listing?search_query=${keyword}&page=${page}&limit=${limit}`,
        configAxios
      );

      setWebUser(response.data.result);
    }
    // else if (role === "Mobile User") {
    //   response = await axiosJWT.get(
    //     `/nasabah/mobileuser/listing?search_query=${keyword}&page=${page}&limit=${limit}`,
    //     configAxios
    //   );

    //   setMobileUser(response.data.result);
    // }

    setPage(response.data.page);
    setTotalPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

  const deleteData = async (idSelected) => {
    console.log(isDeleteData);

    if (isDeleteData) {
      if (role === "Nasabah") {
        try {
          const norek = idSelected;
          const response = await axiosJWT.post(
            "/nasabah/delete",
            { norek: norek },
            configAxios
          );

          if (response) {
            setMsg("success delete data");
            setIsSuccess(true);
            console.log("success delete data");
          }
        } catch (error) {
          console.log(error);
        }
      } else if (role === "Web User") {
        try {
          console.log("come here");
          const username = idSelected;

          const response = await axiosJWT.post(
            "/nasabah/webuser/delete",
            { username: username },
            configAxios
          );

          console.log(response);

          if (response) {
            setMsg("success delete data");
            setIsSuccess(true);
          }
        } catch (error) {
          console.log("error");
        }
      }
    }

    // else if (role === "Mobile User") {
    //   const userId = idSelected;

    //   try {
    //     const response = await axiosJWT.post(
    //       "/nasabah/mobileuser/delete",
    //       { userId: userId },
    //       configAxios
    //     );

    //     if (response) {
    //       setMsg("success delete data");
    //       setIsSuccess(true);
    //       console.log("success delete data");
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };

  const resetPassword = async (idSelected) => {
    if (isResetPassword && role === "Web User") {
      try {
        const username = idSelected;

        const response = await axiosJWT.post(
          "/nasabah/webuser/resetpassword",
          { username: username },
          configAxios
        );

        if (response) {
          setMsg("success reset password data");
          setIsSuccess(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return {
    nasabah,
    webUser,
    mobileUser,
    totalPages,
    changePage,
    searchData,
    query,
    setQuery,
    msg,
    deleteData,
    isDeleteData,
    setIsDeleteData,
    isResetPassword,
    setIsResetPassword,
    isSuccess,
    setIsSuccess,
    idSelected,
    setIdSelected,
    resetPassword,
  };
};
