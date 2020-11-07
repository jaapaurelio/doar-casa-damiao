import Link from 'next/link';
import styles from './MultibancoPayment.module.css';
import { formatNumberSpace } from '../../helpers/utils';

export default function MultibancoPayment({ entity, reference, amount }) {
    return (
        <div className={styles.pageConainer}>
            <div className={styles.pageLogo}>
                <img src="/images/icons/multibanco.png"></img>
            </div>

            <div className={styles.pageText}>
                Confirme a sua doação utilizando os seguintes dados num terminal Multibanco ou no
                seu Home Banking.
            </div>
            <div className={styles.pageText}>
                Desde já agradecemos o seu contributo na vida das crianças da Casa Damião.
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
                            <td>{formatNumberSpace(reference)}</td>
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
                    <button className="btn-secondary">
                        <span>Concluir</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}
