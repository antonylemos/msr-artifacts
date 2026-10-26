interface CharacterCountProps {
  count: number;
}

export const CharacterCount = ({ count }: CharacterCountProps) => {
  return (
    <div className="flex text-h3 font-bold mb-8 justify-end items-center gap-2">
      <span className="text-h2 text-design-neutral-800">{count}</span>
      <span className="text-h3 text-design-neutral-600">personajes</span>
    </div>
  );
};