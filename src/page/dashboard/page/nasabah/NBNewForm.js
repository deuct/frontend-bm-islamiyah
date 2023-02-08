import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import "./style/NBNewForm.css";
import NBFormAdd from "./component/NBFormAdd";
import NBFormEdit from "./component/NBFormEdit";
import CMPBreadCrumb from "../../component/CMPBreadCrumb";
// import NBMobileAdd from "./component/NBMobileAdd";
// import NBMobileEdit from "./component/NBMobileEdit";
import NBWebUserAdd from "./component/NBWebUserAdd";

function NBNewForm(props) {
  const axiosInstance = props.axiosInstance;
  const configAxios = props.configAxios;
  const axiosJWT = props.axiosJWT;

  let breadCrumbData;

  if (props.role === "Add Nasabah") {
    breadCrumbData = ["Nasabah", "Add Nasabah"];
  } else if (props.role === "Edit Nasabah") {
    breadCrumbData = ["Nasabah", "Edit Nasabah"];
  } else if (props.role === "Add Web User") {
    breadCrumbData = ["Nasabah", "Add Web User"];
  }
  // else if (props.role === "Add Mobile User") {
  //   breadCrumbData = ["Nasabah", "Mobile User", "Add Mobile User"];
  // } else if (props.role === "Edit Mobile User") {
  //   breadCrumbData = ["Nasabah", "Mobile User", "Edit Mobile User"];
  // }
  /* props.role === "Add Mobile User" ? (
              <NBMobileAdd
                axiosInstance={axiosInstance}
                configAxios={configAxios}
                axiosJWT={axiosJWT}
              />
            ) : props.role === "Edit Mobile User" ? (
              <NBMobileEdit
                axiosInstance={axiosInstance}
                configAxios={configAxios}
                axiosJWT={axiosJWT}
              />
            ) */

  return (
    <>
      <CMPBreadCrumb breadCrumbData={breadCrumbData} />
      <Row className="my-4 justify-content-center">
        <Col xs={12} md={12} sm={12} className="nasabah-title">
          <Row>
            <Col>
              <h1>{props.role}</h1>
              <hr />
            </Col>
          </Row>
          <Row className="justify-content-center mt-2 mb-5">
            {props.role === "Add Nasabah" ? (
              <NBFormAdd
                axiosInstance={axiosInstance}
                configAxios={configAxios}
                axiosJWT={axiosJWT}
              />
            ) : props.role === "Edit Nasabah" ? (
              <NBFormEdit
                axiosInstance={axiosInstance}
                configAxios={configAxios}
                axiosJWT={axiosJWT}
              />
            ) : props.role === "Add Web User" ? (
              <NBWebUserAdd
                axiosInstance={axiosInstance}
                configAxios={configAxios}
                axiosJWT={axiosJWT}
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

export default NBNewForm;
