import React, { useEffect } from "react";
import "./style/LGFirst.css";
import { Row, Col, Form, Button } from "react-bootstrap";
import { useFirstLogin } from "./function/useLGFirst";
import configAxios from "../../config/ConfigAxios";
import { Link } from "react-router-dom";

function LGFirst(props) {
  const {
    changePassword,
    oldPassword,
    setOldPassword,
    secondPassword,
    setSecondPassword,
    newPassword,
    setNewPassword,
  } = useFirstLogin(configAxios);

  return (
    <>
      <div id="first-login">
        <div id="first-login-body">
          <h1>Welcome new user</h1>
          <p>Please change your password first.</p>
          <Form className="mt-4 mb-3" onSubmit={changePassword}>
            <Row className="d-flex mb-3">
              <Col className="text-right" xs={4} md={4} sm={4}>
                <Form.Label>Old password : </Form.Label>
              </Col>
              <Col xs={6} md={6} sm={6}>
                <Form.Control
                  type="password"
                  defaultValue={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                <Form.Text className="text-muted text-left">
                  Fill with : smkislamiyah
                </Form.Text>
              </Col>
            </Row>
            <Row className="d-flex mb-2">
              <Col className="text-right" xs={4} md={4} sm={4}>
                <Form.Label>New password : </Form.Label>
              </Col>
              <Col xs={6} md={6} sm={6}>
                <Form.Control
                  type="password"
                  defaultValue={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="d-flex mb-2">
              <Col className="text-right" xs={4} md={4} sm={4}>
                <Form.Label>Re-password : </Form.Label>
              </Col>
              <Col xs={6} md={6} sm={6}>
                <Form.Control
                  type="password"
                  defaultValue={secondPassword}
                  onChange={(e) => setSecondPassword(e.target.value)}
                />
              </Col>
            </Row>
            <Button type="submit" variant="primary" className="mt-4">
              Submit
            </Button>
          </Form>
          <Link to="/dashboard">No thanks. I will change it later.</Link>
        </div>
      </div>
    </>
  );
}

export default LGFirst;
