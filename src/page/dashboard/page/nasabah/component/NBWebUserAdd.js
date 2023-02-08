import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import FormModal from "../../../../../component/FormModal";
import { useNBWebUserAdd } from "../function/useNBWebUserAdd";
import "../style/NBMobile.css";

function NBWebUserAdd(props) {
  const configAxios = props.configAxios;
  const axiosJWT = props.axiosJWT;

  const {
    nomorRekening,
    setNomorRekening,
    namaNasabah,
    setNamaNasabah,
    kelas,
    setKelas,
    jurusan,
    setJurusan,
    username,
    setUsername,
    msg,
    setMsg,
    isSuccess,
    submitWebUser,
  } = useNBWebUserAdd(configAxios, axiosJWT);

  // const {
  //   isSuccess,
  //   submitMobileUser,
  //   setPassword,
  //   setSecondPassword,
  //   userId,
  // } = useNBSubmitMobileUser(axiosJWT, configAxios, norek);

  return (
    <>
      <FormModal isSuccess={isSuccess} />
      <Col xs={12} md={8} sm={8}>
        <Form onSubmit={submitWebUser}>
          <Form.Group className="mt-2">
            <Row className="justify-content-center">
              <Col xs={3} md={3} lg={3} className="text-right">
                <Form.Label>Nomor Rekening : </Form.Label>
              </Col>
              <Col xs={6} md={6} lg={6}>
                <Form.Control
                  type="text"
                  defaultValue={nomorRekening}
                  onChange={(e) => {
                    setNomorRekening(e.target.value);
                    setMsg("");
                    setNamaNasabah("");
                    setKelas("");
                    setJurusan("");
                  }}
                />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mt-2">
            <Row className="justify-content-center">
              <Col xs={3} md={3} lg={3} className="text-right">
                <Form.Label>Nama Nasabah : </Form.Label>
              </Col>
              <Col xs={6} md={6} lg={6}>
                <Form.Control type="text" defaultValue={namaNasabah} readOnly />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mt-2">
            <Row className="justify-content-center">
              <Col xs={3} md={3} lg={3} className="text-right">
                <Form.Label>Kelas : </Form.Label>
              </Col>
              <Col xs={6} md={6} lg={6}>
                <Form.Control type="text" defaultValue={kelas} readOnly />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mt-2">
            <Row className="justify-content-center">
              <Col xs={3} md={3} lg={3} className="text-right">
                <Form.Label>Jurusan : </Form.Label>
              </Col>
              <Col xs={6} md={6} lg={6}>
                <Form.Control type="text" defaultValue={jurusan} readOnly />
              </Col>
            </Row>
          </Form.Group>
          <Form.Group className="mt-2">
            <Row className="justify-content-center">
              <Col xs={3} md={3} lg={3} className="text-right">
                <Form.Label>Username : </Form.Label>
              </Col>
              <Col xs={6} md={6} lg={6}>
                <Form.Control
                  type="text"
                  defaultValue={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Col>
            </Row>
          </Form.Group>
          <Row className="mt-1 justify-content-center">
            <Col xs={12} md={12} lg={12} className="text-center">
              {msg ? <span className="text-danger">{msg}</span> : <span></span>}
            </Col>
          </Row>
          <Row className="justify-content-center mt-3 mb-4">
            <Col xs={12} md={6} lg={6} className="text-center">
              <Button className="btn-nsb" type="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        <hr />
      </Col>
    </>
  );
}

export default NBWebUserAdd;
