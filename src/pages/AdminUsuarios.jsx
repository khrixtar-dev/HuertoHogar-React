import { useEffect, useState } from "react";
import { usuarios as USUARIOS_BASE } from "../../public/js/usuarios";
import "../css/admin-usuarios.css";

export default function AdminUsuarios() {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [editandoId, setEditandoId] = useState(null);
  const [nuevoUsuario, setNuevoUsuario] = useState(null);

  const emailRegex = /^[\w._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("listaUsuarios"));
      if (Array.isArray(data) && data.length > 0) {
        setListaUsuarios(data);
      } else {
        setListaUsuarios(USUARIOS_BASE);
        localStorage.setItem("listaUsuarios", JSON.stringify(USUARIOS_BASE));
      }
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      setListaUsuarios(USUARIOS_BASE);
      localStorage.setItem("listaUsuarios", JSON.stringify(USUARIOS_BASE));
    }
  }, []);

  useEffect(() => {
    if (listaUsuarios.length > 0) {
      localStorage.setItem("listaUsuarios", JSON.stringify(listaUsuarios));
    }
  }, [listaUsuarios]);

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

  const handleEditar = (id) => setEditandoId(id);

  const handleGuardarEdicion = (id) => {
    const usuarioEditado = listaUsuarios.find((u) => u.id === id);
    if (!usuarioEditado) return;

    const u = {
      ...usuarioEditado,
      nombre: usuarioEditado.nombre?.trim() || "",
      apellido: usuarioEditado.apellido?.trim() || "",
      correo: usuarioEditado.correo?.trim() || "",
      contraseña: usuarioEditado.contraseña?.trim() || "",
    };

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

    setListaUsuarios((prev) => prev.map((user) => (user.id === id ? u : user)));
    setEditandoId(null);
  };

  const handleEliminar = (id) => {
    if (window.confirm("¿Eliminar este usuario?")) {
      setListaUsuarios((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const handleCancelar = () => {
    setEditandoId(null);
    setNuevoUsuario(null);
  };

  return (
    <main className="ad-usr-page">
      <section className="ad-usr-container">
        <h2>Gestión de Usuarios</h2>

        <div className="table-responsive">
          <table className="ad-usr-table">
            <thead>
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
              {nuevoUsuario && (
                <tr className="ad-usr-new">
                  <td>
                    <input
                      type="text"
                      value={nuevoUsuario.id}
                      onChange={(e) =>
                        setNuevoUsuario({ ...nuevoUsuario, id: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
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
                      value={nuevoUsuario.contraseña}
                      onChange={(e) =>
                        setNuevoUsuario({
                          ...nuevoUsuario,
                          contraseña: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
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
                      className="ad-usr-btn blue"
                      onClick={handleGuardarNuevo}
                    >
                      Guardar
                    </button>
                    <button
                      className="ad-usr-btn gray"
                      onClick={handleCancelar}
                    >
                      Cancelar
                    </button>
                  </td>
                </tr>
              )}

              {listaUsuarios.map((usuario) =>
                editandoId === usuario.id ? (
                  <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>
                      <input
                        type="text"
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
                    <td>
                      <input
                        type="checkbox"
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
                        className="ad-usr-btn blue"
                        onClick={() => handleGuardarEdicion(usuario.id)}
                      >
                        Guardar
                      </button>
                      <button
                        className="ad-usr-btn gray"
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
                    <td>
                      <button
                        className="ad-usr-btn blue"
                        onClick={() => handleEditar(usuario.id)}
                      >
                        Editar
                      </button>
                      <button
                        className="ad-usr-btn red"
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

        <button className="ad-usr-btn green" onClick={handleAgregar}>
          Agregar Usuario
        </button>
      </section>
    </main>
  );
}
