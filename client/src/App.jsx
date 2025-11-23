import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import UserDirectory from "./components/UserDirectory";
import FilePage from "./components/FilePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/:username" element={<UserDirectory />}></Route>
        <Route path="/:username/:filename" element={<FilePage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
