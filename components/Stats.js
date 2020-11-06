import React, { useEffect, useState } from 'react';
import styles from './Stats.module.css';
import Link from 'next/link';


const formatter = new Intl.NumberFormat('pt-PT', {
    style: 'currency',
    currency: 'EUR',
});

export default function Stats() {
    const [ data, setData ] = useState({ nStories: 0, nDonations: 0, totalDonated: 0 })
    
    useEffect(() => {
        fetch('/api/stats')
            .then((response) => response.json())
            .then(response => {
                const { status, data } = response;
                if(status !== 'error') {
                    setData({
                        nDonations: data.n_donations,
                        nStories: data.n_stories,
                        totalDonated: data.total_donated ? data.total_donated / 100 : 0,
                    })
                }
            })
    }, [])

    return (
        <div className={styles.container}>
            <div className={styles.containerCard}>
                <img src="/images/heart-pulsing.gif"></img>
                <div className={styles.lineContainer}>
                    <div className={styles.line}>
                        <span className={styles.strong}>{data.nStories}</span> histórias criadas.
                    </div>
                    <div className={styles.line}>
                        <span className={styles.strong}>{data.nDonations}</span> doações.
                    </div>
                    <div className={styles.line}>
                        <span className={styles.strong}>{formatter.format(data.totalDonated)}</span> angariados.
                    </div>
                </div>
                <div className={styles.actionButton}>
                    <Link href="/doar">
                        <button className="btn-primary">Doar</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
