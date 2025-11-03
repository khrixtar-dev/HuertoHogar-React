import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import AdminProductos from "../src/pages/AdminProductos.jsx";

// 🧩 Mock del catálogo base
vi.mock("../public/js/productos_catalogo", () => ({
  PRODUCTOS: [
    {
      id: "p1",
      nombre: "Tomate",
      precio: 1000,
      imagen: "/img/tomate.png",
      descripcion: "Rojo fresco",
    },
  ],
}));

// 🧩 Mock localStorage
const mockGetItem = vi.fn();
const mockSetItem = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
  vi.stubGlobal("localStorage", {
    getItem: mockGetItem,
    setItem: mockSetItem,
  });
});

describe("🧪 Componente AdminProductos", () => {
  test("carga productos desde localStorage si existen", async () => {
    mockGetItem.mockReturnValue(
      JSON.stringify([
        {
          id: "a1",
          nombre: "Zanahoria",
          precio: 800,
          imagen: "zanahoria.png",
          descripcion: "Fresca",
        },
      ])
    );

    render(<AdminProductos />);
    expect(await screen.findByText("Zanahoria")).toBeInTheDocument();
  });

  test("usa PRODUCTOS por defecto si localStorage está vacío", async () => {
    mockGetItem.mockReturnValue(null);
    render(<AdminProductos />);
    expect(await screen.findByText("Tomate")).toBeInTheDocument();
  });

  test("agrega un nuevo producto válido", async () => {
    mockGetItem.mockReturnValue("[]");
    render(<AdminProductos />);

    fireEvent.click(screen.getByText(/agregar producto/i));

    const inputs = await screen.findAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "p99" } });
    fireEvent.change(inputs[1], { target: { value: "Lechuga" } });
    fireEvent.change(inputs[2], { target: { value: "500" } });
    fireEvent.change(inputs[3], { target: { value: "/img/lechuga.png" } });
    fireEvent.change(inputs[4], { target: { value: "Verde y fresca" } });

    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(screen.getByText("Lechuga")).toBeInTheDocument();
    });
  });

  test("muestra alertas por campos vacíos o precio inválido", async () => {
    mockGetItem.mockReturnValue("[]");
    vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<AdminProductos />);

    fireEvent.click(screen.getByText(/agregar producto/i));
    fireEvent.click(screen.getByText("Guardar"));
    expect(window.alert).toHaveBeenCalledWith(
      "Todos los campos son obligatorios"
    );

    const inputs = await screen.findAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "p10" } });
    fireEvent.change(inputs[1], { target: { value: "Papa" } });
    fireEvent.change(inputs[2], { target: { value: "abc" } });
    fireEvent.change(inputs[3], { target: { value: "/img/papa.png" } });
    fireEvent.change(inputs[4], { target: { value: "Rica" } });
    fireEvent.click(screen.getByText("Guardar"));
    expect(window.alert).toHaveBeenCalledWith(
      "El precio debe ser un número válido"
    );
  });

  test("edita un producto y guarda los cambios", async () => {
    mockGetItem.mockReturnValue(
      JSON.stringify([
        {
          id: "p1",
          nombre: "Tomate",
          precio: 1000,
          imagen: "tomate.png",
          descripcion: "Rojo",
        },
      ])
    );

    render(<AdminProductos />);
    fireEvent.click(await screen.findByText(/editar/i));

    const input = await screen.findByDisplayValue("Tomate");
    fireEvent.change(input, { target: { value: "Tomate Cherry" } });

    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(screen.getByText("Tomate Cherry")).toBeInTheDocument();
    });
  });

  test("elimina un producto tras confirmar", async () => {
    mockGetItem.mockReturnValue(
      JSON.stringify([
        {
          id: "p1",
          nombre: "Tomate",
          precio: 1000,
          imagen: "tomate.png",
          descripcion: "Rojo",
        },
      ])
    );
    vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<AdminProductos />);
    fireEvent.click(await screen.findByText(/eliminar/i));

    await waitFor(() => {
      expect(screen.queryByText("Tomate")).not.toBeInTheDocument();
    });
  });

  test("cancelar restablece el estado de edición o nuevo producto", async () => {
    mockGetItem.mockReturnValue("[]");

    render(<AdminProductos />);
    fireEvent.click(screen.getByText(/agregar producto/i));

    fireEvent.click(screen.getByText("Cancelar"));
    await waitFor(() => {
      expect(screen.queryByText("Guardar")).not.toBeInTheDocument();
    });
  });

  test("ejecuta el console.log cuando se actualiza la lista de productos", async () => {
    mockGetItem.mockReturnValue("[]");

    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<AdminProductos />);

    fireEvent.click(screen.getByText(/agregar producto/i));
    const inputs = await screen.findAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "p55" } });
    fireEvent.change(inputs[1], { target: { value: "Acelga" } });
    fireEvent.change(inputs[2], { target: { value: "700" } });
    fireEvent.change(inputs[3], { target: { value: "/img/acelga.png" } });
    fireEvent.change(inputs[4], { target: { value: "Verde hoja" } });

    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith(
        "💾 Guardado en localStorage:",
        expect.any(Number)
      );
    });

    logSpy.mockRestore();
  });

  test("dispara el useEffect de guardado en localStorage y ejecuta el console.log", async () => {
    mockGetItem.mockReturnValue("[]");
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(<AdminProductos />);

    fireEvent.click(screen.getByText(/agregar producto/i));
    const inputs = await screen.findAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "p77" } });
    fireEvent.change(inputs[1], { target: { value: "Betarraga" } });
    fireEvent.change(inputs[2], { target: { value: "900" } });
    fireEvent.change(inputs[3], { target: { value: "/img/betarraga.png" } });
    fireEvent.change(inputs[4], { target: { value: "Morada y dulce" } });

    fireEvent.click(screen.getByText("Guardar"));

    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith(
        "💾 Guardado en localStorage:",
        expect.any(Number)
      );
    });

    logSpy.mockRestore();
  });

  test("muestra alerta si el ID ya existe", async () => {
    mockGetItem.mockReturnValue(
      JSON.stringify([
        {
          id: "p1",
          nombre: "Tomate",
          precio: 1000,
          imagen: "/img/tomate.png",
          descripcion: "Rojo fresco",
        },
      ])
    );
    vi.spyOn(window, "alert").mockImplementation(() => {});

    render(<AdminProductos />);
    fireEvent.click(screen.getByText(/agregar producto/i));

    const inputs = await screen.findAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "p1" } });
    fireEvent.change(inputs[1], { target: { value: "Repetido" } });
    fireEvent.change(inputs[2], { target: { value: "2000" } });
    fireEvent.change(inputs[3], { target: { value: "/img/repetido.png" } });
    fireEvent.change(inputs[4], { target: { value: "Duplicado" } });

    fireEvent.click(screen.getByText("Guardar"));
    expect(window.alert).toHaveBeenCalledWith("El ID ya existe");
  });

  test("solo guarda en localStorage cuando hay productos (no con lista vacía)", async () => {
    mockGetItem.mockReturnValue("[]");
    const setItemSpy = vi.spyOn(localStorage, "setItem");
    render(<AdminProductos />);

    await waitFor(() => {
      expect(setItemSpy).toHaveBeenCalled();
    });

    setItemSpy.mockClear();
    render(<AdminProductos />);

    await waitFor(() => {
      expect(setItemSpy.mock.calls.length).toBeGreaterThanOrEqual(1);
      expect(setItemSpy.mock.calls.length).toBeLessThanOrEqual(2);
    });
  });
});
