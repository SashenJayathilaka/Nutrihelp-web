import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/user.context";
import { useDarkMode } from "../routes/DarkModeToggle/DarkModeContext";
import DarkModeToggle from "../routes/DarkModeToggle/DarkModeToggle"; // Included from master branch
import "../styles/mainNavbar.css";
import TextToSpeech from "./TextToSpeech/TextToSpeech";
import VoiceNavigation from "./VoiceControl/VoiceNavigation";

const MainNavbar = () => {
  const { currentUser, logOut } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`shadow-2xl ${isScrolled ? "scrolled" : ""} ${
        darkMode ? "bg-[#555555]" : "bg-white"
      }`}
    >
      <nav>
        <div className="flex justify-between items-center m-auto gap-x-6 pr-8 tts-ignore w-full">
          <div className="">
            <img src="/images/logo.png" alt="Website Logo" className="logo" />
          </div>

          <div className="nav-links">
            {currentUser ? ( //need to change
              <>
                <Link className="link nav-link" to="/dashboard">
                  Menu
                </Link>
                <Link className="link nav-link" to="/Meal">
                  Meal Planning
                </Link>
                <Link className="link nav-link" to="/healthnews">
                  Health News
                </Link>

                <div className="dropdown">
                  <Link className="link nav-link">Recipes</Link>
                  <div className="dropdown-content">
                    <Link className="link dropdown-link" to="/CreateRecipe">
                      Create Recipe
                    </Link>
                    <Link className="link dropdown-link" to="/SearchRecipes">
                      Search Recipes
                    </Link>
                  </div>
                </div>

                <div className="dropdown">
                  <Link className="link nav-link">User</Link>
                  <div className="dropdown-content">
                    <Link
                      className="link dropdown-link"
                      to="/DietaryRequirements"
                    >
                      Dietary Preference
                    </Link>
                    <Link className="link dropdown-link" to="/userProfile">
                      Profile
                    </Link>
                  </div>
                </div>

                <Link className="link nav-link" to="/ScanProducts">
                  Scan Products
                </Link>

                <button
                  className="link nav-link logout-button"
                  onClick={logOut}
                >
                  Log Out
                </button>
                <TextToSpeech />
                <VoiceNavigation />
              </>
            ) : (
              <>
                <Link
                  className={`link dropdown-link font-bold text-xl rounded-md  ${
                    darkMode
                      ? "text-white hover:text-blue-300 hover:bg-blue-700"
                      : "text-[#333] hover:bg-blue-200 hover:text-blue-600"
                  }`}
                  to="/home"
                >
                  Home
                </Link>
                <Link
                  className={`link dropdown-link font-bold text-xl rounded-md  ${
                    darkMode
                      ? "text-white hover:text-blue-300 hover:bg-blue-700"
                      : "text-[#333] hover:bg-blue-200 hover:text-blue-600"
                  }`}
                  to="/login"
                >
                  Sign In
                </Link>
                <Link
                  className={`link dropdown-link font-bold text-xl rounded-md  ${
                    darkMode
                      ? "text-white hover:text-blue-300 hover:bg-blue-700"
                      : "text-[#333] hover:bg-blue-200 hover:text-blue-600"
                  }`}
                  to="/signUp"
                >
                  Create Account
                </Link>
                <Link>
                  <DarkModeToggle />
                </Link>
                <div className="flex justify-center items-center m-auto">
                  <TextToSpeech />
                  <VoiceNavigation />
                </div>

                {/* Included from master branch */}
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default MainNavbar;
