import React from "react";
import { Routes, Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import HMIndex from "../home/HMIndex";
import CMPNavbar from "../../component/CMPNavbar";
import CMPFooter from "../../component/CMPFooter";
import NBNewForm from "../nasabah/NBNewForm";
import NBListing from "../nasabah/NBListing";
import TRListing from "../transaction/TRListing";
import TRNewForm from "../transaction/TRNewForm";
import NotFound from "../../../pagenotfound/NotFound";
import RPIndex from "../report/RPIndex";
import POBukuTabungan from "../printout/POBukuTabungan";
import NBSaldo from "../nasabah/NBSaldo";
import STIndex from "../setting/STIndex";
import { useDashRoutes } from "./function/useDashRoutes";
import { useAuthContext } from "../../../../helper/context/useAuthContext";
import PrivateAdmin from "../../../../private_routes/PrivateAdmin";
import PrivateTeller from "../../../../private_routes/PrivateTeller";
import NFPageNotFound from "../notfound/NFPageNotFound";
import PFIndex from "../profile/PFIndex";
import STChangePWDUser from "../setting/STChangePWDUser";
import HMWebUser from "../home/HMWebUser";
import NBMyBalance from "../nasabah/NBMyBalance";
import PrivateNasabah from "../../../../private_routes/PrivateNasabah";
import CMPLoading from "../../component/CMPLoading";

function DashboardRoutes(props) {
  // const axiosInstance = props.axiosInstance;
  const configAxios = props.configAxios;

  const { Logout, axiosJWT, name } = useDashRoutes(configAxios);

  const { userRole } = useAuthContext();
  return (
    <>
      <CMPNavbar
        Logout={Logout}
        name={name}
        configAxios={configAxios}
        axiosJWT={axiosJWT}
      />
      {userRole ? (
        <>
          <Row>
            <Col>
              <Routes>
                <Route path="*" element={<NotFound />} />
                <Route path="/404-st" element={<NFPageNotFound />} />
                <Route
                  path="/"
                  element={
                    userRole === "nasabah" ? (
                      <HMWebUser name={name} />
                    ) : (
                      <HMIndex configAxios={configAxios} axiosJWT={axiosJWT} />
                    )
                  }
                />
                <Route
                  element={
                    userRole === "admin" ? (
                      <PrivateAdmin />
                    ) : userRole === "teller" ? (
                      <PrivateTeller />
                    ) : (
                      <NFPageNotFound />
                    )
                  }
                >
                  <Route
                    path="/nasabah/add"
                    element={
                      <NBNewForm
                        role="Add Nasabah"
                        // axiosInstance={axiosInstance}
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                      />
                    }
                  />

                  <Route
                    path="/nasabah/edit"
                    element={
                      <NBNewForm
                        role="Edit Nasabah"
                        // axiosInstance={axiosInstance}
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                      />
                    }
                  />
                  <Route
                    path="/nasabah/listing"
                    element={
                      <NBListing
                        // axiosInstance={axiosInstance}
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                        role="Nasabah"
                      />
                    }
                  />
                  <Route
                    path="/nasabah/saldo"
                    element={
                      <NBSaldo
                        // axiosInstance={axiosInstance}
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                      />
                    }
                  />
                  <Route
                    path="/nasabah/webuser/listing"
                    element={
                      <NBListing
                        role="Web User"
                        // axiosInstance={axiosInstance}
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                      />
                    }
                  />
                  <Route
                    path="/nasabah/webuser/add"
                    element={
                      <NBNewForm
                        role="Add Web User"
                        // axiosInstance={axiosInstance}
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                      />
                    }
                  />
                  {/* <Route
                    path="/nasabah/mobile/add"
                    element={
                      <NBNewForm
                        role="Add Mobile User"
                        axiosInstance={axiosInstance}
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                      />
                    }
                  />
                  <Route
                    path="/nasabah/mobile/edit"
                    element={
                      <NBNewForm
                        role="Edit Mobile User"
                        axiosInstance={axiosInstance}
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                      />
                    }
                  />
                  <Route
                    path="/nasabah/mobile/listing"
                    element={
                      <NBListing
                        role="Mobile User"
                        axiosInstance={axiosInstance}
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                      />
                    }
                  /> */}
                </Route>
                <Route element={<PrivateNasabah />}>
                  <Route
                    path="/nasabah/mybalance"
                    element={
                      <NBMyBalance
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                      />
                    }
                  />
                </Route>
                <Route
                  path="/transaction/histories"
                  element={
                    <TRListing
                      // axiosInstance={axiosInstance}
                      configAxios={configAxios}
                      axiosJWT={axiosJWT}
                    />
                  }
                />
                <Route
                  element={
                    userRole === "admin" ? (
                      <PrivateAdmin />
                    ) : userRole === "teller" ? (
                      <PrivateTeller />
                    ) : (
                      <NFPageNotFound />
                    )
                  }
                >
                  <Route
                    path="/transaction/add-penarikan"
                    element={
                      <TRNewForm
                        role="Add"
                        aksi="Penarikan"
                        // axiosInstance={axiosInstance}
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                      />
                    }
                  />
                  <Route
                    path="/transaction/add-setoran"
                    element={
                      <TRNewForm
                        role="Add"
                        aksi="Setoran"
                        // axiosInstance={axiosInstance}
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                      />
                    }
                  />
                  <Route
                    path="/report/journal"
                    element={
                      <RPIndex
                        aksi="journal"
                        name="Journal"
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                      />
                    }
                  />
                  <Route
                    path="/report/rekap-end-of-day"
                    element={
                      <RPIndex
                        aksi="red"
                        name="Rekap End Of Day"
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                      />
                    }
                  />
                  <Route
                    path="/print/buku-tabungan"
                    element={
                      <POBukuTabungan
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                      />
                    }
                  />
                </Route>
                <Route
                  element={
                    <STChangePWDUser
                      configAxios={configAxios}
                      axiosJWT={axiosJWT}
                    />
                  }
                  path="/setting/user/changepwd"
                />
                <Route element={<PrivateAdmin />}>
                  <Route
                    path="/setting/menu"
                    element={<STIndex role="menu" />}
                  />
                  <Route
                    path="/setting/page/*"
                    element={
                      <STIndex
                        role="page"
                        configAxios={configAxios}
                        axiosJWT={axiosJWT}
                      />
                    }
                  />
                </Route>
                <Route
                  path="/profile"
                  element={<PFIndex name={name} />}
                ></Route>
              </Routes>
            </Col>
          </Row>
          <CMPFooter />
        </>
      ) : (
        <CMPLoading />
      )}
    </>
  );
}

export default DashboardRoutes;
