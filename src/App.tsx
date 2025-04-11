import {
  BrowserRouter as Router,
  Route,
  Routes as BrowserRoutes,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// Pages
import Dashboard from "./pages/dashboard";
import CapacityPlanning from "./pages/capacity-planning";
import SprintOverview from "./pages/sprint-overview";
import UserOverview from "./pages/user-overview";
import UserDetails from "./pages/user-details";
import WSRReport from "./pages/wsr-report";

// Layout
import Layout from "./layouts/layout";

// Components
import Index from "./pages";
import NoData from "./components/no-data";

import { Routes } from "./routes";

function App() {
  return (
    <>
      <Toaster />
      <Router>
        <BrowserRoutes>
          <Route path={Routes.HOME} element={<Index />} />
          <Route path={Routes.NO_DATA} element={<NoData />} />

          <Route path={Routes.DASHBOARD} element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route
              path={Routes.CAPACITY_PLANNING}
              element={<CapacityPlanning />}
            />
            <Route path={Routes.SPRINT_OVERVIEW} element={<SprintOverview />} />
            <Route path={Routes.WSR_REPORTS} element={<WSRReport />} />
            <Route path={Routes.USER_OVERVIEW} element={<UserOverview />} />
            <Route path={Routes.USER_DETAILS} element={<UserDetails />} />
          </Route>
        </BrowserRoutes>
      </Router>
    </>
  );
}

export default App;
