import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import FormModal from "../../../../../component/FormModal";
import { useSTJurusanAdd } from "../function/useSTJurusan";

function STJurusanModalForm(props) {
  const axiosJWT = props.axiosJWT;
  const configAxios = props.configAxios;
  const role = props.role;
  const idSelected = props.idSelected;
  const show = props.show;

  const { valueForm, addJurusan, updateJurusan, isSuccess, msg, setMsg } =
    useSTJurusanAdd(axiosJWT, configAxios);

  const [dataJurusan, setDataJurusan] = useState([]);

  useEffect(() => {
    if (show === true) {
      getData();
    } else {
      setDataJurusan([]);
    }
  }, [role, show]);

  const getData = async () => {
    if (role === "Edit") {
      try {
        const response = await axiosJWT.get(
          `/jurusan/one/${idSelected}`,
          configAxios
        );

        if (response) {
          setDataJurusan(response.data[0]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <FormModal isSuccess={isSuccess} />

      <Modal
        show={show}
        onHide={props.handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title className="mx-auto text-center">
            <h1 className="tellermodal-intro-h1">Jurusan Form</h1>
            <p className="tellermodal-intro-p">
              Edit or add your jurusan data through this form.
            </p>
          </Modal.Title>
        </Modal.Header>
        <Form
          className="my-3"
          onSubmit={role === "Add" ? addJurusan : updateJurusan}
        >
          <Modal.Body>
            {dataJurusan ? (
              <>
                {role === "Add" ? (
                  ""
                ) : (
                  <>
                    <Form.Group className="mb-2">
                      <Row>
                        <Col xs={4} md={4} sm={12} className="text-right">
                          <Form.Label>Jurusan ID : </Form.Label>
                        </Col>
                        <Col xs={6} md={6} sm={12}>
                          <Form.Control
                            type="text"
                            readOnly
                            name="idJurusan"
                            value={dataJurusan.id}
                          ></Form.Control>
                        </Col>
                      </Row>
                    </Form.Group>
                  </>
                )}
                <Form.Group className="mb-2">
                  <Row>
                    <Col xs={4} md={4} sm={12} className="text-right">
                      <Form.Label>Nama Jurusan : </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={12}>
                      <Form.Control
                        type="text"
                        onChange={(e) =>
                          (valueForm.namaJurusan = e.target.value)
                        }
                        name="namaJurusan"
                        defaultValue={
                          role === "Add"
                            ? ""
                            : role === "Edit"
                            ? dataJurusan.nama_jurusan
                            : ""
                        }
                      ></Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Row>
                    <Col xs={4} md={4} sm={12} className="text-right">
                      <Form.Label>Deskripsi : </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={12}>
                      <Form.Control
                        as="textarea"
                        name="deskripsi"
                        defaultValue={
                          role === "Add"
                            ? ""
                            : role === "Edit"
                            ? dataJurusan.deskripsi
                            : ""
                        }
                        onChange={(e) =>
                          (valueForm.deskripsiJurusan = e.target.value)
                        }
                        placeholder=""
                      ></Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
              </>
            ) : (
              "Loading..."
            )}
            {msg ? (
              <div className="text-center text-danger d-block">{msg}</div>
            ) : (
              ""
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.handleClose}>
              Close
            </Button>
            <Button variant="info" type="submit">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

export default STJurusanModalForm;
