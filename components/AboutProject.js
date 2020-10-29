import styles from './AboutProject.module.css';
import Image from './Image';
import Title from './Title';
import Link from 'next/link';

export default function AboutProject() {
    return (
        <div>
            <Image
                src="/images/criancas.jpg"
                label="Usame, Botengue, Kamira, Lara e Felix."></Image>
            <Title mainText="Como criamos as" subText="nossas histórias?"></Title>
            <div>
                As crianças da Casa Damião escolheram as personagens, os locais e as descrições.
                Agora tu escolhes como tudo se liga.
            </div>
            <div className={styles.actionButton}>
                <Link href="/aminhahistoria">
                    <button className="btn-secondary">Criar História</button>
                </Link>
            </div>
        </div>
    );
}
