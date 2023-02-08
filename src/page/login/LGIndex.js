import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Col, Row, Button, Form } from "react-bootstrap";
import { BsFillPersonFill, BsLockFill, BsAward } from "react-icons/bs";
import "./style/LGIndex.css";
import BankBackground from "../../files/image/background/bg-bank.png";
import { useLogin } from "./function/useLogin";

function LGIndex(props) {
  const axiosInstance = props.axiosInstance;
  const configAxios = props.configAxios;

  const {
    Login,
    errMsg,
    userName,
    setUserName,
    password,
    setPassword,
    userRole,
    setUserRole,
  } = useLogin(axiosInstance, configAxios);

  return (
    <>
      <div id="background-login"></div>
      <div id="login-card">
        <Row className="justify-content-center align-items-center">
          <Col xs={12} md={6} lg={6}>
            <div id="title-left">
              <h1 className="title">Bank Mini </h1>
              <h1 className="title-second">SMK Islamiyah Ciputat</h1>
            </div>
            <img
              src={BankBackground}
              alt="background-login"
              className="login-card-img"
            />
          </Col>
          <Col xs={12} md={6} lg={6}>
            <h1 className="title">Sign In</h1>
            <Form id="login-form" onSubmit={Login}>
              <Row className="justify-content-center">
                <Col className="mb-3 d-flex justify-content-center">
                  <div className="icon-login">
                    <BsAward />
                  </div>
                  <Form.Group controlId="" className="input-lg">
                    <Form.Control
                      as="select"
                      className=" w-100 login-form"
                      defaultValue="0"
                      onChange={(e) => setUserRole(e.target.value)}
                    >
                      <option value="0" className="text-muted" disabled>
                        --- Select Your Role ---
                      </option>
                      <option value="nasabah">Nasabah</option>
                      <option value="teller">Teller</option>
                      <option value="admin">Admin</option>
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col className="d-flex mb-3 justify-content-center">
                  <div className="icon-login">
                    <BsFillPersonFill />
                  </div>
                  <Form.Group controlId="" className="input-lg">
                    <Form.Control
                      className="login-form"
                      type="text"
                      placeholder="Username"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row className="justify-content-center">
                <Col className="d-flex mb-3 justify-content-center">
                  <div className="icon-login">
                    <BsLockFill />
                  </div>
                  <Form.Group controlId="" className="input-lg">
                    <Form.Control
                      className="login-form"
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <p style={{ color: "rgb(179, 33, 33)" }}>{errMsg}</p>
              <Button className="btn-login" type="submit">
                Login
              </Button>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default LGIndex;
