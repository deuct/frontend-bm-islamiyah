import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import FormModal from "../../../../../component/FormModal";
import { useGetJK } from "../../../../../function/dash/useJenisKelamin";
import { useAllJurusan } from "../../../../../function/dash/useJurusan";
import { useNBFormEdit, useNBNorek } from "../function/useNBFormAdd";

function NBFormEdit(props) {
  const configAxios = props.configAxios;
  const axiosJWT = props.axiosJWT;

  const { submitNasabah, isSuccess, valueForm } = useNBFormEdit(
    axiosJWT,
    configAxios
  );

  const { jurusanData } = useAllJurusan(axiosJWT, configAxios);
  const { jkData } = useGetJK(axiosJWT, configAxios);

  console.log(valueForm);

  return (
    <>
      <FormModal isSuccess={isSuccess} />
      <Col xs={11} md={11} sm={11}>
        <Form onSubmit={submitNasabah}>
          <Row>
            <Col xs={6} md={6} lg={6}>
              <Form.Group className="mt-2" controlId="">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Nomor Rekening </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      defaultValue={valueForm.noRekening}
                      readOnly
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Nama Lengkap </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      defaultValue={valueForm.namaLengkap}
                      onChange={(e) => (valueForm.namaLengkap = e.target.value)}
                      placeholder=""
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Kelas </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      as="select"
                      defaultValue={valueForm.kelas}
                      onChange={(e) => (valueForm.kelas = e.target.value)}
                    >
                      <option value="X">X</option>
                      <option value="XI">XI</option>
                      <option value="XII">XII</option>
                    </Form.Control>
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Jurusan </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    {jurusanData.length > 0 ? (
                      <Form.Control
                        as="select"
                        defaultValue={valueForm.kodeJurusan}
                        onChange={(e) =>
                          (valueForm.kodeJurusan = e.target.value)
                        }
                        placeholder=""
                      >
                        {jurusanData.map((jr) => (
                          <option value={jr.id}>{jr.nama_jurusan}</option>
                        ))}
                      </Form.Control>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>NIS/KTP </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      defaultValue={valueForm.nis}
                      onChange={(e) => (valueForm.nis = e.target.value)}
                      placeholder=""
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Jenis Kelamin </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    {jkData.length > 0 ? (
                      <Form.Control
                        as="select"
                        defaultValue={valueForm.kodeJK}
                        onChange={(e) => (valueForm.kodeJK = e.target.value)}
                      >
                        {jkData.map((jk) => (
                          <option value={jk.id}>{jk.jenis_kelamin}</option>
                        ))}
                      </Form.Control>
                    ) : (
                      ""
                    )}
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Tanggal Lahir </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="date"
                      defaultValue={valueForm.tglLahir}
                      onChange={(e) => (valueForm.tglLahir = e.target.value)}
                      placeholder=""
                    />
                  </Col>
                </Row>
              </Form.Group>
            </Col>
            <Col xs={6} md={6} lg={6}>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Alamat </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      as="textarea"
                      defaultValue={valueForm.alamat}
                      onChange={(e) => (valueForm.alamat = e.target.value)}
                      placeholder=""
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>No. Telp </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      defaultValue={valueForm.noTelp}
                      onChange={(e) => (valueForm.noTelp = e.target.value)}
                      placeholder=""
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Email </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      placeholder=""
                      defaultValue={valueForm.email}
                      onChange={(e) => (valueForm.email = e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Tgl Pendaftaran </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="date"
                      defaultValue={valueForm.tglDaftar}
                      readOnly
                      onChange={(e) => (valueForm.tglDaftar = e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Nama Ayah </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      placeholder=""
                      defaultValue={valueForm.ayah}
                      onChange={(e) => (valueForm.ayah = e.target.value)}
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Nama Ibu </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      defaultValue={valueForm.ibu}
                      onChange={(e) => (valueForm.ibu = e.target.value)}
                      placeholder=""
                    />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2" controlId="formBasicEmail">
                <Row>
                  <Col xs={2} md={2} lg={2}>
                    <Form.Label>Nama Pengesah </Form.Label>
                  </Col>
                  <Col xs={9} md={9} lg={9}>
                    <Form.Control
                      type="text"
                      defaultValue={valueForm.pengesah}
                      onChange={(e) => (valueForm.pengesah = e.target.value)}
                      readOnly
                    />
                  </Col>
                </Row>
              </Form.Group>
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

export default NBFormEdit;
