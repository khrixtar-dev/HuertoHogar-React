import { useEffect, useState } from "react";
import { PRODUCTOS } from "../../public/js/productos_catalogo";
import "../css/admin-productos.css";

export default function AdminProductos() {
  const [listaProductos, setListaProductos] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoProducto, setNuevoProducto] = useState(null);

  // Cargar datos al montar
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("listaProductos"));
      if (Array.isArray(data) && data.length > 0) {
        setListaProductos(data);
      } else {
        setListaProductos(PRODUCTOS);
        localStorage.setItem("listaProductos", JSON.stringify(PRODUCTOS));
      }
    } catch (err) {
      console.error("❌ Error cargando productos:", err);
      setListaProductos(PRODUCTOS);
    }
  }, []);

  // Guardar cada vez que cambia la lista
  useEffect(() => {
    if (listaProductos.length > 0) {
      localStorage.setItem("listaProductos", JSON.stringify(listaProductos));
      console.log("💾 Guardado en localStorage:", listaProductos.length);
    }
  }, [listaProductos]);

  // ➕ Agregar nuevo producto
  const handleAgregar = () => {
    setNuevoProducto({
      id: "",
      nombre: "",
      precio: "",
      imagen: "",
      descripcion: "",
    });
  };

  const handleGuardarNuevo = () => {
    if (
      !nuevoProducto.id ||
      !nuevoProducto.nombre ||
      !nuevoProducto.precio ||
      !nuevoProducto.imagen ||
      !nuevoProducto.descripcion
    ) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (isNaN(nuevoProducto.precio)) {
      alert("El precio debe ser un número válido");
      return;
    }

    if (listaProductos.some((p) => p.id === nuevoProducto.id)) {
      alert("El ID ya existe");
      return;
    }

    const nuevo = { ...nuevoProducto, precio: Number(nuevoProducto.precio) };
    setListaProductos((prev) => [...prev, nuevo]);
    setNuevoProducto(null);
  };

  // ✏️ Editar producto
  const handleEditar = (id) => setEditandoId(id);

  // 💾 Guardar edición
  const handleGuardarEdicion = (id, camposActualizados) => {
    setListaProductos((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...camposActualizados } : p))
    );
    setEditandoId(null);
  };

  // ❌ Eliminar producto
  const handleEliminar = (id) => {
    if (window.confirm("¿Eliminar este producto?")) {
      setListaProductos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setNuevoProducto(null);
  };

  return (
    <main className="admin-container">
      <h2>Gestión de Productos</h2>

      <div className="table-responsive">
        <table className="table table-striped table-hover" id="tablaProductos">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Imagen</th>
              <th>Descripción</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* Nuevo producto */}
            {nuevoProducto && (
              <tr className="new-product">
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoProducto.id}
                    onChange={(e) =>
                      setNuevoProducto({ ...nuevoProducto, id: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoProducto.nombre}
                    onChange={(e) =>
                      setNuevoProducto({
                        ...nuevoProducto,
                        nombre: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoProducto.precio}
                    onChange={(e) =>
                      setNuevoProducto({
                        ...nuevoProducto,
                        precio: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoProducto.imagen}
                    placeholder="/img/productos_/nombre.png o URL externa"
                    onChange={(e) =>
                      setNuevoProducto({
                        ...nuevoProducto,
                        imagen: e.target.value,
                      })
                    }
                  />
                  {nuevoProducto.imagen && (
                    <img
                      src={nuevoProducto.imagen}
                      alt="Preview"
                      style={{ width: "60px", marginTop: "5px" }}
                    />
                  )}
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoProducto.descripcion}
                    onChange={(e) =>
                      setNuevoProducto({
                        ...nuevoProducto,
                        descripcion: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-success mb-1"
                    onClick={handleGuardarNuevo}
                  >
                    Guardar
                  </button>
                  <button
                    className="btn btn-sm btn-secondary mb-1"
                    onClick={handleCancelar}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            )}

            {/* Productos existentes */}
            {listaProductos.map((producto) =>
              editandoId === producto.id ? (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={producto.nombre}
                      onChange={(e) =>
                        setListaProductos((prev) =>
                          prev.map((p) =>
                            p.id === producto.id
                              ? { ...p, nombre: e.target.value }
                              : p
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={producto.precio}
                      onChange={(e) =>
                        setListaProductos((prev) =>
                          prev.map((p) =>
                            p.id === producto.id
                              ? { ...p, precio: Number(e.target.value) }
                              : p
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={producto.imagen}
                      onChange={(e) =>
                        setListaProductos((prev) =>
                          prev.map((p) =>
                            p.id === producto.id
                              ? { ...p, imagen: e.target.value }
                              : p
                          )
                        )
                      }
                    />
                    {producto.imagen && (
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        style={{ width: "60px", marginTop: "5px" }}
                      />
                    )}
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={producto.descripcion}
                      onChange={(e) =>
                        setListaProductos((prev) =>
                          prev.map((p) =>
                            p.id === producto.id
                              ? { ...p, descripcion: e.target.value }
                              : p
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-success mb-1"
                      onClick={() =>
                        handleGuardarEdicion(producto.id, producto)
                      }
                    >
                      Guardar
                    </button>
                    <button
                      className="btn btn-sm btn-secondary mb-1"
                      onClick={handleCancelar}
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={producto.id}>
                  <td>{producto.id}</td>
                  <td>{producto.nombre}</td>
                  <td>${producto.precio.toLocaleString()}</td>
                  <td>
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="img-thumbnail"
                      style={{ width: "80px" }}
                    />
                  </td>
                  <td>{producto.descripcion}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary mb-1"
                      onClick={() => handleEditar(producto.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger mb-1"
                      onClick={() => handleEliminar(producto.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <button className="btn btn-success mt-3" onClick={handleAgregar}>
        Agregar Producto
      </button>
    </main>
  );
}
