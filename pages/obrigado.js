import Link from 'next/link';
import styles from './obrigado.module.css';

import Stats from '../components/Stats';

export default function ThanksPage() {
    return (
        <div className="pageWidthAlign">
            <h2 className={styles.title}>Obrigado pela sua doação</h2>

            <Stats showDonate={false}></Stats>

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
