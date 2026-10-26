import ReactDOM from "react-dom/client";
import styled from "styled-components";
import AlertSender from "AlertSender/AlertSender";
import AlertDashboard from "AlertDashboard/AlertDashboard";

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  margin: 0;
  font-size: 2rem;
  font-weight: 600;
`;

const Subtitle = styled.p`
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
  font-size: 1rem;
`;

const MainContent = styled.main`
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    padding: 1rem;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
`;

const App = () => (
  <AppContainer>
    <Header>
      <Title>Sistema de Alertas Académicas</Title>
      <Subtitle>Arquitectura Microfrontend</Subtitle>
    </Header>
    <MainContent>
      <Section>
        <AlertSender />
      </Section>
      <Section>
        <AlertDashboard />
      </Section>
    </MainContent>
  </AppContainer>
);

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);