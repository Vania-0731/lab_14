import HeaderComponent from "../components/HeaderComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { createSerieService } from "../services/serie.service"; // 👈 IMPORTANTE

function SerieFormPage() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [rating, setRating] = useState(0);
  const [categoria, setCategoria] = useState("");
  const [imagenURL, setImagenURL] = useState("");
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get("http://127.0.0.1:8000/series/api/v1/categories/");
        setCategorias(res.data);
      } catch (error) {
        console.error("Error al cargar categorías", error);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !categoria || !releaseDate) return;

    const dataToSend = {
      name: nombre,
      release_date: releaseDate,
      rating: Number(rating),
      category: categoria,
      image: imagenURL.trim() || null,
    };

    try {
      await createSerieService(dataToSend); // 👈 USO DEL SERVICIO
      navigate("/series");
    } catch (error) {
      console.error("Error creando la serie", error);
      alert("Hubo un error creando la serie.");
    }
  };

  const previewURL = imagenURL.trim()
    ? imagenURL.trim()
    : "https://dummyimage.com/400x250/000/fff&text=preview";

  return (
    <>
      <div className="container mt-3">
        <div className="border-bottom pb-3 mb-3">
          <h3>Nueva Serie</h3>
        </div>
        <form className="row" onSubmit={handleSubmit}>
          <div className="col-md-4">
            <img
              className="card-img-top"
              src={previewURL}
              alt="preview"
              style={{ aspectRatio: "16 / 10", objectFit: "cover", width: "100%" }}
            />
          </div>
          <div className="col-md-8">
            <div className="mb-3">
              <label htmlFor="inputName" className="form-label">Nombre</label>
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
              <label htmlFor="inputReleaseDate" className="form-label">Fecha de Lanzamiento</label>
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
              <label htmlFor="inputRating" className="form-label">Rating</label>
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
              <label htmlFor="inputCategory" className="form-label">Categoría</label>
              <select
                className="form-select"
                id="inputCategory"
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                required
              >
                <option value="">Seleccione una opción</option>
                {categorias.map((cat) => (
                  <option
                    key={cat.id}
                    value={cat.url || `http://127.0.0.1:8000/series/api/v1/categories/${cat.id}/`}
                  >
                    {cat.description}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="inputImageURL" className="form-label">URL de la Imagen</label>
              <input
                type="url"
                className="form-control"
                id="inputImageURL"
                value={imagenURL}
                onChange={(e) => setImagenURL(e.target.value)}
                placeholder="https://..."
              />
              <small className="form-text text-muted">
                Puedes pegar la URL de una imagen externa. Si está vacío, se usará una imagen dummy.
              </small>
            </div>

            <div className="mb-3">
              <button className="btn btn-primary me-2" type="submit">Crear</button>
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

export default SerieFormPage;
