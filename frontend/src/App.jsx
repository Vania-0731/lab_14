import "./App.css";
import "./Style/globals.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import SeriePage from "./pages/SeriePage";
import SerieFormPage from "./pages/SerieFormPage";
import CategoryFormPage from "./pages/CategoryFormPage";
import CategoryEditFormPage from "./pages/CategoryEditFormPage";
import SerieEditFormPage from "./pages/SerieEditFormPage";
import 'react-toastify/dist/ReactToastify.css'; 
import { ToastContainer } from 'react-toastify';
import MainLayout from "./pages/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Página de login sin layout */}
        <Route path="/" element={<LoginPage />} />

        {/* Rutas que comparten header y footer */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/series" element={<SeriePage />} />
          <Route path="/series/create" element={<SerieFormPage />} />
          <Route path="/series/edit/:idserie" element={<SerieEditFormPage />} />
          <Route path="/categories/new" element={<CategoryFormPage />} />
          <Route path="/categories/edit/:id" element={<CategoryEditFormPage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  );
}
export default App;
