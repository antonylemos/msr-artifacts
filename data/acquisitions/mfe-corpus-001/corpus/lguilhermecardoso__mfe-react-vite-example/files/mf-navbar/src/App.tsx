
import Navbar from "./Navbar";

// Mock para desenvolvimento local
const MOCK_USER = {
  username: "TesteUser"
};

function handleLogout() {
  // Aqui você pode limpar o storage/localStorage ou chamar uma função do root-app
  alert("Logout!");
}

export default function App() {
  // Em produção, user e onLogout viriam via props do root-app ou de um context global
  const user = MOCK_USER;

  return (
    <div>
      <Navbar user={user} onLogout={handleLogout} />
      {/* O resto da MFE pode ficar vazio, já que esse microfrontend só expõe a Navbar */}
    </div>
  );
}
