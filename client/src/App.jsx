import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import UserDirectory from "./components/UserDirectory";
import FilePage from "./components/FilePage";
import LoginPage from "./components/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/login"} />}></Route>
        <Route path="/:username" element={<UserDirectory />}></Route>
        <Route path="/:username/:filename" element={<FilePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
