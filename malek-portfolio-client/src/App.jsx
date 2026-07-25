import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import ProtectedRoute from "./admin/ProtectedRoute";
import ProfileEditor from "./admin/ProfileEditor";
import SkillsManager from "./admin/SkillsManager";
import ProjectsManager from "./admin/ProjectsManager";
import ServicesManager from "./admin/ServicesManager";
import MessagesInbox from "./admin/MessagesInbox";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/admin/profile" replace />} />
            <Route path="profile" element={<ProfileEditor />} />
            <Route path="skills" element={<SkillsManager />} />
            <Route path="projects" element={<ProjectsManager />} />
            <Route path="services" element={<ServicesManager />} />
            <Route path="messages" element={<MessagesInbox />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
