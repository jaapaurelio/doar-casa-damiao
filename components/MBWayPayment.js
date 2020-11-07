import Link from 'next/link';
import styles from './MBWayPayment.module.css';
import { formatNumberSpace } from '../helpers/utils';

export default function MBWayPayment({ phone, amount }) {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageLogo}>
                <img src="/images/icons/mbway.png"></img>
            </div>

            <div className={styles.pageText}>
                Confirme a sua doação na aplicação do MB Way do seu telemóvel.
            </div>
            <div className={styles.pageText}>
                Desde já agradecemos o seu contributo na vida das crianças da Casa Damião.
            </div>

            <div className={styles.mbwayData}>
                <table>
                    <tbody>
                        <tr>
                            <td className={styles.mbTitles}>Telemóvel:</td>
                            <td>{formatNumberSpace(phone)}</td>
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
