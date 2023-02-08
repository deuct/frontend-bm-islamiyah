import React from "react";
import { Row, Col } from "react-bootstrap";
import "./style/HMWebUser.css";

function HMWebUser(props) {
  const name = props.name;
  return (
    <Row className="justify-content-center mt-3">
      <Col xs={12} md={6} lg={6} className="text-center">
        <div id="welcome-title">
          <h1>
            Welcome, {name} <br /> to Bank Mini of SMK Islamiyah Ciputat
          </h1>
          <p>
            Here you can check your balance, see your histories transaction,
            etc.
          </p>
        </div>
      </Col>
    </Row>
  );
}

export default HMWebUser;
