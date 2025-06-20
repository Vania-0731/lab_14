import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, NavLink } from "react-router-dom";
import "../Style/HeaderComponent.css";

function HeaderComponent() {
  const { usuario, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container">
        <span className="navbar-brand mb-0 h1">SeriesApp</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/home">
                Inicio
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categories">
                Categorías
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/series">
                Series
              </NavLink>
            </li>
          </ul>
          <div>
            <p className="text-white bg-dark p-1">Bienvenido {usuario?.username}</p>
            <div className="text-end">
              <button onClick={handleLogout} className="btn btn-link">
                Salir
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default HeaderComponent;
