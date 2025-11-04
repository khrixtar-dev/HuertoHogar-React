import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Home from "../src/pages/Home.jsx";
import { agregarAlCarrito } from "../public/js/carrito";
import { getProductos } from "../public/js/productos_catalogo";

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
    },
    {
      id: "PO001",
      nombre: "Miel Orgánica",
      precio: 1200,
      imagen: "/img/productos_/miel_organica.png",
      descripcion: "Miel 100% natural",
      categoria: "producto organico"
    },
    {
      id: "PL001",
      nombre: "Leche Entera",
      precio: 2000,
      imagen: "/img/productos_/leche_entera.png",
      descripcion: "Leche entera fresca",
      categoria: "productos lacteos"
    }
  ];
  
  return {
    getProductos: vi.fn(() => mockProductos),
    getProductoRandom: vi.fn((array, cantidad) => mockProductos.slice(0, cantidad))
  };
});

vi.mock("../public/js/carrito", () => ({
  agregarAlCarrito: vi.fn()
}));

vi.mock("../src/pages/ProductModal", () => ({
  default: ({ show, onHide, producto, onAgregarCarrito }) => {
    if (!show || !producto) {
      return null;
    }
    return (
      <div data-testid="product-modal">
        <h3>{producto.nombre}</h3>
        <button onClick={onHide}>Cerrar</button>
        <button onClick={() => onAgregarCarrito(producto.id)}>Agregar desde Modal</button>
      </div>
    );
  }
}));




describe("Componente Home", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });


  test("muestra productos recomendados", () => {
    render(<Home />);
    // Verifica que aparecen los productos mock
    expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
    expect(screen.getByText("Lechuga Orgánica")).toBeInTheDocument();
    expect(screen.getByText("Miel Orgánica")).toBeInTheDocument();
    expect(screen.getByText("Leche Entera")).toBeInTheDocument();
  });

  test("agrega producto al carrito desde el card", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<Home />);
    
    const agregarButtons = screen.getAllByText("Añadir al Carro");
    fireEvent.click(agregarButtons[0]);
    
    expect(agregarAlCarrito).toHaveBeenCalledWith("FR001");
    expect(logSpy).toHaveBeenCalledWith("Producto agregado al carrito:", "FR001");
    expect(getProductos).toHaveBeenCalled();
    
    logSpy.mockRestore();
  });

  test("agrega producto al carrito desde modal", async () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    render(<Home />);
    
    // Abre el modal
    const verProductoButtons = screen.getAllByText("Ver Producto");
    fireEvent.click(verProductoButtons[0]);
    
    await waitFor(() => {
      expect(screen.getByTestId("product-modal")).toBeInTheDocument();
    });
    
    // Agrega desde el modal
    fireEvent.click(screen.getByText("Agregar desde Modal"));
    
    expect(agregarAlCarrito).toHaveBeenCalledWith("FR001");
    expect(logSpy).toHaveBeenCalledWith("Producto agregado al carrito:", "FR001");
    
    logSpy.mockRestore();
  });

});