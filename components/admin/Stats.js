import React, { useEffect, useState } from 'react';
import pipe from 'lodash/fp/pipe';
import groupBy from 'lodash/fp/groupBy';
import mapValues from 'lodash/fp/mapValues';
import toPairs from 'lodash/fp/toPairs';
import map from 'lodash/fp/map';
import orderBy from 'lodash/fp/orderBy';
import styles from './Stats.module.css';

export const Stats = ({ stats, list }) => {
    const [nMbWay, setNMbWay] = useState(0);
    const [nMultibanco, setNMultibanco] = useState(0);
    const [nCard, setNCard] = useState(0);
    const [nManual, setNManual] = useState(0);
    const [paymentsByAmount, setPaymentsByAmount] = useState([]);

    useEffect(() => {
        const paymentsByAmount = pipe(
            groupBy('total_amount'),
            mapValues((val) => val.length),
            toPairs,
            map((val) => ({ amount: parseInt(val[0]), payments: val[1] })),
            orderBy(['payments'], ['desc'])
        )(list);
        setNMbWay(list.filter((donation) => donation.payment_method === 'mbway').length);
        setNMultibanco(list.filter((donation) => donation.payment_method === 'multibanco').length);
        setNCard(list.filter((donation) => donation.payment_method === 'card').length);
        setNManual(list.filter((donation) => donation.from_site === 'iban').length);
        setPaymentsByAmount(paymentsByAmount);
    }, [list]);

    return (
        <div className={styles.container}>
            <h3>Stats</h3>
            <div className={styles.stats}>
                <div>
                    <h3>Em números</h3>
                    <span>Número Histórias: {stats.n_stories}</span>
                    <span>Número Doações: {stats.n_donations}</span>
                    <span>Total angariado: {stats.total_donated / 100}€</span>
                </div>
                <div>
                    <h3>Formas de pagamento</h3>
                    <span>MB Way: {nMbWay}</span>
                    <span>Multibanco: {nMultibanco}</span>
                    <span>Cartão: {nCard}</span>
                    <span>Manual: {nManual}</span>
                </div>
                <div>
                    <h3>Valor / Número de pagamentos</h3>
                    <ul>
                        {paymentsByAmount.map((val) => (
                            <li key={val.amount}>
                                <span>{val.amount / 100}€</span> -&gt; <b>{val.payments}</b>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
