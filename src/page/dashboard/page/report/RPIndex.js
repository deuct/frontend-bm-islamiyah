import React from "react";
import { Col, Row, Form, Button } from "react-bootstrap";
import RPFormRED from "./component/RPFormRED";
import RPFormJournal from "./component/RPFormJournal";
import "./style/RPIndex.css";
import CMPBreadCrumb from "../../component/CMPBreadCrumb";

function RPIndex(props) {
  let breadCrumbData;

  if (props.aksi === "red") {
    breadCrumbData = ["Report", "Rekap End of Day"];
  } else if (props.aksi === "journal") {
    breadCrumbData = ["Report", "Journal"];
  }

  return (
    <>
      <CMPBreadCrumb breadCrumbData={breadCrumbData} />
      <Row className="my-4 justify-content-center">
        <Col xs={12} md={12} sm={12} className="report-title">
          <Row>
            <Col>
              <h1>{props.name} Show</h1>
              <hr />
            </Col>
          </Row>
          <Row className="justify-content-center mt-2 mb-5">
            {props.aksi === "red" ? (
              <RPFormRED />
            ) : props.aksi === "journal" ? (
              <RPFormJournal />
            ) : (
              <p>Empty</p>
            )}
          </Row>
        </Col>
      </Row>
    </>
  );
}

export default RPIndex;
