import { createRoot } from 'react-dom/client';
import { App } from './App';
import '../../../../material/estilos.css';
const host = document.getElementById('root');
if (!host) throw new Error('Elemento root ausente');
createRoot(host).render(<App />);
