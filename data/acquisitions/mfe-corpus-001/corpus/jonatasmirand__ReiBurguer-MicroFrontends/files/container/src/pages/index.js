import dynamic from "next/dynamic";
import styles from "../styles/Home.module.css";

// Importação dinâmica
const Cardapio = dynamic(() => import("cardapio/Cardapio"), { ssr: false });
const Pedido = dynamic(() => import("pedido/Pedido"), { ssr: false });

export default function Home() {
  return (
    <div className={styles.container}>

      <img
        className={styles.logo}
        src="/assets/ReiBurguer.webp"
        width={200}
        height={200}
        alt="Logo"
      />

      <Cardapio />

      <div style={{ height: "20px" }}></div>

      <div className={styles.section}>
        <Pedido />
      </div>
    </div>
  );
}
