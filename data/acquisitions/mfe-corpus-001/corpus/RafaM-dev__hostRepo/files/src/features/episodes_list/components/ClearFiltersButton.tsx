interface ClearFiltersButtonProps {
  onClick: () => void;
}

export const ClearFiltersButton = ({ onClick }: ClearFiltersButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="mt-4 px-6 py-2 bg-neutral-50 text-design-neutral-700  cursor-pointer font-bold rounded-xl "
    >
      Limpiar filtros
    </button>
  );
};
