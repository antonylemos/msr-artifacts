import styles from "./Cardapio.module.css";
import { pratos } from "@/utils/lista";

export default function Cardapio() {
    const adicionarPedido = (item) => {
        const event = new CustomEvent('adicionarPedido', { detail: item });
        window.dispatchEvent(event);
    };

    return (
        <div className={styles.background} >

            <h1 className={styles.title}>Cardápio</h1>
            <h2 className={styles.subTitle}>Faça o seu pedido</h2>

            <div className={styles.pratos}>
                {pratos.map((prato, index) => (
                    <div key={index} className={styles.cards}>

                        <img
                            src={`http://localhost:3001${prato.imagem}`}
                            alt={prato.nome}
                        />
                        <h3 >{prato.nome}</h3>
                        <p>{prato.descricao}</p>

                        <div className={styles.cardFooter}>
                            <strong>R$ {prato.preco.toFixed(2)}</strong>

                            <button
                                onClick={() =>
                                    window.top.dispatchEvent(
                                        new CustomEvent("adicionarCarrinho", {
                                            detail: {
                                                nome: prato.nome,
                                                preco: Number(prato.preco)
                                            }
                                        })
                                    )
                                }
                            >
                                +
                            </button>
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}
