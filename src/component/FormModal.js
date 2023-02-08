import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function FormModal(props) {
  const isSuccess = props.isSuccess;

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    checkFormStatus();
  }, [isSuccess]);

  const checkFormStatus = () => {
    if (isSuccess === true) {
      setShow(true);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Notification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Successfully {props.action} {props.formName} data
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FormModal;
