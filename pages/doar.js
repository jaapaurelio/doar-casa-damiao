import styles from "../styles/Donate.module.css";
import { loadStripe } from "@stripe/stripe-js";
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Title from "../components/Title";

const donationValue = [2, 5, 10];
export default function DonatePage() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
  };

  return (
    <div className="pageWidthAlign">
      <Title mainText="Doar"></Title>
      <h2>Os seus dados</h2>
      <div>Nome</div>
      <div>
        <input type="text" />
      </div>
      <div>
        <input type="checkbox"></input>Quero ser anónimo
      </div>
      <br></br>

      <div>Email</div>
      <div>
        <input type="text" />
      </div>
      <h2>Quanto quer doar?</h2>
      <div className={styles.amountContainer}>
        {donationValue.map(function (amount) {
          return (
            <div className={styles.donationAmountOption} key={amount}>
              {amount}€
            </div>
          );
        })}
      </div>
      <div
        className={`${styles.donationAmountOption} ${styles.otherDonationAmountOption}`}
      >
        Outro
      </div>
      <h2>Pagamento</h2>
      <div className={styles.paymentMethodSelection}>
        <input type="radio" name="payment-type"></input>Cartão de crédito/débito
        <div className={styles.methodIcons}>
          <img src="/images/icons/visa-card.png" />
          <img src="/images/icons/mastercard-card.png" />
          <img src="/images/icons/maestro-card.png" />
        </div>
      </div>
      <div className={styles.paymentMethodSelection}>
        <input type="radio" name="payment-type"></input>
        Multibanco
        <div className={styles.methodIcons}>
          <img src="/images/icons/multibanco.png" />
        </div>
      </div>
      <div className={styles.paymentMethodSelection}>
        <input type="radio" name="payment-type"></input>
        MB Way
        <div className={styles.methodIcons}>
          <img src="/images/icons/mbway.png" />
        </div>
      </div>
      <div className={styles.paymentMethodSelection}>
        <input type="radio" name="payment-type"></input>Transferência Bancária
      </div>
      <div className="spacing-section">
        <button className="btn-primary btn-full">Doar</button>
      </div>

      {/*
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Pay
        </button>
      </form>
    */}
    </div>
  );
}
