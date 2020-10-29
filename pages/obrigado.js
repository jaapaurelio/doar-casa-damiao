import Link from 'next/link';

export default function ThanksPage() {
    return (
        <div className="pageWidthAlign">
            <h1>Obrigado</h1>
            <p>Obrigado pela sua doação.</p>
            <Link href="/">
                <a>Página inicial</a>
            </Link>
        </div>
    );
}
