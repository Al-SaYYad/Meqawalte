import { BrowserRouter as B_R, Route, Routes } from "react-router-dom";
import { Suspense, lazy } from "react";
import "./App.css";
import ScrollToTop from "./Components/Functions/ScrollToTop";
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import Loader from "./Components/Loader/Loader";
import ContactUs from "./Components/ContactUs/ContactUs";
import AboutUs from "./Components/AboutUs/AboutUs";
import AddBuildingTools from "./Components/AddEquipment&BuildingTools/AddBuildingTools";

// Lazy Components
const IntroHomePage = lazy(() => import("./Pages/IntroHomePage/IntroHomePage"));
const Login = lazy(() => import("./Components/Auth/Login/Login"));
const IntroHome = lazy(() => import("./Components/IntroHome/IntroHome"));
const Register = lazy(() => import("./Components/Auth/Register/Register"));
const AddEquipment = lazy(() =>
  import("./Components/AddEquipment&BuildingTools/AddEquipment")
);
const HomePage = lazy(() => import("./Pages/Home/HomePage"));
const Home = lazy(() => import("./Components/Home/Home"));
const Worker = lazy(() => import("./Components/Worker/Worker"));
const Carpenter = lazy(() => import("./Components/Carpenter/Carpenter"));
const HeavyMachinery = lazy(() =>
  import("./Components/HeavyMachinery/HeavyMachinery")
);
const BuildingTools = lazy(() =>
  import("./Components/BuildingTools/BuildingTools")
);

const App = () => {
  return (
    <div dir="rtl">
      <B_R>
        <ScrollToTop />
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<IntroHomePage />}>
              <Route index element={<IntroHome />} />
              <Route path="about-us" element={<AboutUs />} />
              <Route path="contact-us" element={<ContactUs />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="add-equipment" element={<AddEquipment />} />
              <Route
                path="construction-materials"
                element={<AddBuildingTools />}
              />
            </Route>
            <Route
              path="/home/*"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            >
              <Route index element={<Home />} />
              <Route path="worker" element={<Worker />} />
              <Route path=":name" element={<Carpenter />} />
              <Route path="heavy-machinery" element={<HeavyMachinery />} />
              <Route path="building-tools" element={<BuildingTools />} />
            </Route>
          </Routes>
        </Suspense>
      </B_R>
    </div>
  );
};

export default App;
