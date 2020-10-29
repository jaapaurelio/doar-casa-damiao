import React from 'react';
import styles from '../styles/Payment.module.css';
import { useRouter } from 'next/router';

import MultibancoPaymento from '../components/MultibancoPayment';

export default function PaymentPage() {
    const router = useRouter();
    const { type, entity, reference, amount } = router.query;
    return (
        <div className={styles.container}>
            {type == 'mb' && (
                <MultibancoPaymento
                    entity={entity}
                    reference={reference}
                    amount={amount}></MultibancoPaymento>
            )}
        </div>
    );
}
