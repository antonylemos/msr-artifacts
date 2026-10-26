import { createRoot } from 'react-dom/client';
import { App } from './App';
export async function mount(host: HTMLElement): Promise<() => void> {
  const root = createRoot(host); root.render(<App />);
  return () => root.unmount();
}
