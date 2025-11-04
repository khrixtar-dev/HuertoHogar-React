import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Tienda from "../src/pages/Tienda.jsx";

vi.mock("../public/js/productos_catalogo", () => {
  const mockProductos = [
    {
      id: "FR001", 
      nombre: "Manzanas Fuji", 
      precio: 1200, 
      imagen: "/img/productos_/manzanas_fuji.png", 
      descripcion: "Manzanas Fuji crujientes y dulces", 
      categoria: "fruta organica" 
    },
    {
      id: "VR004",
      nombre: "Lechuga Orgánica",
      precio: 600,
      imagen: "/img/productos_/lechuga_organica.png",
      descripcion: "Lechuga fresca y crujiente",
      categoria: "verdura organica"
    }
  ];
  
  return {
    PRODUCTOS: mockProductos,
    getProductos: vi.fn(() => mockProductos),
    getCategorias: vi.fn(() => ["fruta organica", "verdura organica"])
  };
});

vi.mock("../public/js/carrito", () => ({
  agregarAlCarrito: vi.fn()
}));

vi.mock("../src/pages/ProductModal", () => ({
  default: ({ show, onHide, producto }) => {
    if (!show || !producto) {
      return null;
    };
    return (
      <div data-testid="product-modal">
        <h3>{producto.nombre}</h3>
        <button onClick={onHide}>Cerrar</button>
      </div>
    );
  }
}));

import { agregarAlCarrito } from "../public/js/carrito";

describe("Componente Tienda", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("muestra productos mock", () => {
    render(<Tienda />);

    expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
    expect(screen.getByText("Lechuga Orgánica")).toBeInTheDocument();
  });

  test("abre modal al hacer click en Ver Producto", async () => {
    render(<Tienda />);
    const verProductoButtons = screen.getAllByText(/Ver Producto/i);
    fireEvent.click(verProductoButtons[0]);

    await waitFor(() => {
      expect(screen.getByTestId("product-modal")).toBeInTheDocument();
    });
  });

  test("agrega producto al carrito", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<Tienda />);
    
    const agregarButtons = screen.getAllByText(/Añadir al Carro/i);
    fireEvent.click(agregarButtons[0]);
    
    expect(agregarAlCarrito).toHaveBeenCalledWith("FR001");
    expect(logSpy).toHaveBeenCalledWith("Producto agregado al carrito:", "FR001");
    
    logSpy.mockRestore();
  });

  test("filtra productos por categoría", () => {
    render(<Tienda />);
    
    const select = screen.getByRole("combobox");

    fireEvent.change(select, { target: { value: "fruta organica" } });
    
    expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
    expect(screen.queryByText("Lechuga Orgánica")).not.toBeInTheDocument();
  });
});