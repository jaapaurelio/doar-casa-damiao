import Link from 'next/link';
import styles from './IbanPayment.module.css';

export default function MBWayPayment({ amount }) {
    return (
        <div className={styles.pageContainer}>
            <h2>Tranferência Bancária</h2>

            <div className={styles.pageText}>Faça a sua doação utilizando os seguintes dados.</div>
            <div className={styles.pageText}>
                Desde já agradecemos o seu contributo na vida destas crianças.
            </div>
            <div className={styles.mbwayData}>
                <div className={styles.mbTitles}>Nome:</div>
                <div> Centro Social Sagrados Corações / Casa Damião</div>
                <div className={styles.mbTitles}>Banco:</div>
                <div>Caixa Geral de Depósitos</div>
                <div className={styles.mbTitles}>BIC SWIFT:</div>
                <div>CGDIPTPL</div>
                <div className={styles.mbTitles}>IBAN:</div>
                <div>PT50 0035 0245 00000005530 37</div>
                {amount && (
                    <div>
                        <div className={styles.mbTitles}>Valor: </div>
                        <div>{amount}</div>
                    </div>
                )}
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
