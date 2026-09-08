import type { FC } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";

export const AppHeader: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/";
  const isQuizDetailsPage = location.pathname.startsWith("/quizzes/");

  return (
    <header className="app-header">
      <div className="app-header__side app-header__side--left">
        {isQuizDetailsPage && (
          <button
            className="app-header__button app-header__back-button"
            type="button"
            onClick={() => navigate("/")}
          >
            <IoArrowBack aria-hidden="true" /> Back
          </button>
        )}
      </div>

      <h1 className="app-header__title">quiz-builder</h1>

      <div className="app-header__side app-header__side--right">
        {isHomePage && (
          <button
            className="app-header__button app-header__create-button"
            type="button"
            onClick={() => navigate("/create")}
          >
            Create quiz
          </button>
        )}
      </div>
    </header>
  );
};
