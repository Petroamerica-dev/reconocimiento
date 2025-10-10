import { Routes, Route } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import ProtectedRoute from "@/routes/ProtectedRoute";
import MainLayout from "./components/layout/Main";
import Recognize from "./pages/Recognize";
import MyRecognitions from "./pages/MyRecognitions";
import Main from "./pages/Main";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<MainLayout />}>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recognize"
          element={
            <ProtectedRoute>
              <Recognize />
            </ProtectedRoute>
          }
        />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-recognitions"
          element={
            <ProtectedRoute>
              <MyRecognitions />
            </ProtectedRoute>
          }
        />
      </Route>
    </Routes>
  );
}

export default App
