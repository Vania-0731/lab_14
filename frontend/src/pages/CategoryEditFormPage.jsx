import HeaderComponent from "../components/HeaderComponent";
import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { showCategoryService, updateCategoryService } from "../services/category.service";

function CategoryEditFormPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [description, setDescripcion] = useState("");

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const response = await showCategoryService(id);
        setDescripcion(response.data.description);
      } catch (error) {
        console.error("Error al obtener la categoría", error);
        alert("No se pudo cargar la categoría.");
      }
    };

    fetchCategoria();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      const categoriaActualizada = { description };
      await updateCategoryService(id, categoriaActualizada);
      navigate("/categories");
    } catch (error) {
      console.error("Error al actualizar la categoría.", error);
      alert("Hubo un error al guardar los cambios.");
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div className="border-bottom pb-3 mb-3">
          <h3>Editar Categoría</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputDescription" className="form-label">Descripción</label>
            <input
              type="text"
              className="form-control"
              id="inputDescription"
              value={description}
              onChange={(e) => setDescripcion(e.target.value)}
              required
            />
          </div>
          <button className="btn btn-primary me-2" type="submit">
            Guardar
          </button>
          <Link to="/categories" className="btn btn-secondary">
            Cancelar
          </Link>
        </form>
      </div>
    </>
  );
}

export default CategoryEditFormPage;
