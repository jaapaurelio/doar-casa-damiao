import React from 'react';
import styles from './Donations.module.css';

export const Donations = ({ list, onDelete }) => {
    const onDeleteHandler = id => () => onDelete(id)

    return <div>
        <h3>Lista de Doações</h3>
        <table className={styles.table} >
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Valor</th>
                    <th>Details</th>
                    <th>Pago</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {list.map(donation => <tr key={donation.id}>
                    <td>{donation.anonym ? <span className={styles.anonymous}>Anónimo</span> : donation.donor_name}</td>
                    <td>{donation.total_amount/100} €</td>
                    <td className={styles.details} >
                        <span>{donation.payment_method}</span>
                        <span>{donation.email}</span>
                        <span>{donation.created_at.slice(0, 19).replace('T', ' ')}</span>
                    </td>
                    <td>{donation.payed ? <span className={styles.payed}>Sim</span> : <span className={styles.notPayed}>Não</span>}</td>
                    <td>
                        <button onClick={onDeleteHandler(donation.id)}>X</button>
                    </td>
                </tr>)}
                {list.length === 0 && <tr><td colSpan="5">Sem Resultados</td></tr>}
            </tbody>
        </table>
    </div>
}