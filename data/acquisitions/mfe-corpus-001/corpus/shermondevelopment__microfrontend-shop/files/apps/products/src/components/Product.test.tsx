import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ProductCard } from "./Product";

describe("ProductCard", () => {
  const mockProduct = {
    image: "https://test.com/image.png",
    name: "Arroz Integral",
    weight: 1,
    price: 10,
    id: 1,
  };

  it("renders product information correctly", () => {
    render(<ProductCard {...mockProduct} />);

    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByAltText("Arroz Integral")).toBeInTheDocument();

    expect(screen.getByText("Arroz Integral")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("R$ 10,00")).toBeInTheDocument();
  });

  it("formats price in BRL correctly", () => {
    render(<ProductCard {...mockProduct} />);

    expect(screen.getByText("R$ 10,00")).toBeInTheDocument();
  });

  it("renders image with correct src and alt", () => {
    render(<ProductCard {...mockProduct} />);

    const image = screen.getByAltText("Arroz Integral");

    expect(image).toHaveAttribute("src", mockProduct.image);
  });
});
