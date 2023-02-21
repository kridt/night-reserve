import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogInSite from "./pages/LogInSite";
import "./App.scss";
import SignUpSite from "./pages/SignUpSite";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<LogInSite />} />
        <Route path="/signup" element={<SignUpSite />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
