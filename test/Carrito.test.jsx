import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import Carrito from "../src/pages/Carrito.jsx";

vi.mock("../public/js/productos_catalogo", () => {
  const mockProductos = [
    {
      id: "FR001", 
      nombre: "Manzanas Fuji", 
      precio: 1200, 
      imagen: "/img/productos_/manzanas_fuji.png", 
      descripcion: "Manzanas Fuji crujientes y dulces" 
    },
    {
      id: "VR004",
      nombre: "Lechuga Orgánica",
      precio: 600,
      imagen: "/img/productos_/lechuga_organica.png",
      descripcion: "Lechuga fresca y crujiente"
    }
  ];
  
  return {
    PRODUCTOS: mockProductos,
    getProductos: vi.fn(() => mockProductos)
  };
});

vi.mock("../public/js/carrito", () => ({
  obtenerCarrito: vi.fn(), 
  agregarAlCarrito: vi.fn(), 
  quitarDelCarrito: vi.fn(), 
  eliminarDelCarrito: vi.fn() 
}));

import { obtenerCarrito, agregarAlCarrito, quitarDelCarrito, eliminarDelCarrito } from "../public/js/carrito";

describe("Componente Carrito", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("muestra productos en el carrito correctamente", () => {

    obtenerCarrito.mockReturnValue([
      { id: "FR001", cantidad: 2 },
      { id: "VR004", cantidad: 1 }
    ]);
    
    render(<Carrito />);
    
    expect(screen.getByText("Mi Carrito")).toBeInTheDocument();
    expect(screen.getByText("Manzanas Fuji")).toBeInTheDocument();
    expect(screen.getByText("Lechuga Orgánica")).toBeInTheDocument();

    expect(screen.getByText("Productos (3 items)")).toBeInTheDocument();
  });


  test("agrega producto al hacer click en +", () => {
    obtenerCarrito.mockReturnValue([
      { id: "FR001", cantidad: 1 } 
    ]);
    
    render(<Carrito />);
    const botonMas = screen.getByText("+");
    fireEvent.click(botonMas);
    
    expect(agregarAlCarrito).toHaveBeenCalledWith("FR001");
  });

  test("quita producto al hacer click en -", () => {
    obtenerCarrito.mockReturnValue([
      { id: "FR001", cantidad: 2 }
    ]);
    
    render(<Carrito />);
    
    const botonMenos = screen.getByText("-");
    fireEvent.click(botonMenos);
    
    expect(quitarDelCarrito).toHaveBeenCalledWith("FR001");
  });
});