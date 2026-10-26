import Layout from "./Layout";
import Router from "./router";
import { AuthProvider } from "./store/authStore";

function App() {
  return (
    <AuthProvider>
      <Layout>
        <Router />
      </Layout>
    </AuthProvider>
  );
}

export default App;
