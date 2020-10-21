import styles from "./MultibancoPayment.module.css";

export default function MultibancoPayment({ entity, reference, amount }) {
  return (
    <div className={styles.multibancoPage}>
      <div className={styles.pageLogo}>
        <img src="/images/icons/multibanco.png"></img>
      </div>
      <div className={styles.pageText}>
        Confirme a sua doação utilizando os seguintes dados num terminal
        Multibanco ou no seu Home Banking.
      </div>
      <div className={styles.pageText}>
        Após confirmar o seu donativo, o seu nome ficará gravado e visível para
        todos no coração.
      </div>

      <div className={styles.mbData}>
        <table>
          <tbody>
            <tr>
              <td className={styles.mbTitles}>Entidade:</td>
              <td>{entity}</td>
            </tr>
            <tr>
              <td className={styles.mbTitles}>Referêcia:</td>
              <td>{reference}</td>
            </tr>
            <tr>
              <td className={styles.mbTitles}>Valor:</td>
              <td>{amount}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.buttonContainer}>
        <button className="btn-primary">
          <span>Concluir</span>
        </button>
      </div>
    </div>
  );
}
