import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import PageNotFound from "./pages/PageNotFound";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import Folder from "./components/Folder";
import PrivateRoute from "./Routes/Private";
import MyDrive from "./pages/User/MyDrive";
import Verify from "./pages/Auth/Verify";
import SharedFiles from "./pages/User/SharedFiles";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/' element={<PrivateRoute />}>
        <Route path="" element={<Homepage />} />
        <Route path="/my-drive" element={<MyDrive/>} />
        <Route path="/folder/:fid" element={<Folder />} />
        <Route path="/shared-file" element={<SharedFiles />} />
      </Route>
        <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-identity" element={<Verify />} />
      <Route path="/*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
