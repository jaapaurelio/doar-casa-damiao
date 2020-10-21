import React, { useState } from "react";
import styles from "../styles/Donate.module.css";
import { useRouter } from "next/router";

import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Title from "../components/Title";
import PaymentOption from "../components/PaymentOption";

const donationValues = [2, 5, 10];
const formConstants = {
  NONE_PAYMENT: "NONE_PAYMENT",
  CARD_PAYMENT: "CARD_PAYMENT",
  IBAN_PAYMENT: "IBAN_PAYMENT",
  MULTIBANCO_PAYMENT: "MULTIBANCO_PAYMENT",
  MB_WAY_PAYMENT: "MB_WAY_PAYMENT",
};

export default function DonatePage() {
  console.log("process.env.NEXT_PUBLIC_HOME_URL", process.env.NEXT_PUBLIC_HOME_URL);
  const router = useRouter();
  const [donorName, setDonorName] = useState("");
  const [donorEmail, setDonorEmail] = useState("dasd@dasd.com");
  const [donationValue, setDonationValue] = useState(donationValues[0]);
  const [showOtherAmount, setShowOtherAmount] = useState(false);
  const [donorPhoneNumber, setDonorPhoneNumber] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState(
    formConstants.NONE_PAYMENT
  );
  const stripe = useStripe();
  const elements = useElements();
  const customAmountInputRef = React.useRef();

  const multibancoPayment = function () {
    const owner = {
      email: donorEmail,
    };

    if (donorName) {
      owner.name = donorName;
    }

    setLoading(true);

    stripe
      .createSource({
        type: "multibanco",
        amount: Math.round(donationValue * 100),
        currency: "eur",
        owner,
        redirect: {
          return_url: process.env.NEXT_PUBLIC_HOME_URL,
        },
      })
      .then((result) => {
        if (
          result.source &&
          result.source.amount &&
          result.source.multibanco &&
          result.source.multibanco.reference
        ) {
          const dataMb = result.source;
          var formatNumber = new Intl.NumberFormat("de-DE", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 0,
          });

          const amount = result.source.amount;
          const amountEuro = formatNumber.format(
            Math.round(result.source.amount / 100)
          );
          console.log(process.env);
          return fetch(
            `${process.env.NEXT_PUBLIC_HOME_URL}/api/donation?provider=mb&reference=${dataMb.multibanco.reference}&email=${dataMb.owner.email}&entity=${dataMb.multibanco.entity}&amount=${amount}&paymentId=${dataMb.id}&donor=${donorName}`
          ).then((response) => {
            if (response.ok) {
              router.push(
                `/multibanco?entity=${dataMb.multibanco.entity}&reference=${dataMb.multibanco.reference}&amount=${amountEuro}&donor=${donorName}`
              );
            } else {
              setErrorMessage(
                "Ocorreu um erro. Verifique os dados e tente novamente."
              );
            }
          });
        }
      })
      .catch(() => {
        this.setState({
          errorMessage:
            "Ocorreu um erro. Verifique os dados e tente novamente.",
        });
      })
      .then(() => {
        setLoading(false);
      });
  };

  const mbWayPayment = function () {
    setLoading(true);
    fetch(
      `${constants.apiEndpoint}/create-donation-mbway.php?amount=${donationValue}&phone=${donorPhoneNumber}&email=${donorEmail}&name=${donorName}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.status == "error") {
          this.setState({ errorMessage: response.message[0] });
          return;
        }

        window.location = `/mbway?phone=${donorPhoneNumber}&donor=${donorName}`;
      })
      .catch(() => {
        this.setState({
          errorMessage:
            "Ocorreu um erro. Verifique os dados e tente novamente.",
        });
      })
      .then(() => {
        setLoading(false);
      });
  };

  const ibanPayment = function () {
    setLoading(true);
    return fetch(
      `${constants.apiEndpoint}/create-donation_iban.php?amount=${donationValue}&email=${donorEmail}&name=${donorName}`
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.status == "error") {
          this.setState({ errorMessage: response.message[0] });
          return;
        }

        window.location = `/iban?amount=${donationValue}&donor=${donorName}`;
      })
      .catch(() => {
        this.setState({
          errorMessage:
            "Ocorreu um erro. Verifique os dados e tente novamente.",
        });
      })
      .then(() => {
        setLoading(false);
      });
  };

  const cardPayment = function () {
    let params = `?paymentType=${activePaymentMethod}`;
    params += `&amount=${donationValue}`;
    params += `&donorName=${donorName}`;
    params += `&email=${donorEmail}`;
    setLoading(true);
    return fetch(`${constants.apiEndpoint}/create-donation.php${params}`)
      .then((response) => response.json())
      .then((response) => {
        const billing_details = {
          email: donorEmail,
        };

        if (donorName) {
          billing_details.name = donorName;
        }

        return this.props.stripe.confirmCardPayment(response.client_secret, {
          payment_method: {
            card: this.props.elements.getElement("card"),
            billing_details,
          },
        });
      })
      .then((response) => {
        if (response.error) {
          this.setState({ errorMessage: response.error.message });
        }

        if (
          response.paymentIntent &&
          response.paymentIntent.status === "succeeded"
        ) {
          window.location = `/?donorName=${donorName}&itsOwner=true`;
        }
      })
      .catch(() => {
        this.setState({
          errorMessage:
            "Ocorreu um erro. Verifique os dados e tente novamente.",
        });
      })
      .then(() => {
        setLoading(false);
      });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    if (activePaymentMethod === formConstants.NONE_PAYMENT) {
      setErrorMessage("Selecione um método de pagamento.");
      return;
    }

    if (activePaymentMethod === formConstants.CARD_PAYMENT) {
      return cardPayment();
    }

    if (activePaymentMethod === formConstants.MULTIBANCO_PAYMENT) {
      return multibancoPayment();
    }

    if (activePaymentMethod === formConstants.MB_WAY_PAYMENT) {
      return mbWayPayment();
    }

    if (activePaymentMethod === formConstants.IBAN_PAYMENT) {
      return ibanPayment();
    }
  };

  const setPaymentMethod = function (paymentMethod) {
    setActivePaymentMethod(paymentMethod);
    setErrorMessage("");
  };

  const otherAmountClass = showOtherAmount ? styles.activeOption : "";
  return (
    <div className="pageWidthAlign">
      <form onSubmit={handleSubmit}>
        <Title mainText="Doar"></Title>
        <h2>Os seus dados</h2>

        <div>
          <div>Nome</div>
          <input
            type="text"
            value={!isAnonymous ? donorName : "Anónimo"}
            disabled={isAnonymous}
            onChange={(e) => setDonorName(e.target.value)}
          />
        </div>

        <div
          onClick={() => {
            setIsAnonymous(!isAnonymous);
          }}
        >
          <input readOnly type="checkbox" checked={isAnonymous}></input>
          Quero ser anónimo
        </div>
        <br></br>

        <div>Email</div>
        <div>
          <input
            type="email"
            value={donorEmail}
            onChange={(e) => setDonorEmail(e.target.value)}
            required
          />
        </div>
        <h2>Quanto quer doar?</h2>
        <div className={styles.amountContainer}>
          {donationValues.map(function (amount) {
            const activeClass =
              amount === donationValue && !showOtherAmount
                ? styles.activeOption
                : "";
            return (
              <div
                onClick={() => {
                  setDonationValue(amount);
                  setShowOtherAmount(false);
                }}
                className={`${styles.donationAmountOption} ${activeClass}`}
                key={amount}
              >
                {amount}€
              </div>
            );
          })}
        </div>
        <div
          onClick={() => {
            if (!showOtherAmount) {
              setShowOtherAmount(true);
              setDonationValue("");
            }

            setTimeout(() => {
              customAmountInputRef.current.focus();
            }, 0);
          }}
          className={`
            ${styles.donationAmountOption}
            ${styles.otherDonationAmountOption}
            ${otherAmountClass}
          `}
        >
          <div className={styles.otherLabel}>Outro valor</div>
          {showOtherAmount && (
            <div className={styles.otherInputContainer}>
              <input
                ref={customAmountInputRef}
                className={styles.otherValueInput}
                autoFocus
                required
                type="number"
                value={donationValue}
                onChange={(e) => {
                  setDonationValue(e.target.value);
                }}
              ></input>
              <span>€</span>
            </div>
          )}
        </div>
        <h2>Pagamento</h2>

        <div className={styles.paymentOptions}>
          <PaymentOption
            label="Cartão de crédito/débito"
            selected={formConstants.CARD_PAYMENT == activePaymentMethod}
            onClick={() => {
              setPaymentMethod(formConstants.CARD_PAYMENT);
            }}
            icons={[
              "/images/icons/visa-card.png",
              "/images/icons/mastercard-card.png",
              "/images/icons/maestro-card.png",
            ]}
          ></PaymentOption>

          {activePaymentMethod === formConstants.CARD_PAYMENT && (
            <div className={styles.spacingCard}>
              Cartão
              <div className={styles.cardInput}>
                <CardElement />
              </div>
            </div>
          )}

          <PaymentOption
            label="MB Way"
            selected={formConstants.MB_WAY_PAYMENT == activePaymentMethod}
            onClick={() => {
              setPaymentMethod(formConstants.MB_WAY_PAYMENT);
            }}
            icons={["/images/icons/mbway.png"]}
          ></PaymentOption>

          {activePaymentMethod === formConstants.MB_WAY_PAYMENT && (
            <div className={styles.spacingCard}>
              Nº de telemóvel associado à conta MB WAY
              <input
                className={styles.cardInput}
                type="number"
                required
              ></input>
            </div>
          )}

          <PaymentOption
            label="Multibanco"
            selected={formConstants.MULTIBANCO_PAYMENT == activePaymentMethod}
            onClick={() => {
              setPaymentMethod(formConstants.MULTIBANCO_PAYMENT);
            }}
            icons={["/images/icons/multibanco.png"]}
          ></PaymentOption>

          <PaymentOption
            label="Transferência Bancária"
            selected={formConstants.IBAN_PAYMENT == activePaymentMethod}
            onClick={() => {
              setPaymentMethod(formConstants.IBAN_PAYMENT);
            }}
            icons={[""]}
          ></PaymentOption>
        </div>

        <div className="spacing-section">
          {errorMessage != "" && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}
          <button type="submit" className="btn-primary btn-full">
            Doar
          </button>
        </div>
      </form>
    </div>
  );
}
