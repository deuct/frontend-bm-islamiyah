import React from "react";
import { Row, Col } from "react-bootstrap";
import "./style/STIndex.css";
import CMPBreadCrumb from "../../component/CMPBreadCrumb";
import STPage from "./STPage";
import STMenu from "./STMenu";

function STIndex(props) {
  const axiosJWT = props.axiosJWT;
  const configAxios = props.configAxios;

  return (
    <>
      <Row className="justify-content-center my-3" id="setting-page-body">
        <Col xs={10} md={10} sm={12}>
          {props.role === "menu" ? (
            <STMenu />
          ) : props.role === "page" ? (
            <STPage configAxios={configAxios} axiosJWT={axiosJWT} />
          ) : (
            <p>Nothing to see here.</p>
          )}
        </Col>
      </Row>
    </>
  );
}

export default STIndex;
