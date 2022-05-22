import React from "react";
import { useNavigate } from "react-router-dom";
import NotFound from "../helpers/notfound.svg";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container error-page flex-col">
      <img src={NotFound} alt="error page" className="responsive-img" />
      <h2>Page Not Found</h2>
      <button
        className="btn btn-primary"
        onClick={() => navigate("/tasks", { replace: true })}
      >
        Go to Tasks
      </button>
    </div>
  );
};

export default ErrorPage;
