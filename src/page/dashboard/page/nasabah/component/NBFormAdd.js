import React, { useEffect, useState } from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import FormModal from "../../../../../component/FormModal";
import { useGetJK } from "../../../../../function/dash/useJenisKelamin";
import { useAllJurusan } from "../../../../../function/dash/useJurusan";
import { useGetNorek } from "../../../../../function/dash/useNasabah";
import { useCurrentTeller } from "../../../../../function/dash/useTeller";
import { DateToday } from "../../../../../function/DateToday";
import {
  useNBFormAdd,
  useNBFormValue,
  useNBNorek,
} from "../function/useNBFormAdd";

function NBFormAdd(props) {
  const configAxios = props.configAxios;
  const axiosJWT = props.axiosJWT;

  const {
    fullName,
    setFullName,
    kelas,
    setKelas,
    nis,
    setNis,
    gender,
    setGender,
    tglLahir,
    setTglLahir,
    alamat,
    setAlamat,
    noTelp,
    setNoTelp,
    email,
    setEmail,
    tglDaftar,
    setTglDaftar,
    ayah,
    setAyah,
    ibu,
    setIbu,
    pengesah,
    setPengesah,
    jurusan,
    setJurusan,
    isWebUser,
    setIsWebUser,
    wbUserName,
    setWbUserName,
  } = useNBFormValue();

  const { dateToday } = DateToday();
  const { jurusanData } = useAllJurusan(axiosJWT, configAxios);
  const { currentTeller } = useCurrentTeller();
  const { noRekening } = useGetNorek(axiosJWT, configAxios);
  const { jkData } = useGetJK(axiosJWT, configAxios);

  const { submitNasabah, isSuccess, valueForm, msg, setMsg } = useNBFormAdd(
    axiosJWT,
    configAxios,
    setTglDaftar,
    dateToday,
    noRekening,
    fullName,
    kelas,
    nis,
    gender,
    tglLahir,
    alamat,
    noTelp,
    email,
    tglDaftar,
    ayah,
    ibu,
    currentTeller,
    jurusan,
    isWebUser,
    wbUserName
  );

  const handleChangeWebUser = () => {
    setIsWebUser(!isWebUser);
  };

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
                      defaultValue={noRekening}
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
                      defaultValue={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        setMsg("");
                      }}
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
                      onChange={(e) => {
                        setKelas(e.target.value);
                        setMsg("");
                      }}
                    >
                      <option value="0" selected disabled>
                        --- Select Kelas ---
                      </option>
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
                    <Form.Control
                      as="select"
                      onChange={(e) => {
                        setJurusan(e.target.value);
                        setMsg("");
                      }}
                    >
                      <option value="0" disabled selected>
                        --- Select Jurusan ---
                      </option>
                      {jurusanData.map((jr) => (
                        <option key={jr.id} value={jr.id}>
                          {jr.nama_jurusan}
                        </option>
                      ))}
                    </Form.Control>
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
                      defaultValue={nis}
                      onChange={(e) => {
                        setNis(e.target.value);
                        setMsg("");
                      }}
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
                        onChange={(e) => {
                          setGender(e.target.value);
                          setMsg("");
                        }}
                      >
                        <option value="0" disabled selected>
                          --- Select JK ---
                        </option>
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
                      defaultValue={tglLahir}
                      onChange={(e) => {
                        setTglLahir(e.target.value);
                        setMsg("");
                      }}
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
                      defaultValue={alamat}
                      onChange={(e) => {
                        setAlamat(e.target.value);
                        setMsg("");
                      }}
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
                      defaultValue={noTelp}
                      onChange={(e) => {
                        setNoTelp(e.target.value);
                        setMsg("");
                      }}
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
                      defaultValue={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setMsg("");
                      }}
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
                      onChange={(e) => {
                        setTglDaftar(e.target.value);
                        setMsg("");
                      }}
                      placeholder=""
                      readOnly
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
                      defaultValue={ayah}
                      onChange={(e) => {
                        setAyah(e.target.value);
                        setMsg("");
                      }}
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
                      defaultValue={ibu}
                      onChange={(e) => {
                        setIbu(e.target.value);
                        setMsg("");
                      }}
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
                    <Form.Control type="text" value={currentTeller} readOnly />
                  </Col>
                </Row>
              </Form.Group>
              <Form.Group className="mt-2">
                <Row>
                  <Col xs={3} md={3} lg={3}>
                    <Form.Label>Include Web User </Form.Label>
                  </Col>
                  <Col xs={1} md={1} lg={1}>
                    <Form.Check
                      type="checkbox"
                      defaultValue={isWebUser}
                      onChange={(e) => {
                        handleChangeWebUser();
                        setMsg("");
                      }}
                    />
                  </Col>
                </Row>
              </Form.Group>
              {isWebUser ? (
                <Form.Group className="mt-2" controlId="formBasicEmail">
                  <Row>
                    <Col xs={2} md={2} lg={2}>
                      <Form.Label>Username</Form.Label>
                    </Col>
                    <Col xs={9} md={9} lg={9}>
                      <Form.Control
                        type="text"
                        defaultValue={wbUserName}
                        onChange={(e) => {
                          setWbUserName(e.target.value);
                          setMsg("");
                        }}
                        placeholder=""
                      />
                    </Col>
                  </Row>
                </Form.Group>
              ) : (
                ""
              )}
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
        {msg ? <div className="text-danger text-center">{msg}</div> : ""}
        <hr />
      </Col>
    </>
  );
}

export default NBFormAdd;
