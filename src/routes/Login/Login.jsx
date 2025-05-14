import { UserIcon } from "lucide-react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Toast import
import "react-toastify/dist/ReactToastify.css"; // Toast CSS
import { UserContext } from "../../context/user.context";
import { useDarkMode } from "../DarkModeToggle/DarkModeContext";
import "./Login.css";
import FramerClient from "../../components/framer-client";
import NutrihelpLogo from "./Nutrihelp_Logo.PNG";

const Login = () => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const [contact, setContact] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const { darkMode } = useDarkMode();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContact((prevValue) => ({ ...prevValue, [name]: value }));
  };

  const { email, password } = contact;

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:80/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        const expirationTimeInMillis = isChecked ? 3600000 : 0;
        setCurrentUser(data.user, expirationTimeInMillis);

        // Toast message
        toast.success(
          "💧 Welcome back! Don’t forget to check your meal plan & track your water intake!",
          {
            position: "top-right",
            autoClose: false, // stays until dismissed
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            hideProgressBar: false,
            theme: "colored", // makes it vibrant
            style: {
              fontSize: "1.1rem",
              fontWeight: "bold",
              padding: "1.2rem",
              borderRadius: "10px",
              boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
              backgroundColor: "#d1f0ff", // optional custom color
              color: "#0d47a1",
            },
          }
        );

        // Delay navigation so toast shows first
        setTimeout(() => {
          navigate("/MFAform", { state: { email, password } });
        }, 300);
      } else {
        const data = await response.json();
        setError(
          data.error ||
            "Failed to sign in. Please check your credentials and try again."
        );
      }
    } catch (error) {
      console.error("Error signing in:", error.message);
      setError("Failed to sign in. An error occurred.");
    }
  };

  const handleToggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const handleForgotPasswordClick = () => {
    navigate("/forgotPassword");
  };

  return (
    <FramerClient>
      <div className={`w-screen h-screen ${darkMode && "bg-[#555555]"}`}>
        <div className="h-auto w-[70%] flex flex-col md:flex-row justify-center items-center mt-24 ml-auto mr-auto shadow-2xl border-none rounded-2xl overflow-hidden p-[20px]">
          <div className="w-[100%]">
            <img
              src={NutrihelpLogo}
              alt="Nutrihelp Logo"
              className="rounded-xl w-[500px] mx-auto"
            />
            <h2
              className={`font-bold text-4xl mt-4 ${darkMode && "text-white"}`}
            >
              LOG IN
            </h2>
            <p className="text-lg text-center text-gray-500">
              Enter your email and password to sign in!
            </p>
            {error && <p className="error-message">{error}</p>}
            <label htmlFor="email" className="input-label">
              Email*
            </label>
            <input
              className={`border-1 ${
                darkMode && "bg-gray-700 text-white font-semibold"
              }`}
              name="email"
              type="text"
              placeholder="Enter Your Email"
              onChange={handleChange}
              value={email}
            />
            <div>
              <label htmlFor="password" className="input-label">
                Password*
              </label>
              <div className="password-field">
                <input
                  className={`border-1 ${
                    darkMode && "bg-gray-700 text-white font-semibold"
                  }`}
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Min. 8 characters"
                  onChange={handleChange}
                  value={password}
                />
                <span className="eye-icon tts-ignore">👁️</span>
              </div>
            </div>

            <div className="options">
              <div className="keep-logged-in ">
                <div
                  className={`checkbox-div ${isChecked ? "checked" : ""}`}
                  onClick={handleToggleCheckbox}
                >
                  <span className="checkbox-indicator"></span>
                </div>
                <label htmlFor="keepLoggedIn" className="ml-2">
                  Keep me logged in
                </label>
              </div>
              <div
                className={`forgot-password ${
                  darkMode ? "text-purple-300" : "text-purple-800"
                }`}
                onClick={handleForgotPasswordClick}
              >
                Forgot password?
              </div>
            </div>
            <button
              className={`w-full rounded-full mb-6 text-2xl font-bold flex justify-center gap-3 items-center ${
                darkMode
                  ? "bg-purple-700 hover:bg-purple-500"
                  : "bg-purple-400 text-gray-800 hover:bg-purple-700 hover:text-white"
              }`}
              onClick={handleSignIn}
            >
              <UserIcon size={24} />
              Sign In
            </button>

            <p className="text-2xl font-semibold text-center mt-4 mb-4">Or</p>

            <button
              className={`w-full rounded-full mb-6 text-2xl font-bold flex justify-center gap-3 items-center ${
                darkMode
                  ? "bg-green-700 hover:bg-green-500"
                  : "bg-green-500 text-gray-800 hover:bg-green-700 hover:text-white"
              }`}
              onClick={handleSignIn}
            >
              <img
                src="https://static.vecteezy.com/system/resources/previews/022/613/027/non_2x/google-icon-logo-symbol-free-png.png"
                className="w-[25px]"
              />
              Sign In With Google
            </button>

            <p className={`signup-link mb-5`}>
              Not registered yet?{" "}
              <Link
                to="/signUp"
                className={`${
                  darkMode ? "text-purple-300" : "text-purple-800"
                }`}
              >
                Create an Account
              </Link>
            </p>
          </div>
          <div className="flex flex-col justify-center items-center m-auto">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/woman-watching-food-menu-while-checkout-order-using-application-illustration-download-in-svg-png-gif-file-formats--online-service-mobile-app-pack-e-commerce-shopping-illustrations-10107922.png"
              alt="Nutrihelp Logo 2"
              className=""
            />
          </div>
        </div>
      </div>
    </FramerClient>
  );
};

export default Login;
