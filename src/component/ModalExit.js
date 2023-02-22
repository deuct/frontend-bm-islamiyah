import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

function ModalExit(props) {
  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Logout Confirmation</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure want to logout ?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={props.Logout}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalExit;
