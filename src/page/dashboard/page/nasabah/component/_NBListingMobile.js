import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { NBListingContext } from "../../../../../helper/context/Context";

function NBListingMobile(props) {
  const { isDeleteData, setIsDeleteData, idSelected, setIdSelected } =
    useContext(NBListingContext);

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>User ID</th>
            <th>No. Rekening</th>
            <th>Nama Nasabah</th>
            <th>Kelas</th>
            <th>Jurusan</th>
            <th colSpan="2">Opsi</th>
          </tr>
        </thead>
        <tbody>
          {props.mobileUser.map((user) => (
            <tr key={user.user_id}>
              <td>
                <a href="#">{user.user_id}</a>
              </td>
              <td>{user.norek}</td>
              <td>{user.full_name}</td>
              <td>{user.kelas}</td>
              <td>{user.jurusan}</td>
              <td>
                <Link
                  to={`/dashboard/nasabah/mobile/edit?targetKey=${user.user_id}`}
                >
                  <Button className="btn-edit">
                    <BsPencilSquare />
                  </Button>
                </Link>
              </td>
              <td>
                <Button
                  className="btn-delete"
                  onClick={(e) => {
                    setIsDeleteData(true);
                    setIdSelected(user.user_id);
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

export default NBListingMobile;
