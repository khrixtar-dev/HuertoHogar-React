import { useEffect, useState } from "react";
import { usuarios as USUARIOS_BASE } from "../../public/js/usuarios";
import "../css/admin-usuarios.css";

export default function AdminUsuarios() {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState(null);

  const emailRegex = /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

  // 🧠 Cargar usuarios desde localStorage o desde usuarios.js
  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("listaUsuarios"));

      if (Array.isArray(data) && data.length > 0) {
        console.log("🟢 Usuarios cargados desde localStorage:", data);
        setListaUsuarios(data);
      } else {
        console.log("📦 Cargando usuarios base desde usuarios.js");
        setListaUsuarios(USUARIOS_BASE);
        localStorage.setItem("listaUsuarios", JSON.stringify(USUARIOS_BASE));
      }
    } catch (err) {
      console.error("❌ Error cargando usuarios:", err);
      setListaUsuarios(USUARIOS_BASE);
      localStorage.setItem("listaUsuarios", JSON.stringify(USUARIOS_BASE));
    }
  }, []);

  // 💾 Guardar en localStorage cada vez que cambia la lista
  useEffect(() => {
    if (listaUsuarios.length > 0) {
      localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
      console.log("💾 Guardado en localStorage:", listaUsuarios.length);
    }
  }, [listaUsuarios]);

  // ➕ Agregar nuevo usuario
  const handleAgregar = () => {
    setNuevoUsuario({
      id: "",
      nombre: "",
      apellido: "",
      correo: "",
      contraseña: "",
      admin: false,
    });
  };

  const handleGuardarNuevo = () => {
    const u = {
      ...nuevoUsuario,
      id: String(nuevoUsuario.id).trim(),
      nombre: nuevoUsuario.nombre.trim(),
      apellido: nuevoUsuario.apellido.trim(),
      correo: nuevoUsuario.correo.trim(),
      contraseña: nuevoUsuario.contraseña.trim(),
    };

    // VALIDACIONES
    if (!u.id || !u.nombre || !u.apellido || !u.correo || !u.contraseña) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (!emailRegex.test(u.correo)) {
      alert(
        "Correo inválido. Solo se permiten duoc.cl, profesor.duoc.cl y gmail.com"
      );
      return;
    }

    if (listaUsuarios.some((user) => String(user.id) === String(u.id))) {
      alert("El ID ya existe");
      return;
    }

    const nuevo = {
      ...u,
      id: Number.isNaN(Number(u.id)) ? u.id : Number(u.id),
    };

    setListaUsuarios((prev) => [...prev, nuevo]);
    setNuevoUsuario(null);
  };

  // ✏️ Editar usuario
  const handleEditar = (id) => setEditandoId(id);

  // 💾 Guardar edición (con validación)
  const handleGuardarEdicion = (id) => {
    // Tomamos el usuario ya editado desde el estado
    const usuarioEditado = listaUsuarios.find((u) => u.id === id);
    if (!usuarioEditado) return;

    const u = {
      ...usuarioEditado,
      nombre: usuarioEditado.nombre?.trim() || "",
      apellido: usuarioEditado.apellido?.trim() || "",
      correo: usuarioEditado.correo?.trim() || "",
      contraseña: usuarioEditado.contraseña?.trim() || "",
    };

    // VALIDACIONES EN EDICIÓN
    if (!u.nombre || !u.apellido || !u.correo || !u.contraseña) {
      alert("Todos los campos son obligatorios");
      return;
    }

    if (!emailRegex.test(u.correo)) {
      alert(
        "Correo inválido. Solo se permiten duoc.cl, profesor.duoc.cl y gmail.com"
      );
      return;
    }

    // Si pasa las validaciones, actualizamos
    setListaUsuarios((prev) => prev.map((user) => (user.id === id ? u : user)));
    setEditandoId(null);
  };

  // ❌ Eliminar usuario
  const handleEliminar = (id) => {
    if (window.confirm("¿Eliminar este usuario?")) {
      setListaUsuarios((prev) => prev.filter((u) => u.id !== id));
    }
  };

  // 🔙 Cancelar
  const handleCancelar = () => {
    setEditandoId(null);
    setNuevoUsuario(null);
  };

  return (
    <main className="admin-container">
      <h2>Gestión de Usuarios</h2>

      <div className="table-responsive">
        <table className="table table-striped table-hover" id="tablaUsuarios">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Correo</th>
              <th>Contraseña</th>
              <th>Admin</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {/* ➕ Nuevo usuario */}
            {nuevoUsuario && (
              <tr className="new-user">
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoUsuario.id}
                    onChange={(e) =>
                      setNuevoUsuario({ ...nuevoUsuario, id: e.target.value })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoUsuario.nombre}
                    onChange={(e) =>
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        nombre: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoUsuario.apellido}
                    onChange={(e) =>
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        apellido: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="email"
                    className="form-control"
                    value={nuevoUsuario.correo}
                    onChange={(e) =>
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        correo: e.target.value,
                      })
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={nuevoUsuario.contraseña}
                    onChange={(e) =>
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        contraseña: e.target.value,
                      })
                    }
                  />
                </td>
                <td className="text-center">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={nuevoUsuario.admin}
                    onChange={(e) =>
                      setNuevoUsuario({
                        ...nuevoUsuario,
                        admin: e.target.checked,
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

            {/* 🟡 Usuarios existentes */}
            {listaUsuarios.map((usuario) =>
              editandoId === usuario.id ? (
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={usuario.nombre}
                      onChange={(e) =>
                        setListaUsuarios((prev) =>
                          prev.map((u) =>
                            u.id === usuario.id
                              ? { ...u, nombre: e.target.value }
                              : u
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={usuario.apellido}
                      onChange={(e) =>
                        setListaUsuarios((prev) =>
                          prev.map((u) =>
                            u.id === usuario.id
                              ? { ...u, apellido: e.target.value }
                              : u
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="email"
                      className="form-control"
                      value={usuario.correo}
                      onChange={(e) =>
                        setListaUsuarios((prev) =>
                          prev.map((u) =>
                            u.id === usuario.id
                              ? { ...u, correo: e.target.value }
                              : u
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={usuario.contraseña}
                      onChange={(e) =>
                        setListaUsuarios((prev) =>
                          prev.map((u) =>
                            u.id === usuario.id
                              ? { ...u, contraseña: e.target.value }
                              : u
                          )
                        )
                      }
                    />
                  </td>
                  <td className="text-center">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      checked={usuario.admin}
                      onChange={(e) =>
                        setListaUsuarios((prev) =>
                          prev.map((u) =>
                            u.id === usuario.id
                              ? { ...u, admin: e.target.checked }
                              : u
                          )
                        )
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-success mb-1"
                      onClick={() => handleGuardarEdicion(usuario.id)}
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
                <tr key={usuario.id}>
                  <td>{usuario.id}</td>
                  <td>{usuario.nombre}</td>
                  <td>{usuario.apellido}</td>
                  <td>{usuario.correo}</td>
                  <td>{usuario.contraseña}</td>
                  <td>{usuario.admin ? "Sí" : "No"}</td>
                  <td className="table-actions">
                    <button
                      className="btn btn-sm btn-primary mb-1"
                      onClick={() => handleEditar(usuario.id)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger mb-1"
                      onClick={() => handleEliminar(usuario.id)}
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
        Agregar Usuario
      </button>
    </main>
  );
}
