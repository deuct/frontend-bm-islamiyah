import React, { useState } from "react";
import { Row, Col, Table, Button, Form } from "react-bootstrap";
import {
  BsPencilSquare,
  BsTrashFill,
  BsSearch,
  BsPlusLg,
} from "react-icons/bs";
import "../../style/STTeller.css";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  useSTJurusanListing,
  useSTJurusanAdd,
} from "../../function/useSTJurusan";
import FormModal from "../../../../../../component/FormModal";
import STJurusanModalForm from "../../component/STJurusanModalForm";

function STJurusan(props) {
  const axiosJWT = props.axiosJWT;
  const configAxios = props.configAxios;

  const [show, setShow] = useState(false);

  const [role, setRole] = useState("");
  const [idSelected, setIdSelected] = useState("");

  const handleClose = () => {
    setShow(false);
    setIdSelected("");
    setRole("");
  };

  const handleShow = () => {
    setShow(true);
  };

  const { fetchMore, searchData, query, setQuery, jurusan, hasMore } =
    useSTJurusanListing(axiosJWT, configAxios);

  const { deleteJurusan, isSuccess, setIsSuccess } = useSTJurusanAdd(
    axiosJWT,
    configAxios
  );

  return (
    <>
      <STJurusanModalForm
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        axiosJWT={axiosJWT}
        configAxios={configAxios}
        role={role}
        idSelected={idSelected}
      />

      <FormModal isSuccess={isSuccess} />

      <Row className="justify-content-center">
        <Col xs={6} md={6} sm={12}>
          <div className="search-teller">
            <Form onSubmit={searchData}>
              <Form.Group className="form-st">
                <Form.Control
                  type="text"
                  placeholder="Search..."
                  className="form-search-teller"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                  variant="secondary"
                  type="submit"
                  className="bt-search-teller"
                >
                  <BsSearch size={15} />
                </Button>
              </Form.Group>
            </Form>
          </div>
        </Col>
        <Col xs={6} md={6} sm={12} className="new-teller-btn">
          <Button
            className="btn-newteller"
            variant="info"
            onClick={(e) => {
              setRole("Add");
              handleShow();
            }}
          >
            <BsPlusLg /> New Jurusan
          </Button>
        </Col>
      </Row>
      <div id="test">
        <Row className="justify-content-center mt-4">
          <Col xs={12} md={12} sm={12}>
            <InfiniteScroll
              dataLength={jurusan.length}
              next={fetchMore}
              hasMore={hasMore}
              loader={<h5>Loading...</h5>}
              height={300}
              endMessage={<p>All data has ben loaded</p>}
            >
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Jurusan ID</th>
                    <th>Nama Jurusan</th>
                    <th>Deskripsi</th>
                    <th>Opsi</th>
                  </tr>
                </thead>
                <tbody id="teller-table-body">
                  {jurusan.map((jurusan, index) => (
                    <tr key={index}>
                      <td>
                        <Button variant="link" size={"sm"}>
                          {jurusan.id}
                        </Button>
                      </td>
                      <td>{jurusan.nama_jurusan}</td>
                      <td>{jurusan.deskripsi}</td>
                      <td>
                        <Button
                          variant="warning"
                          className="btn-teller"
                          onClick={(e) => {
                            setRole("Edit");
                            setIdSelected(jurusan.id);
                            handleShow();
                          }}
                        >
                          <BsPencilSquare />
                        </Button>
                        <Button
                          variant="danger"
                          className="btn-teller"
                          onClick={(e) => {
                            deleteJurusan(jurusan.id);
                          }}
                        >
                          <BsTrashFill />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </InfiniteScroll>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default STJurusan;
