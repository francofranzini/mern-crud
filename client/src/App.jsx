import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage.jsx";
import {TableJson, darkTheme} from "./pages/SociosPage.jsx";
import {  } from "./components/leftDrawer.jsx";
import SocioFormPage from "./pages/SocioFormPage.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import { SocioProvider } from "./context/SocioContext.jsx";
import Header from "./components/navbar.jsx";


function App() {
  return (
    <div className="font-roboto">
      <AuthProvider>
        <SocioProvider>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              <Route element={<ProtectedRoute />}>
                <Route path="/socios" element={<TableJson />} />
                <Route path="/add-socio" element={<SocioFormPage />} />
                <Route path="/socios/:id" element={<SocioFormPage />} />
                <Route path="/profile" element={<ProfilePage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </SocioProvider>
      </AuthProvider>
    </div>

  );
}

export default App;
