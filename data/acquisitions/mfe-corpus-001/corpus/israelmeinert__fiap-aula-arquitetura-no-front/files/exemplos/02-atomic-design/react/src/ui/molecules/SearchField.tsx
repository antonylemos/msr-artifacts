import { TextInput } from '../atoms/TextInput';
import { Button } from '../atoms/Button';
export function SearchField({ value, onChange, onClear }: { value: string; onChange: (v: string) => void; onClear: () => void }) {
  return <div><label>Buscar evento<TextInput value={value} onChange={onChange} /></label><Button onClick={onClear}>Limpar busca</Button></div>;
}
