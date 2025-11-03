import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import LoginCliente from "../src/pages/LoginClientes.jsx";

// 🧩 MOCKS ------------------------------------------------------------

vi.mock("sweetalert2", () => ({
  __esModule: true,
  default: { fire: vi.fn() },
}));

// Mock de navigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../public/js/validacionesLogin.js", () => ({
  validarLogin: vi.fn(),
  validarPermisos: vi.fn(),
}));

vi.mock("../public/js/persistenciaLogin.js", () => ({
  obtenerUsuarios: vi.fn(),
  setSesion: vi.fn(),
}));

import Swal from "sweetalert2";
import {
  validarLogin,
  validarPermisos,
} from "../public/js/validacionesLogin.js";
import { obtenerUsuarios, setSesion } from "../public/js/persistenciaLogin.js";

// 🧪 TESTS ------------------------------------------------------------

describe("🧪 Componente LoginCliente", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderLogin = () =>
    render(
      <MemoryRouter>
        <LoginCliente />
      </MemoryRouter>
    );

  test("🔴 muestra errores de validación cuando los campos son inválidos", async () => {
    validarLogin.mockReturnValue(["Correo inválido", "Contraseña vacía"]);

    renderLogin();
    fireEvent.submit(screen.getByRole("button", { name: /ingresar/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: "error",
          title: "Errores de validación",
        })
      );
    });
  });

  test("🔴 muestra error cuando el usuario no existe", async () => {
    validarLogin.mockReturnValue([]);
    obtenerUsuarios.mockReturnValue([
      { correo: "otro@mail.com", contraseña: "1234" },
    ]);

    renderLogin();
    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: "test@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "abcd" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /ingresar/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: "error",
          title: "Credenciales incorrectas",
        })
      );
    });
  });

  test("🟠 muestra advertencia si el usuario no tiene permisos", async () => {
    validarLogin.mockReturnValue([]);
    obtenerUsuarios.mockReturnValue([
      { correo: "user@mail.com", contraseña: "1234", rol: "admin" },
    ]);
    validarPermisos.mockReturnValue("Solo clientes pueden acceder.");

    renderLogin();
    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: "user@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "1234" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /ingresar/i }));

    await waitFor(() => {
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: "warning",
          title: "Acceso restringido",
        })
      );
    });
  });

  test("✅ inicia sesión correctamente, guarda sesión y ejecuta navigate + dispatchEvent", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });

    validarLogin.mockReturnValue([]);
    obtenerUsuarios.mockReturnValue([
      {
        correo: "cliente@mail.com",
        contraseña: "abcd",
        nombre: "Nico",
        rol: "cliente",
      },
    ]);
    validarPermisos.mockReturnValue(null);

    const mockDispatch = vi.fn();
    window.dispatchEvent = mockDispatch;

    renderLogin();

    fireEvent.change(screen.getByPlaceholderText(/correo/i), {
      target: { value: "cliente@mail.com" },
    });
    fireEvent.change(screen.getByPlaceholderText(/contraseña/i), {
      target: { value: "abcd" },
    });
    fireEvent.submit(screen.getByRole("button", { name: /ingresar/i }));

    await waitFor(() => {
      expect(setSesion).toHaveBeenCalledTimes(1);
      expect(Swal.fire).toHaveBeenCalledWith(
        expect.objectContaining({
          icon: "success",
          title: expect.stringMatching(/bienvenido/i),
        })
      );
    });

    // Ejecutar inmediatamente todos los temporizadores pendientes
    vi.runAllTimers();

    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(mockDispatch).toHaveBeenCalledWith(expect.any(Event));

    vi.useRealTimers();
  });
});
