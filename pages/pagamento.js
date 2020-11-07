import React from 'react';
import styles from './pagamento.module.css';
import { useRouter } from 'next/router';

import MultibancoPayment from '../components/MultibancoPayment';
import MBWayPayment from '../components/MBWayPayment';
import IbanPayment from '../components/IbanPayment';

export default function PaymentPage() {
    const router = useRouter();
    const { type, entity, reference, amount, phone } = router.query;
    return (
        <div className={styles.container}>
            {type == 'mb' && (
                <MultibancoPayment
                    entity={entity}
                    reference={reference}
                    amount={amount}></MultibancoPayment>
            )}
            {type == 'mbway' && <MBWayPayment phone={phone} amount={amount}></MBWayPayment>}
            {type == 'iban' && <IbanPayment amount={amount}></IbanPayment>}
        </div>
    );
}
