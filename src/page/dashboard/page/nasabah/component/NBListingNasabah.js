import React, { useContext } from "react";
import { Table, Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";
import { NBListingContext } from "../../../../../helper/context/Context";

function NBListingNasabah(props) {
  const { isDeleteData, setIsDeleteData, idSelected, setIdSelected } =
    useContext(NBListingContext);

  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
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
          {props.nasabah.map((nasabah) => (
            <tr key={nasabah.norek}>
              <td>
                <a href="#">{nasabah.norek}</a>
              </td>
              <td>{nasabah.nama_lengkap}</td>
              <td>{nasabah.kelas}</td>
              <td>{nasabah.nama_jurusan}</td>
              <td className="text-center" id="norek">
                <Link to={`/dashboard/nasabah/edit?targetKey=${nasabah.norek}`}>
                  <Button className="btn-edit">
                    <BsPencilSquare />
                  </Button>
                </Link>
              </td>
              <td className="text-center">
                <Button
                  className="btn-delete"
                  type="submit"
                  onClick={(e) => {
                    setIsDeleteData(true);
                    setIdSelected(nasabah.norek);
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

export default NBListingNasabah;
