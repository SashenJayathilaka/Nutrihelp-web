import { useContext } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { UserContext } from "./context/user.context";

import MainNavbar from "./components/MainNavbar";
import Recipe from "./components/Recipe";
import AuthenticateRoute from "./routes/AuthenticateRoute/AuthenticateRoute";
import CreateRecipe from "./routes/CreateRecipe/CreateRecipe";
import FAQ from "./routes/FAQ/faq";
import ForgotPassword from "./routes/ForgotPassword/ForgotPassword";
import HealthNews from "./routes/HealthNews/HealthNews";
import Home from "./routes/Home/Home";
import Login from "./routes/Login/Login";
import Meal from "./routes/Meal/Meal";
import MFAform from "./routes/MFA/MFAform";
import Dashboard from "./routes/NewMenu/Dashboard";
import CategoryResults from "./routes/SearchRecipes/CategoryResults"; // 🆕
import SearchRecipes from "./routes/SearchRecipes/SearchRecipes";
import SignUp from "./routes/SignUp/SignUp";
import Appointment from "./routes/UI-Only-Pages/Appointment/Appointment";
import DietaryRequirements from "./routes/UI-Only-Pages/DietaryRequirements/DietaryRequirements";
import Menu from "./routes/UI-Only-Pages/Menu/Menu";
import NutritionCalculator from "./routes/UI-Only-Pages/NutritionCalculator/NutritionCalculator";
import ScanProducts from "./routes/UI-Only-Pages/ScanProducts/ScanProducts";
import UserProfilePage from "./routes/UI-Only-Pages/UserProfilePage/userprofile";
import YourPreferences from "./routes/UI-Only-Pages/YourPreferences/pref-dis-health";

function App() {
  const { currentUser } = useContext(UserContext);

  return (
    <Router>
      <MainNavbar />
      <ToastContainer />
      <Routes>
        <Route
          path="/"
          element={
            currentUser ? <Navigate to="/home" /> : <Navigate to="/login" />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/faq" element={<FAQ />} />

        {/* Private Routes */}
        <Route
          path="createRecipe"
          element={
            <AuthenticateRoute>
              <CreateRecipe />
            </AuthenticateRoute>
          }
        />
        <Route
          path="searchRecipes"
          element={
            <AuthenticateRoute>
              <SearchRecipes />
            </AuthenticateRoute>
          }
        />
        {/* New route for category-specific results */}
        <Route
          path="searchRecipes/:category"
          element={
            <AuthenticateRoute>
              <CategoryResults />
            </AuthenticateRoute>
          }
        />
        <Route
          path="yourPreferences"
          element={
            <AuthenticateRoute>
              <YourPreferences />
            </AuthenticateRoute>
          }
        />
        <Route
          path="userProfile"
          element={
            <AuthenticateRoute>
              <UserProfilePage />
            </AuthenticateRoute>
          }
        />
        <Route
          path="Appointment"
          element={
            <AuthenticateRoute>
              <Appointment />
            </AuthenticateRoute>
          }
        />
        <Route
          path="dietaryRequirements"
          element={
            <AuthenticateRoute>
              <DietaryRequirements />
            </AuthenticateRoute>
          }
        />
        <Route
          path="ScanProducts"
          element={
            <AuthenticateRoute>
              <ScanProducts />
            </AuthenticateRoute>
          }
        />
        <Route
          path="menu"
          element={
            <AuthenticateRoute>
              <Menu />
            </AuthenticateRoute>
          }
        />
        <Route
          path="recipe"
          element={
            <AuthenticateRoute>
              <Recipe />
            </AuthenticateRoute>
          }
        />
        <Route
          path="Meal"
          element={
            <AuthenticateRoute>
              <Meal />
            </AuthenticateRoute>
          }
        />
        <Route
          path="nutrition-calculator"
          element={
            <AuthenticateRoute>
              <NutritionCalculator />
            </AuthenticateRoute>
          }
        />
        <Route
          path="healthnews"
          element={
            <AuthenticateRoute>
              <HealthNews />
            </AuthenticateRoute>
          }
        />
        <Route path="MFAform" element={<MFAform />} />
        <Route
          path="dashboard"
          element={
            <AuthenticateRoute>
              <Dashboard />
            </AuthenticateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
