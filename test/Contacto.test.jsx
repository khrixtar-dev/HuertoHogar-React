import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import Contacto from "../src/pages/Contacto";
import { validarContacto } from "../public/js/validacion_contacto";

// 🧩 Mockeamos la función de validación real
vi.mock("../public/js/validacion_contacto", () => ({
  validarContacto: vi.fn(),
}));

describe("🧪 Componente Contacto", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renderiza correctamente los elementos del formulario", () => {
    render(<Contacto />);

    expect(screen.getByText(/Contáctanos/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Déjanos tu mensaje y te responderemos/i)
    ).toBeInTheDocument();

    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Mensaje/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Enviar/i })).toBeInTheDocument();
  });

  test("permite escribir en los campos del formulario", () => {
    render(<Contacto />);

    const nombreInput = screen.getByLabelText(/Nombre/i);
    const correoInput = screen.getByLabelText(/Correo electrónico/i);
    const mensajeTextarea = screen.getByLabelText(/Mensaje/i);

    fireEvent.change(nombreInput, { target: { value: "Juan Pérez" } });
    fireEvent.change(correoInput, { target: { value: "juan@mail.com" } });
    fireEvent.change(mensajeTextarea, {
      target: { value: "Hola, me interesa un producto" },
    });

    expect(nombreInput.value).toBe("Juan Pérez");
    expect(correoInput.value).toBe("juan@mail.com");
    expect(mensajeTextarea.value).toBe("Hola, me interesa un producto");
  });

  test("llama a validarContacto al enviar el formulario", () => {
    render(<Contacto />);

    const nombreInput = screen.getByLabelText(/Nombre/i);
    const correoInput = screen.getByLabelText(/Correo electrónico/i);
    const mensajeTextarea = screen.getByLabelText(/Mensaje/i);
    const boton = screen.getByRole("button", { name: /Enviar/i });

    fireEvent.change(nombreInput, { target: { value: "Juan" } });
    fireEvent.change(correoInput, { target: { value: "juan@mail.com" } });
    fireEvent.change(mensajeTextarea, {
      target: { value: "Mensaje de prueba" },
    });

    validarContacto.mockReturnValue(true); // simulamos validación correcta

    fireEvent.click(boton);

    expect(validarContacto).toHaveBeenCalledWith(
      "Juan",
      "juan@mail.com",
      "Mensaje de prueba"
    );
  });

  test("limpia los campos si la validación es exitosa", () => {
    render(<Contacto />);

    const nombreInput = screen.getByLabelText(/Nombre/i);
    const correoInput = screen.getByLabelText(/Correo electrónico/i);
    const mensajeTextarea = screen.getByLabelText(/Mensaje/i);
    const boton = screen.getByRole("button", { name: /Enviar/i });

    fireEvent.change(nombreInput, { target: { value: "Pedro" } });
    fireEvent.change(correoInput, { target: { value: "pedro@mail.com" } });
    fireEvent.change(mensajeTextarea, {
      target: { value: "Consulta general" },
    });

    validarContacto.mockReturnValue(true);

    fireEvent.submit(boton);

    expect(nombreInput.value).toBe("");
    expect(correoInput.value).toBe("");
    expect(mensajeTextarea.value).toBe("");
  });

  test("no limpia los campos si la validación falla", () => {
    render(<Contacto />);

    const nombreInput = screen.getByLabelText(/Nombre/i);
    const correoInput = screen.getByLabelText(/Correo electrónico/i);
    const mensajeTextarea = screen.getByLabelText(/Mensaje/i);
    const boton = screen.getByRole("button", { name: /Enviar/i });

    fireEvent.change(nombreInput, { target: { value: "Ana" } });
    fireEvent.change(correoInput, { target: { value: "correo_invalido" } });
    fireEvent.change(mensajeTextarea, { target: { value: "" } });

    validarContacto.mockReturnValue(false);

    fireEvent.submit(boton);

    expect(nombreInput.value).toBe("Ana");
    expect(correoInput.value).toBe("correo_invalido");
    expect(mensajeTextarea.value).toBe("");
  });
});
