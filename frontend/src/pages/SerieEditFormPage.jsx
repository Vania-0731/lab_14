import HeaderComponent from "../components/HeaderComponent";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { showSerieService, updateSerieService } from "../services/serie.service"; // ← importa tu servicio
import axios from "axios"; // aún se usa para obtener categorías

function SerieEditFormPage() {
  const navigate = useNavigate();
  const { idserie } = useParams();

  const [nombre, setNombre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [imagenURL, setImagenURL] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/series/api/v1/categories/"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    };

    const fetchSerie = async () => {
      try {
        const response = await showSerieService(idserie); // ← aquí usa el service
        const serie = response.data;
        setNombre(serie.name);
        setReleaseDate(serie.release_date);
        setRating(serie.rating);
        setCategoria(serie.category);
        setImagenURL(serie.image || "");
      } catch (error) {
        console.error("Error al cargar la serie", error);
        alert("No se pudo cargar la serie.");
      }
    };

    fetchCategories();
    if (idserie) {
      fetchSerie();
    }
  }, [idserie]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim() || !categoria || !releaseDate) return;

    try {
      const serieActualizada = {
        name: nombre,
        release_date: releaseDate,
        rating: Number(rating),
        category: categoria,
        image: imagenURL.trim() || null,
      };
      await updateSerieService(idserie, serieActualizada); // ← aquí usa el service
      navigate("/series");
    } catch (error) {
      console.error("Error al actualizar la serie", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  const previewURL =
    imagenURL.trim() || "https://dummyimage.com/400x250/000/fff&text=preview";

  return (
    <>
      <div className="container mt-3">
        <div className="border-bottom pb-3 mb-3">
          <h3>Editar Serie</h3>
        </div>
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <img
              className="card-img-top"
              src={previewURL}
              alt="preview"
              style={{
                aspectRatio: "16 / 10",
                objectFit: "cover",
                width: "100%",
              }}
            />
          </div>
          <div className="col-md-8">
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="inputName"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputReleaseDate" className="form-label">
                Fecha de Lanzamiento
              </label>
              <input
                type="date"
                className="form-control"
                id="inputReleaseDate"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputRating" className="form-label">
                Rating
              </label>
              <input
                type="number"
                className="form-control"
                id="inputRating"
                value={rating}
                min={0}
                max={10}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="inputCategory" className="form-label">
                Categoría
              </label>
              <select
                className="form-select"
                id="inputCategory"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="">Seleccione una opción</option>
                {categories.map((cat) => (
                  <option
                    key={cat.id}
                    value={
                      cat.url ||
                      `http://localhost:8000/series/api/v1/categories/${cat.id}/`
                    }
                  >
                    {cat.description}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label htmlFor="inputImageURL" className="form-label">
                URL de la Imagen
              </label>
              <input
                type="url"
                className="form-control"
                id="inputImageURL"
                value={imagenURL}
                onChange={(e) => setImagenURL(e.target.value)}
                placeholder="https://..."
              />
              <small className="form-text text-muted">
                Puedes pegar la URL de una imagen externa. Si está vacío, se
                usará una imagen dummy.
              </small>
            </div>
            <div className="mb-3">
              <button className="btn btn-primary me-2" type="submit">
                Guardar
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate("/series")}
              >
                Cancelar
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default SerieEditFormPage;
