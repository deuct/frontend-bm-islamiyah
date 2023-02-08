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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/dashboard/*"
          element={<DashboardRoutes configAxios={configAxios} />}
        />
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
