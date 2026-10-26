import Dashboard from "./Dashboard";

const MOCK_USER = { username: "DevUser" };
const MOCK_TOKEN = "mock.token.here";

export default function App() {
  return <Dashboard user={MOCK_USER} token={MOCK_TOKEN} />;
}