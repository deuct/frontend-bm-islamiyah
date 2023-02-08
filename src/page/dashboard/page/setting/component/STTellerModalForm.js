import React, { isValidElement, useEffect, useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import FormModal from "../../../../../component/FormModal";
import { useSTTeller, useSTTellerAdd } from "../function/useSTTeller";

function STTellerModalForm(props) {
  const axiosJWT = props.axiosJWT;
  const configAxios = props.configAxios;
  const role = props.role;
  const idSelected = props.idSelected;
  const show = props.show;

  const { idTeller } = useSTTeller(axiosJWT, configAxios);
  const { valueForm, addTeller, updateTeller, isSuccess, msg, setMsg } =
    useSTTellerAdd(axiosJWT, configAxios, idTeller);

  const [dataTeller, setDataTeller] = useState([]);

  useEffect(() => {
    if (show === true) {
      getData();
    } else {
      setDataTeller([]);
    }
  }, [role, show]);

  const getData = async () => {
    if (role === "Edit") {
      try {
        const response = await axiosJWT.get(
          `/teller/one/${idSelected}`,
          configAxios
        );

        if (response) {
          setDataTeller(response.data[0]);
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
            <h1 className="tellermodal-intro-h1">Teller Form</h1>
            <p className="tellermodal-intro-p">
              Edit or add your teller data through this form.
            </p>
          </Modal.Title>
        </Modal.Header>
        <Form
          className="my-3"
          onSubmit={role === "Add" ? addTeller : updateTeller}
        >
          <Modal.Body>
            {dataTeller ? (
              <>
                <Form.Group className="mb-2">
                  <Row>
                    <Col xs={4} md={4} sm={12} className="text-right">
                      <Form.Label>Teller ID : </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={12}>
                      <Form.Control
                        type="text"
                        readOnly
                        name="idTeller"
                        value={
                          role === "Add"
                            ? idTeller
                            : role === "Edit"
                            ? dataTeller.username
                            : ""
                        }
                      ></Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Row>
                    <Col xs={4} md={4} sm={12} className="text-right">
                      <Form.Label>Name : </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={12}>
                      <Form.Control
                        type="text"
                        onChange={(e) => (valueForm.fullName = e.target.value)}
                        name="fullName"
                        defaultValue={
                          role === "Add"
                            ? ""
                            : role === "Edit"
                            ? dataTeller.full_name
                            : ""
                        }
                      ></Form.Control>
                    </Col>
                  </Row>
                </Form.Group>
                <Form.Group className="mb-2">
                  <Row>
                    <Col xs={4} md={4} sm={12} className="text-right">
                      <Form.Label>NUPTK : </Form.Label>
                    </Col>
                    <Col xs={6} md={6} sm={12}>
                      <Form.Control
                        type="text"
                        name="nuptk"
                        defaultValue={
                          role === "Add"
                            ? valueForm.nuptk
                            : role === "Edit"
                            ? dataTeller.nuptk
                            : ""
                        }
                        onChange={(e) => (valueForm.nuptk = e.target.value)}
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

export default STTellerModalForm;
