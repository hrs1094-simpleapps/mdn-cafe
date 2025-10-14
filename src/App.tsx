import {   Routes, Route, Navigate, HashRouter } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import Profiles from "./pages/Profile/Profiles";
import Videos from "./lib/pages/UiElements/Videos";
import Images from "./lib/pages/UiElements/Images";
import Alerts from "./lib/pages/UiElements/Alerts";
import Badges from "./lib/pages/UiElements/Badges";
import Avatars from "./lib/pages/UiElements/Avatars";
import Buttons from "./lib/pages/UiElements/Buttons";
import LineChart from "./lib/pages/Charts/LineChart";
import BarChart from "./lib/pages/Charts/BarChart";
import Calendar from "./pages/OtherPage/Calendar";
import FormElements from "./lib/pages/Forms/FormElements";
import Blank from "./pages/OtherPage/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import { userInfoStore } from "./stores/userStore";
import Registration from "./pages/Registration/Registration";
import SuscribersList from "./pages/Subscribers/SubscribersList";
import OnSpotUserList from "./pages/OnSpot/OnspotList";
import { useTheme } from "./context/ThemeContext";
import { SkeletonTheme } from "react-loading-skeleton";
import { navRoutes } from "./utils/constants";
import OnSpotUserReport from "./pages/OnSpot/OnSpotUserReport";

export default function App() {
  const { theme } = useTheme();
  return (
    <SkeletonTheme
      baseColor={theme === "light" ? "#f2f4f7" : "#101828"}
      highlightColor={theme === "light" ? "#ffffff" : "#515a6cff"}
    >
      <HashRouter>
        <ScrollToTop />
        <Routes>
          {/* Auth Layout */}
          <Route path={navRoutes.Login} element={<SignIn />} />

          <Route path={navRoutes.Logout} element={<SignUp />} />

          <Route path={navRoutes.Register} element={<Registration />} />
          {/* Dashboard Layout */}

          <Route element={<PrivateRoute />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<Profiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path={navRoutes.Subscribers} element={<SuscribersList />} />

            <Route path={navRoutes.OnSpot} element={<OnSpotUserList />} />
            <Route
              path={navRoutes.OnSpotDetails}
              element={<OnSpotUserReport />}
            />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </HashRouter>
    </SkeletonTheme>
  );
}

const publicPaths: string[] = [
  "",
  "login",
  "legacy-login",
  "logout",
  "signin",
  "signup",
];
/**
 * Wrapper component to handle Private Routes
 *
 * This component will restricts the user from
 * accessing private pages
 *
 * Only logged in customer can view Private pages
 *
 * @returns <PrivateRoute />
 */
const PrivateRoute = () => {
  const currentPath = window.location.pathname;

  const { isLoggedIn } = userInfoStore();
  if (!isLoggedIn && !publicPaths.includes(currentPath)) {
    // Storing current location path is to navigate the same page after
    // login success
    //storeToLocalStorage(storageKeys.navPath, window.location.pathname);
  }
  console.log(isLoggedIn);
  return isLoggedIn ? <AppLayout /> : <Navigate to={navRoutes.Login} />;
};
