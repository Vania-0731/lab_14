import { useState, useEffect } from "react";
import axios from "axios";
import HeaderComponent from "../components/HeaderComponent";
import SerieComponent from "../components/SerieComponent";
import ConfirmModal from "../components/ConfirmModal";
import { NavLink } from "react-router-dom";
import FooterComponent from "../components/FooterComponent";
import SearchComponent from "../components/SearchComponent";
import { getAllSerieService, deleteSerieService,} from "../services/serie.service.js";

function SeriePage() {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [favoritos, setFavoritos] = useState(() => {
    const stored = localStorage.getItem("favoritos");
    return stored ? JSON.parse(stored) : [];
  });
  const [filtro, setFiltro] = useState("");
  const [mostrarSoloFavoritos, setMostrarSoloFavoritos] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [serieAEliminar, setSerieAEliminar] = useState(null);

  const extractIdFromUrl = (url) => {
    const match = url.match(/\/categories\/(\d+)\//);
    return match ? parseInt(match[1], 10) : null;
  };

  const loadCategories = async () => {
    const resp = await axios.get(
      "http://127.0.0.1:8000/series/api/v1/categories/"
    );
    setCategories(resp.data);
  };

  const loadSeries = async () => {
    const resp = await getAllSerieService();
    const seriesConDescripcion = resp.data.map((serie) => {
      const catId = extractIdFromUrl(serie.category);
      const cat = categories.find((c) => c.id === catId);
      return {
        ...serie,
        categoryDescription: cat ? cat.description : "Sin categoría",
      };
    });
    setSeries(seriesConDescripcion);
  };

  useEffect(() => {
    const fetchData = async () => {
      await loadCategories();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      loadSeries();
    }
  }, [categories]);

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const toggleFavorite = (id) => {
    setFavoritos((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const seriesFiltradas = series.filter((serie) => {
    const cumpleFiltroNombre = serie.name
      .toLowerCase()
      .includes(filtro.toLowerCase());
    const cumpleFiltroFavorito = mostrarSoloFavoritos
      ? favoritos.includes(serie.id)
      : true;
    return cumpleFiltroNombre && cumpleFiltroFavorito;
  });

  function onRequestDelete(id) {
    setSerieAEliminar(id);
    setModalVisible(true);
  }

  async function confirmarEliminacion() {
    try {
      await deleteSerieService(serieAEliminar); // llamada al servicio
      setSeries((prev) => prev.filter((s) => s.id !== serieAEliminar));
      setFavoritos((prev) => prev.filter((favId) => favId !== serieAEliminar));
      setModalVisible(false);
      setSerieAEliminar(null);
    } catch (error) {
      console.error("Error eliminando la serie:", error);
    }
  }

  function cancelarEliminacion() {
    setModalVisible(false);
    setSerieAEliminar(null);
  }

  return (
    <>
      <div className="container mt-3">
        <div className="d-flex justify-content-between border-bottom pb-3 mb-3 align-items-center">
          <h3>Series</h3>
          <div>
            <NavLink className="btn btn-primary" to="/series/create">
              Nuevo
            </NavLink>
          </div>
        </div>

        <div className="mb-3 d-flex gap-3 align-items-center">
          <SearchComponent onSearch={setFiltro} />
          <button
            className={`btn ${
              mostrarSoloFavoritos
                ? "btn-warning text-nowrap"
                : "btn-outline-secondary text-nowrap"
            }`}
            onClick={() => setMostrarSoloFavoritos((prev) => !prev)}
          >
            {mostrarSoloFavoritos ? "Mostrar todos" : "Mostrar solo favoritos"}
          </button>
        </div>

        <div className="row">
          {seriesFiltradas.length > 0 ? (
            seriesFiltradas.map((serie) => (
              <div key={serie.id} className="col-md-3 mb-3">
                <SerieComponent
                  codigo={serie.id}
                  nombre={serie.name}
                  categoria={serie.categoryDescription}
                  imagen={serie.image}
                  isFavorite={favoritos.includes(serie.id)}
                  toggleFavorite={() => toggleFavorite(serie.id)}
                  onRequestDelete={() => onRequestDelete(serie.id)}
                />
              </div>
            ))
          ) : (
            <p>No se encontraron series que coincidan.</p>
          )}
        </div>
      </div>
      <FooterComponent />

      <ConfirmModal
        visible={modalVisible}
        message={`¿Seguro que quieres eliminar ${
          series.find((s) => s.id === serieAEliminar)?.name
        }?`}
        onConfirm={confirmarEliminacion}
        onCancel={cancelarEliminacion}
      />
    </>
  );
}

export default SeriePage;
