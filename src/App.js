import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DashboardRoutes from "./page/dashboard/page/routes/index";
import LGIndex from "./page/login/LGIndex";
import NotFound from "./page/pagenotfound/NotFound";
import configAxios from "./config/ConfigAxios";
import axiosInstance from "./function/AxiosInstance";
import ViewReport from "./page/view_report/ViewReport";
import ViewBukuTabungan from "./page/view_report/ViewBukuTabungan";
import LGFirst from "./page/login/LGFirst";
import { useAuthContext } from "./helper/context/useAuthContext";
import PrivateAdmin from "./private_routes/PrivateAdmin";
import PrivateTeller from "./private_routes/PrivateTeller";
import NFPageNotFound from "./page/dashboard/page/notfound/NFPageNotFound";

function App() {
  const { userRole } = useAuthContext();

  console.log("test user role : ", userRole);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard/*"
          element={<DashboardRoutes configAxios={configAxios} />}
        />
        {/* {userRole ? ( */}
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
            path="/report/view/*"
            element={
              <ViewReport
                configAxios={configAxios}
                axiosInstance={axiosInstance}
              />
            }
          />
          <Route
            path="/report/view/buku-tabungan/*"
            element={
              <ViewBukuTabungan
                configAxios={configAxios}
                axiosInstance={axiosInstance}
              />
            }
          />
        </Route>
        {/* ) : (
          ""
        )} */}
        <Route
          path="/login"
          element={
            <LGIndex configAxios={configAxios} axiosInstance={axiosInstance} />
          }
        />
        <Route
          path="/firstlogin"
          element={
            <LGFirst configAxios={configAxios} axiosInstance={axiosInstance} />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
