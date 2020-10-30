import Link from 'next/link';
import styles from './MultibancoPayment.module.css';

function formatMBReference(reference) {
    var parts = reference.match(/.{1,3}/g);
    return parts.join(' ');
}

export default function MultibancoPayment({ entity, reference, amount }) {
    return (
        <div className={styles.multibancoPage}>
            <div className={styles.pageLogo}>
                <img src="/images/icons/multibanco.png"></img>
            </div>

            <div className={styles.pageText}>
                Confirme a sua doação utilizando os seguintes dados num terminal Multibanco ou no
                seu Home Banking.
            </div>
            <div className={styles.pageText}>
                Desde já agradecemos o seu contributo na vida destas crianças.
            </div>

            <div className={styles.mbData}>
                <table>
                    <tbody>
                        <tr>
                            <td className={styles.mbTitles}>Entidade:</td>
                            <td>{entity}</td>
                        </tr>
                        <tr>
                            <td className={styles.mbTitles}>Referêcia:</td>
                            <td>{formatMBReference(reference)}</td>
                        </tr>
                        <tr>
                            <td className={styles.mbTitles}>Valor:</td>
                            <td>{amount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={styles.buttonContainer}>
                <Link href="/">
                    <button className="btn-primary">
                        <span>Concluir</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}
