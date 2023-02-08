import React, { useContext, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { NBListingContext } from "../../../helper/context/Context";

function CMPModalConfirmation(props) {
  const functionProps = props.functionProps;

  const {
    isDeleteData,
    setIsDeleteData,
    isResetPassword,
    setIsResetPassword,
    idSelected,
    setIdSelected,
  } = useContext(NBListingContext);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsDeleteData(false);
    setIsResetPassword(false);
  };

  useEffect(() => {
    checkFormStatus();
  }, [isDeleteData, isResetPassword]);

  const checkFormStatus = () => {
    if (isDeleteData) {
      setShow(true);
    }
    if (isResetPassword) {
      setShow(true);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure want to {props.role} this data with id {idSelected} ?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              functionProps(idSelected);
            }}
          >
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CMPModalConfirmation;
