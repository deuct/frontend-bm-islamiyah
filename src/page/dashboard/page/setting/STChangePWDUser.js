import React from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import STChangePassword from "./page/profile/STChangePassword";
import "./style/STChangePWDUser.css";

function STChangePWDUser(props) {
  const axiosJWT = props.axiosJWT;
  const configAxios = props.configAxios;

  const firstNavbar = document.getElementById("first-navbar");
  const secondNavbar = document.getElementById("second-navbar");

  if (firstNavbar && secondNavbar) {
    firstNavbar.style.display = "none";
    secondNavbar.style.display = "none";
  }

  return (
    <>
      <div id="wrapper-fullpage">
        <Row className="justify-content-center">
          <Col className="text-center" xs={12} md={6} lg={6}>
            <h1>Change Password</h1>
            <p>You can change your password here</p>
          </Col>
        </Row>
        <hr />
        <STChangePassword
          axiosJWT={axiosJWT}
          configAxios={configAxios}
          windowType="popup"
        />
      </div>
    </>
  );
}

export default STChangePWDUser;
