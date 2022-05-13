import { ToastContainer } from "react-toastify";
import AllRoutes from "./helpers/AllRoutes";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <ToastContainer autoClose={3000} position="top-center" />
      <AllRoutes />
    </div>
  );
};

export default App;
