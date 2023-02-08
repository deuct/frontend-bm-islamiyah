import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import CMPBreadCrumb from "../../component/CMPBreadCrumb";
import TRFormAdd from "./component/TRFormAdd";
import TRFormEdit from "./component/TRFormEdit";

function TRNewForm(props) {
  const configAxios = props.configAxios;
  const axiosInstance = props.axiosInstance;
  const axiosJWT = props.axiosJWT;

  const aksi = props.aksi;

  const formModal = props.formModal;

  let breadCrumbData;

  if (props.aksi === "Penarikan") {
    breadCrumbData = ["Transaction", "Penarikan"];
  } else if (props.aksi === "Setoran") {
    breadCrumbData = ["Transaction", "Setoran"];
  }

  return (
    <>
      <CMPBreadCrumb breadCrumbData={breadCrumbData} />
      <Row className="my-4 justify-content-center">
        <Col xs={12} md={12} sm={12} className="nasabah-title">
          <Row>
            <Col>
              <h1>Transaction {props.aksi}</h1>
              <hr />
            </Col>
          </Row>
          <Row className="justify-content-center mt-2 mb-5">
            {props.role === "Add" ? (
              <TRFormAdd
                axiosInstance={axiosInstance}
                configAxios={configAxios}
                axiosJWT={axiosJWT}
                formModal={formModal}
                aksi={aksi}
              />
            ) : props.role === "Edit" ? (
              <TRFormEdit
                axiosInstance={axiosInstance}
                configAxios={configAxios}
                axiosJWT={axiosJWT}
                formModal={formModal}
                aksi={aksi}
              />
            ) : (
              <p>Empty</p>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default TRNewForm;
