import HeaderComponent from "../components/HeaderComponent";
import { useState} from "react";
import { useNavigate } from "react-router-dom";

function CategoryFormPage() {
  const navigate = useNavigate();

  const [description, setDescripcion] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      const nuevaCategoria = { description };
      await createCategoryService(nuevaCategoria);
      navigate("/categories");
    } catch (error) {
      console.error("Error al crear la categoría:", error);
      alert("Hubo un error al guardar la categoría.");
    }
  };

  return (
    <>
      <div className="container mt-3">
        <div className="border-bottom pb-3 mb-3">
          <h3>Nueva Categoría</h3>
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
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate("/categories")}
          >
            Cancelar
          </button>
        </form>
      </div>
    </>
  );
}

export default CategoryFormPage;
