import Head from "next/head";
import styled from 'styled-components';
import Header from "../RemoteModules/Header";
import Fulfilment from "../RemoteModules/Fulfilment";

const Container = styled.div`
  min-height: 100vh;
  background-color: #f9fafb;
`;

export default function Home() {
  const handleFulfil = (orderId: string) => {
    console.log('🏭 MF1 App: Orden procesada internamente:', orderId);
    alert(`MF1: Orden ${orderId} marcada como enviada desde la app standalone`);
  };

  const handleTrack = (orderId: string) => {
    console.log('🔍 MF1 App: Tracking solicitado internamente:', orderId);
    alert(`MF1: Mostrando tracking para orden ${orderId} desde la app standalone`);
  };

  return (
    <>
      <Head>
        <title>MF1 - Fulfilment App</title>
        <meta name="description" content="Aplicación de gestión de fulfilment" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header appName="MF1 - Fulfilment App" />
        <Fulfilment 
          onFulfil={handleFulfil}
          onTrack={handleTrack}
        />
      </Container>
    </>
  );
}
