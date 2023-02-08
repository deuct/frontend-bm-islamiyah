import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import FormModal from "../../../../../component/FormModal";
import "../style/NBMobile.css";
import {
  useNBGetNasabah,
  useNBSubmitMobileUser,
} from "../function/useNBMobileAdd";

function NBMobileAdd(props) {
  const configAxios = props.configAxios;
  const axiosJWT = props.axiosJWT;

  const { norek, setNorek, nasabah } = useNBGetNasabah(axiosJWT, configAxios);
  const {
    isSuccess,
    submitMobileUser,
    setPassword,
    setSecondPassword,
    userId,
  } = useNBSubmitMobileUser(axiosJWT, configAxios, norek);

  return (
    <>
      <FormModal isSuccess={isSuccess} />
      <Col xs={11} md={11} sm={11}>
        <Form onSubmit={submitMobileUser}>
          <Row className="justify-content-center">
            <Col xs={6} md={6} lg={6}>
              <Form.Group className="mt-2" controlId="">
                <Row>
                  <Col xs={3} md={3} lg={3}>
                    <Form.Label>User ID</Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control type="text" defaultValue={userId} readOnly />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="">
                <Row>
                  <Col xs={3} md={3} lg={3}>
                    <Form.Label>Nomor Rekening </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      defaultValue=""
                      onChange={(e) => setNorek(e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2">
                <Row>
                  <Col xs={3} md={3} lg={3}>
                    <Form.Label>Nama Lengkap </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      value={
                        nasabah.length > 0
                          ? nasabah[0].full_name
                          : "(auto filled)"
                      }
                      readOnly
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2">
                <Row>
                  <Col xs={3} md={3} lg={3}>
                    <Form.Label>Kelas</Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      value={
                        nasabah.length > 0 ? nasabah[0].kelas : "(auto filled)"
                      }
                      readOnly
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2">
                <Row>
                  <Col xs={3} md={3} lg={3}>
                    <Form.Label>Jurusan</Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      value={
                        nasabah.length > 0
                          ? nasabah[0].jurusan
                          : "(auto filled)"
                      }
                      readOnly
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2">
                <Row>
                  <Col xs={3} md={3} lg={3}>
                    <Form.Label>Password</Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="password"
                      placeholder=""
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2">
                <Row>
                  <Col xs={3} md={3} lg={3}>
                    <Form.Label>Re - Password</Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="password"
                      onChange={(e) => setSecondPassword(e.target.value)}
                      placeholder=""
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2">
                <Row>
                  <Col xs={3} md={3} lg={3}>
                    <Form.Label>Nasabah Picture</Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control type="file" />
                  </Col>
                </Row>
              </Form.Group>
              <Row className="nasabah-mobile-img mt-2">
                <Col xs={3} md={3} lg={3}>
                  <p>Photo Preview</p>
                </Col>
                <Col xs={9} md={9} lg={9}>
                  <div id="mobile-img-box">Empty</div>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="justify-content-center text-center mt-4">
            <Col xs={3} md={3} lg={3}>
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

export default NBMobileAdd;
