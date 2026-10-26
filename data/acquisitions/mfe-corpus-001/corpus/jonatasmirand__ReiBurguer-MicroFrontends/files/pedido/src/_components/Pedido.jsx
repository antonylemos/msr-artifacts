import { useState, useEffect } from "react";
import styles from "./Pedido.module.css";

export default function Pedido() {
    const [itens, setItens] = useState([]);

    useEffect(() => {
        const handler = (e) => {
            const { nome, preco } = e.detail;
            setItens((prev) => [...prev, e.detail]);
        };

        window.addEventListener("adicionarCarrinho", handler);

        return () => window.removeEventListener("adicionarCarrinho", handler);
    }, []);

    const total = itens.reduce((acc, item) => acc + (item.preco || 0), 0);

    return (
        <div className={styles.container}>
            <h2 className={styles.title}>Pedidos</h2>

            {itens.length === 0 ? (
                <p className={styles.empty}>Nenhum item adicionado ainda.</p>
            ) : (
                <ul className={styles.list}>
                    {itens.map((item, idx) => (
                        <li key={idx} className={styles.item}>
                            <span>{item.nome}</span>
                            <strong>R$ {item.preco.toFixed(2)}</strong>
                        </li>
                    ))}
                </ul>
            )}


            <div className={styles.totalBox}>
                <span className={styles.totalLabel}>Total:</span>
                <span className={styles.totalValue}>R$ {total.toFixed(2)}</span>
            </div>
        </div>
    );
}