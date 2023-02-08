import { useState, useEffect } from "react";

export const useTRListing = (axiosJWT, configAxios) => {
  const [isViewData, setIsViewData] = useState(false);
  const [idSelected, setIdSelected] = useState("");

  const [transaksi, setTransaksi] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [rows, setRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [msg, setMsg] = useState("");

  const [type, setType] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getTransaksi();
  }, [page, keyword, type]);

  const getTransaksi = async () => {
    const response = await axiosJWT.get(
      `/transaksi/listing?search_query=${keyword}&page=${page}&limit=${limit}&filter=${filter}`,
      configAxios
    );

    setTransaksi(response.data.result);
    setPage(response.data.page);
    setTotalPages(response.data.totalPage);
    setRows(response.data.totalRows);
  };

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
    setType(filter);
  };

  return {
    searchData,
    changePage,
    totalPages,
    msg,
    transaksi,
    query,
    setQuery,
    filter,
    setFilter,
    idSelected,
    setIdSelected,
    isViewData,
    setIsViewData,
  };
};

export const useViewTransaksi = (axiosJWT, configAxios, idTransaksi) => {
  const [viewTransaksi, setViewTransaksi] = useState([]);

  useEffect(() => {
    if (idTransaksi) {
      getDetailTrans();
    }
  }, [idTransaksi]);

  const getDetailTrans = async () => {
    try {
      const response = await axiosJWT.get(
        `/transaksi/one/${idTransaksi}`,
        configAxios
      );

      if (response) {
        setViewTransaksi(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return { viewTransaksi };
};
