import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import { useAuthContext } from "./context/AuthContext";

export default function App() {
  const {authUser} = useAuthContext();
  return (
    <div className="p-4 h-screen flex items-center justify-center">
       <Routes>
          <Route path="/" element={!authUser ? <Navigate to='/login' /> : <Home />} />
          <Route path="/login" element={authUser ? <Navigate to='/' /> : <Login />} />
          <Route path="/signup" element={authUser ? <Navigate to='/' /> : <Signup />} />
       </Routes>
       <Toaster />
    </div>
  )
}