import { useState } from 'react';
import { SearchField } from '../ui/molecules/SearchField';
import { EventList } from '../ui/organisms/EventList';
import { CatalogTemplate } from '../ui/templates/CatalogTemplate';
export function App() {
  const [busca, setBusca] = useState('');
  const titulos = ['React Day', 'Angular Day'].filter(t => t.toLowerCase().includes(busca.toLowerCase()));
  return <CatalogTemplate busca={<SearchField value={busca} onChange={setBusca} onClear={() => setBusca('')} />} lista={<EventList titulos={titulos} />} />;
}
