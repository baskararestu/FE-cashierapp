import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Register";

function App() {
  // const userGlobal = useSelector((state) => state.user.user);
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
