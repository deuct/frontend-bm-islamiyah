import React, { useState, useEffect } from "react";
import { Row, Col, Table, Form, Button } from "react-bootstrap";
import { BsSearch, BsPencilSquare, BsTrash, BsEyeFill } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import "./style/TRListing.css";
import CMPBreadCrumb from "../../component/CMPBreadCrumb";
import { useTRListing, useViewTransaksi } from "./function/useTRListing";
import CMPModalViewData from "../../component/CMPModalViewData";
import { TRListingContext } from "../../../../helper/context/Context";

function TRListing(props) {
  const configAxios = props.configAxios;
  const axiosJWT = props.axiosJWT;

  const breadCrumbData = ["Transaction", "Histories"];
  const labelForm = [
    "Transaksi ID",
    "Tanggal Transaksi",
    "Norek",
    "Teller",
    "Tipe Transaksi",
    "Jumlah",
    "Terbilang",
  ];

  const {
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
  } = useTRListing(axiosJWT, configAxios);

  const { viewTransaksi } = useViewTransaksi(axiosJWT, configAxios, idSelected);

  return (
    <>
      <CMPBreadCrumb breadCrumbData={breadCrumbData} />

      <TRListingContext.Provider
        value={{ isViewData, setIsViewData, idSelected, setIdSelected }}
      >
        <CMPModalViewData
          formName="Transaksi"
          labelForm={labelForm}
          viewData={viewTransaksi}
        />

        <Row className="my-4 justify-content-center">
          <Col xs={12} md={12} sm={12} className="transaksi-title">
            <Row>
              <Col>
                <h1>Transaction History</h1>
                <hr />
              </Col>
            </Row>
            <Row
              className="justify-content-center mt-2 mb-5"
              id="transaksi-body"
            >
              <Col xs={12}>
                <Form
                  className="search-transaksi-form mb-5"
                  onSubmit={searchData}
                >
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Label>Search something :</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Search..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group className="ml-3">
                    <Form.Label>Filter by transaction type :</Form.Label>
                    <Form.Control
                      as="select"
                      value={filter}
                      onChange={(e) => setFilter(e.target.value)}
                    >
                      <option value="">All</option>
                      <option value="penarikan"> Penarikan</option>
                      <option value="setoran">Setoran</option>
                    </Form.Control>
                  </Form.Group>
                  <Button className="btn-search-transaction" type="submit">
                    <BsSearch />
                  </Button>
                </Form>
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>ID Transaksi</th>
                      <th>Tanggal Transaksi</th>
                      <th>No. Rekening</th>
                      <th>Nama Nasabah</th>
                      <th>Kelas</th>
                      <th>Jurusan</th>
                      <th>Tipe Transaksi</th>
                      <th>Jumlah</th>
                      <th>Opsi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transaksi.map((transaksi) => (
                      <tr key={transaksi.id_transaksi}>
                        <td>
                          <a href="#">{transaksi.id_transaksi}</a>
                        </td>
                        <td>{transaksi.tgl_transaksi}</td>
                        <td>{transaksi.norek}</td>
                        <td>{transaksi.nama_lengkap}</td>
                        <td>{transaksi.kelas}</td>
                        <td>{transaksi.nama_jurusan}</td>
                        <td>{transaksi.type}</td>
                        <td>{transaksi.jumlah}</td>
                        <td>
                          <Button
                            variant="info"
                            onClick={() => {
                              setIsViewData(true);
                              setIdSelected(transaksi.id_transaksi);
                            }}
                          >
                            <BsEyeFill />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <p style={{ color: "red" }}>{msg}</p> 
                <div className="d-flex justify-content-center">
                  <ReactPaginate
                    previousLabel={"< Prev"}
                    nextLabel={"Next >"}
                    pageCount={Math.min(10, totalPages)}
                    onPageChange={changePage}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    containerClassName={"pagination"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    activeClassName={"active"}
                  />
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </TRListingContext.Provider>
    </>
  );
}

export default TRListing;
