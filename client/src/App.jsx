import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserDirectory from "./components/UserDirectory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path=":username" element={<UserDirectory />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
