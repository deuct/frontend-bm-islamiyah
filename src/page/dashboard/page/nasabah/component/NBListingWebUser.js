import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash, BsArrowRepeat } from "react-icons/bs";
import { Link } from "react-router-dom";
import { NBListingContext } from "../../../../../helper/context/Context";

function NBListingWebUser(props) {
  const {
    isDeleteData,
    setIsDeleteData,
    isResetPassword,
    setIsResetPassword,
    idSelected,
    setIdSelected,
  } = useContext(NBListingContext);

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>No. Rekening</th>
            <th>Nama Nasabah</th>
            <th>Kelas</th>
            <th>Jurusan</th>
            <th colSpan="2" className="text-center">
              Opsi
            </th>
          </tr>
        </thead>
        <tbody>
          {props.webUser.map((webUser, index) => (
            <tr key={webUser.norek}>
              <td>{index + 1}</td>
              <td>
                <a href="#">{webUser.username}</a>
              </td>
              <td>{webUser.norek}</td>
              <td>{webUser.full_name}</td>
              <td>{webUser.kelas}</td>
              <td>{webUser.jurusan}</td>
              <td className="text-center" id="norek">
                {/* <Link to={`/dashboard/nasabah/edit?targetKey=${webUser.norek}`}> */}
                <Button
                  className="btn-edit"
                  type="submit"
                  onClick={(e) => {
                    setIsResetPassword(true);
                    setIdSelected(webUser.username);
                  }}
                >
                  <BsArrowRepeat />
                </Button>
                {/* </Link> */}
              </td>
              <td className="text-center">
                <Button
                  className="btn-delete"
                  type="submit"
                  onClick={(e) => {
                    setIsDeleteData(true);
                    setIdSelected(webUser.username);
                  }}
                >
                  <BsTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default NBListingWebUser;
