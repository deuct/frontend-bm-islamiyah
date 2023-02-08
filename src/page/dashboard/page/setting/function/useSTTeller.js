import { useState, useEffect } from "react";

export const useSTTeller = (axiosJWT, configAxios) => {
  const [idTeller, setIdTeller] = useState([]);

  useEffect(() => {
    getNewId();
  }, []);

  const getNewId = async () => {
    try {
      const response = await axiosJWT.get("/teller/newid", configAxios);

      if (response) {
        setIdTeller(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { idTeller };
};

export const useSTTellerAdd = (axiosJWT, configAxios, idTeller) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [msg, setMsg] = useState("");

  const valueForm = {
    idTeller: idTeller,
    fullName: "",
    nuptk: "",
  };

  const addTeller = async (e) => {
    try {
      e.preventDefault();

      let counter = 0;

      if (valueForm.fullName === "" || valueForm.nuptk === "") {
        setMsg("Please fulfill the form");
        counter = 1;
        return;
      }

      if (counter === 0) {
        const response = await axiosJWT.post(
          "/teller/add",
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

  const updateTeller = async (e) => {
    try {
      e.preventDefault();

      const idTellerEdited = e.target.elements.idTeller.value;
      const nameEdited = e.target.elements.fullName.value;
      const nuptkEdited = e.target.elements.nuptk.value;

      valueForm.idTeller = idTellerEdited;
      valueForm.fullName = nameEdited;
      valueForm.nuptk = nuptkEdited;

      const response = await axiosJWT.post(
        "/teller/update",
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

  const deleteTeller = async (tellerId) => {
    try {
      const idTellerDeleted = tellerId;

      const response = await axiosJWT.post(
        "/teller/delete",
        { idTeller: idTellerDeleted },
        configAxios
      );

      console.log(response);

      if (response) {
        console.log("yess");
        console.log(isSuccess);
        setIsSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return {
    valueForm,
    addTeller,
    deleteTeller,
    updateTeller,
    isSuccess,
    setIsSuccess,
    msg,
    setMsg,
  };
};

export const useSTTellerListing = (axiosJWT, configAxios) => {
  // Fetch Teller
  const [teller, setTeller] = useState([]);
  const [lastId, setLastId] = useState(0);
  const [tempId, setTempId] = useState(0);
  const [limit, setLimit] = useState(4);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    getTeller();
  }, [lastId, keyword]);

  const getTeller = async () => {
    const response = await axiosJWT.get(
      `/teller/listing?search_query=${keyword}&lastId=${lastId}&limit=${limit}`,
      configAxios
    );

    const newTeller = response.data.result;

    if (response.data.isMore) {
      setTeller([...teller, ...newTeller]);
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
    setTeller([]);
    setKeyword(query);
  };

  return { fetchMore, searchData, query, setQuery, teller, hasMore };
};
