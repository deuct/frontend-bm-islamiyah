import React, { useState, useEffect, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Row, Col } from "react-bootstrap";
import { Pembilang } from "../../../function/Terbilang";
import { TRListingContext } from "../../../helper/context/Context";
import "./style/CMPModalViewData.css";

function CMPModalViewData(props) {
  const { isViewData, setIsViewData, idSelected, setIdSelected } =
    useContext(TRListingContext);

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsViewData(false);
    setIdSelected("");
    setArrViewData([]);
  };

  useEffect(() => {
    checkModal();
  }, [isViewData]);

  const checkModal = () => {
    if (isViewData === true) {
      setShow(true);
    }
  };

  const functionProps = props.functionProps;
  const labelForm = props.labelForm;

  let viewData = props.viewData;

  const [arrViewData, setArrViewData] = useState([]);

  useEffect(() => {
    fillData();
  }, [viewData]);

  const fillData = () => {
    for (let x in viewData) {
      // console.log(x + " : " + viewData[x]);
      setArrViewData((prev) => [...prev, viewData[x]]);
    }
  };

  const [terbilang, setTerbilang] = useState("");

  useEffect(() => {
    if (props.formName === "Transaksi") {
      convertTerbilang();
    }
  }, [arrViewData]);

  const convertTerbilang = () => {
    let hasilTerbilang = Pembilang(arrViewData[5]);
    hasilTerbilang = hasilTerbilang.replace(/\s\s+/g, " ").trim();

    if (arrViewData.length === 6) {
      setTerbilang(hasilTerbilang);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} dialogClassName="custom-modal">
        <Modal.Header className="header-viewdata">
          <Modal.Title>View Details of {props.formName}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="body-viewdata">
          {labelForm && arrViewData.length > 0 ? (
            labelForm.map((label, index) => {
              return (
                <>
                  <Form.Group className="mb-2" key={label}>
                    <Row>
                      <Col xs={4} md={4} lg={4} className="label-viewdata">
                        <Form.Label>{label}</Form.Label>
                      </Col>
                      :
                      <Col xs={6} md={6} lg={6}>
                        {props.formName === "Transaksi" && index === 6 ? (
                          <>
                            <Form.Control
                              type="text"
                              readOnly
                              placeholder={terbilang + " Rupiah"}
                            />
                          </>
                        ) : (
                          <Form.Control
                            type="text"
                            readOnly
                            placeholder={arrViewData[index]}
                          />
                        )}
                      </Col>
                    </Row>
                  </Form.Group>
                </>
              );
            })
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default CMPModalViewData;
