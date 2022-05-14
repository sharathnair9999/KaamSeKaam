import React from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/user-context/user-context";
import { Landing, Login, Signup, SingleTask, Tasks } from "../pages";

const RedirectLoggedInUser = ({ children }) => {
  const { userState } = useAuth();
  const location = useLocation();
  if (userState.isLoggedIn) {
    return <Navigate to={"/tasks"} replace state={{ from: location }} />;
  }
  return children;
};

const RequireAuth = ({ children }) => {
  const { userState } = useAuth();
  const location = useLocation();
  if (!userState.isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
};

const AllRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RedirectLoggedInUser>
            <Landing />
          </RedirectLoggedInUser>
        }
      />
      <Route path="tasks">
        <Route
          index
          element={
            <RequireAuth>
              <Tasks />
            </RequireAuth>
          }
        />
        <Route
          path=":taskId"
          element={
            <RequireAuth>
              <SingleTask />
            </RequireAuth>
          }
        />
      </Route>
      <Route
        path="login"
        element={
          <RedirectLoggedInUser>
            <Login />
          </RedirectLoggedInUser>
        }
      />
      <Route
        path="signup"
        element={
          <RedirectLoggedInUser>
            <Signup />
          </RedirectLoggedInUser>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
