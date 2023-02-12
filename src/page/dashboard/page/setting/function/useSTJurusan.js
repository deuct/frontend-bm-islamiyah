import { useState, useEffect } from "react";

// export const useSTJurusan = (axiosJWT, configAxios) => {
//   const [idJurusan, setIdJurusan] = useState([]);

//   useEffect(() => {
//     getNewId();
//   }, []);

//   const getNewId = async () => {
//     try {
//       const response = await axiosJWT.get("/teller/newid", configAxios);

//       if (response) {
//         setIdTeller(response.data);
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return { idTeller };
// };

export const useSTJurusanAdd = (axiosJWT, configAxios, idTeller) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  const valueForm = {
    idJurusan: "",
    namaJurusan: "",
    deskripsiJurusan: "",
  };

  const addJurusan = async (e) => {
    try {
      e.preventDefault();

      let counter = 0;

      if (valueForm.namaJurusan === "" || valueForm.deskripsiJurusan === "") {
        setMsg("Please fulfill the form");
        counter = 1;
        return;
      }

      if (counter === 0) {
        console.log(valueForm);
        const response = await axiosJWT.post(
          "/jurusan/add",
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

  const updateJurusan = async (e) => {
    try {
      e.preventDefault();

      const idJurusanEdited = e.target.elements.idJurusan.value;
      const namaJurusanEdited = e.target.elements.namaJurusan.value;
      const deskripsiEdited = e.target.elements.deskripsi.value;

      valueForm.idJurusan = idJurusanEdited;
      valueForm.namaJurusan = namaJurusanEdited;
      valueForm.deskripsiJurusan = deskripsiEdited;

      console.log(valueForm);
      const response = await axiosJWT.post(
        "/jurusan/update",
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

  const deleteJurusan = async (jurusanId) => {
    try {
      const idJurusanDeleted = jurusanId;

      const response = await axiosJWT.post(
        "/jurusan/delete",
        { idJurusan: idJurusanDeleted },
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
    valueForm,
    addJurusan,
    deleteJurusan,
    updateJurusan,
    isSuccess,
    setIsSuccess,
    msg,
    setMsg,
  };
};

export const useSTJurusanListing = (axiosJWT, configAxios) => {
  // Fetch Jurusan
  const [jurusan, setJurusan] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [tempId, setTempId] = useState(0);
  const [limit, setLimit] = useState(4);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getJurusan();
  }, [lastId, keyword]);

  const getJurusan = async () => {
    const response = await axiosJWT.get(
      `/jurusan/listing?search_query=${keyword}&lastId=${lastId}&limit=${limit}`,
      configAxios
    );

    const newJurusan = response.data.result;

    if (response.data.isMore) {
      setJurusan([...jurusan, ...newJurusan]);
      setTempId(response.data.lastId);
      setHasMore(response.data.hasMore);
    } else {
      setHasMore(response.data.hasMore);
    }
  };

  const fetchMore = () => {
    setLastId(tempId);
  };

  const searchData = (e) => {
    e.preventDefault();
    setLastId(0);
    setJurusan([]);
    setKeyword(query);
  };

  return { fetchMore, searchData, query, setQuery, jurusan, hasMore };
};
