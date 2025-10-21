import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Callback from "@/pages/Callback";
import ProtectedRoute from "@/routes/ProtectedRoute";
import MainLayout from "./components/layout/Main";
import Recognize from "./pages/Recognize";
import MyRecognitions from "./pages/MyRecognitions";
import Main from "./pages/Main";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth/callback" element={<Callback />} />

      <Route element={<MainLayout />}>
        <Route index element={<Navigate to="/main" />} />
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