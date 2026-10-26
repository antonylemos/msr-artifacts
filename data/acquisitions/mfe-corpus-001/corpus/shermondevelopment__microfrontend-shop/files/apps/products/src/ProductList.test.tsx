import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import ProductsList from "./ProductsList";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";

vi.mock("@tanstack/react-query", () => ({
  useQuery: vi.fn(),
}));

vi.mock("@microfrontend/ui", () => ({
  ProductSkeleton: () => <div data-testid="product-skeleton" />,
}));

vi.mock("./components/Product", () => ({
  ProductCard: ({ name }: { name: string }) => (
    <div data-testid="product-card">{name}</div>
  ),
}));

const mockedUseQuery = vi.mocked(useQuery);

const loadingResult: UseQueryResult<unknown, Error> = {
  data: undefined,
  error: null,
  isLoading: true,
  isError: false,
  isSuccess: false,
  isPending: true,
  status: "pending",
  fetchStatus: "fetching",
} as UseQueryResult<unknown, Error>;

mockedUseQuery.mockReturnValue(loadingResult);

describe("ProductsList", () => {
  it("renders skeleton while loading", () => {
    mockedUseQuery.mockReturnValue({
      isLoading: true,
      error: null,
      data: undefined,
    } as ReturnType<typeof useQuery>);

    render(<ProductsList />);

    expect(screen.getByTestId("product-skeleton")).toBeInTheDocument();
  });

  it("renders error message", () => {
    mockedUseQuery.mockReturnValue({
      isLoading: false,
      error: new Error("erro"),
      data: undefined,
    } as ReturnType<typeof useQuery>);

    render(<ProductsList />);

    expect(
      screen.getByText(/nao foi possivel carregar os produtos/i),
    ).toBeInTheDocument();
  });
  it("renders products", () => {
    mockedUseQuery.mockReturnValue({
      isLoading: false,
      error: null,
      data: {
        products: [
          { id: 1, title: "iPhone" },
          { id: 2, title: "MacBook" },
        ],
      },
    } as ReturnType<typeof useQuery>);

    render(<ProductsList />);

    expect(screen.getAllByTestId("product-card")).toHaveLength(2);
  });
});
