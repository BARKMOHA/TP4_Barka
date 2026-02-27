import { BrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./router/AppRouter";
import "./styles/Layout.css";

function App() {
  return (
    <BrowserRouter>
      <Navbar />   
      <div className="content-container">
        <AppRouter />
      </div>
    </BrowserRouter>
  );
}

export default App;