import React from 'react';
import styles from './PageFooter.module.css';
const links = [
    {
        label: 'Sobre nós',
        href: '//casadamiao.pt/acasadamiao/',
    },
    {
        label: 'Visão, Missão, Valores',
        href: '//casadamiao.pt/visao-missao-e-valores/',
    },
    {
        label: 'Parceiros',
        href: '//casadamiao.pt/parceiros/',
    },
    {
        label: 'Como Ajudar',
        href: '//casadamiao.pt/ajudar/',
    },
    {
        label: 'Contactos',
        href: '//casadamiao.pt/contatos/',
    },
];
export default function PageFooter() {
    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>
                {links.map(function (link) {
                    return (
                        <a key={link.label} href={link.href} className={styles.link}>
                            {link.label}
                        </a>
                    );
                })}
                <div className={styles.trademark}>Casa Damião @2020</div>
            </div>
        </div>
    );
}
