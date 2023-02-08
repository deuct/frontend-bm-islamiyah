import React, { useState, useEffect } from "react";
import { Row, Col, Table, Form, Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import ReactPaginate from "react-paginate";
import "./style/NBListing.css";
import CMPBreadCrumb from "../../component/CMPBreadCrumb";
import NBListingNasabah from "./component/NBListingNasabah";
// import NBListingMobile from "./component/NBListingMobile";
import { useNBListing } from "./function/useNBListing";
import CMPModalConfirmation from "../../component/CMPModalConfirmation";
import { NBListingContext } from "../../../../helper/context/Context";
import FormModal from "../../../../component/FormModal";
import NBListingWebUser from "./component/NBListingWebUser";

function NBListing(props) {
  const configAxios = props.configAxios;
  const axiosJWT = props.axiosJWT;

  let breadCrumbData;

  const {
    nasabah,
    webUser,
    // mobileUser,
    changePage,
    msg,
    totalPages,
    searchData,
    query,
    setQuery,
    deleteData,
    resetPassword,
    isDeleteData,
    setIsDeleteData,
    isResetPassword,
    setIsResetPassword,
    isSuccess,
    setIsSuccess,
    idSelected,
    setIdSelected,
  } = useNBListing(axiosJWT, configAxios, props.role);

  if (props.role === "Nasabah") {
    breadCrumbData = ["Nasabah", "List Nasabah"];
  } else if (props.role === "Web User") {
    breadCrumbData = ["Nasabah", "List Web User"];
  }
  // else if (props.role === "Mobile User") {
  //   breadCrumbData = ["Nasabah", "Mobile User"];
  // }

  return (
    <>
      <CMPBreadCrumb breadCrumbData={breadCrumbData} />

      <NBListingContext.Provider
        value={{
          isDeleteData,
          setIsDeleteData,
          isResetPassword,
          setIsResetPassword,
          idSelected,
          setIdSelected,
          isSuccess,
          setIsSuccess,
        }}
      >
        {isDeleteData ? (
          <>
            <FormModal
              isSuccess={isSuccess}
              action="delete"
              formName="Nasabah"
            />
            <CMPModalConfirmation functionProps={deleteData} role="delete" />
          </>
        ) : isResetPassword ? (
          <>
            <FormModal
              isSuccess={isSuccess}
              action="reset password"
              formName="Nasabah"
            />
            <CMPModalConfirmation
              functionProps={resetPassword}
              role="reset password"
            />
          </>
        ) : (
          ""
        )}

        <Row className="my-4 justify-content-center">
          <Col xs={12} md={12} sm={12} className="nasabah-title">
            <Row>
              <Col>
                <h1>{props.role} Listing</h1>
                <hr />
              </Col>
            </Row>
            <Row className="justify-content-center mt-2 mb-5" id="nasabah-body">
              <Col xs={12}>
                <Form
                  className="search-nasabah-form mb-2"
                  onSubmit={searchData}
                >
                  <Form.Group className="" controlId="formBasicEmail">
                    <Form.Control
                      type="text"
                      placeholder="Search..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </Form.Group>
                  <Button className="btn-search-nasabah" type="submit">
                    <BsSearch />
                  </Button>
                </Form>
                {props.role === "Nasabah" && nasabah ? (
                  <NBListingNasabah nasabah={nasabah} />
                ) : props.role === "Web User" && webUser ? (
                  <NBListingWebUser webUser={webUser} />
                ) : (
                  <p>Empty</p>
                )}
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
      </NBListingContext.Provider>
    </>
  );
}

export default NBListing;
