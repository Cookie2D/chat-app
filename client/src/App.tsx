import { Navigate, Route, Routes } from "react-router-dom";
import Authentication from "./pages/authentication/Authentication";
import Home from "./pages/home/Home";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/authentication" element={<Authentication />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
