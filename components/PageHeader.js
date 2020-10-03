import React from "react";
import Link from 'next/link'
import styles from './PageHeader.module.css';

export default function PageHeader() {
  return (
    <div className={styles.container}>
       <Link href="/"><img className={styles.logo} src="/images/logo_casa_damiao.jpg"></img></Link>
      <button>Doar</button>
    </div>
  );
}
