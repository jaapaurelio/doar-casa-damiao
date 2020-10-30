import React, { useState } from 'react';
import styles from '../styles/Donate.module.css';
import { useRouter } from 'next/router';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Title from '../components/Title';
import PaymentOption from '../components/PaymentOption';
import { callDonationApi } from '../helpers/utils';

const donationValues = [2, 5, 10];
const formConstants = {
    NONE_PAYMENT: 'NONE_PAYMENT',
    CARD_PAYMENT: 'CARD_PAYMENT',
    IBAN_PAYMENT: 'IBAN_PAYMENT',
    MULTIBANCO_PAYMENT: 'MULTIBANCO_PAYMENT',
    MB_WAY_PAYMENT: 'MB_WAY_PAYMENT',
};

const constants = {
    apiEndpoint: `${process.env.NEXT_PUBLIC_HOME_URL}/api`,
};

export default function DonatePage() {
    const router = useRouter();
    const [donorName, setDonorName] = useState('');
    const [donorEmail, setDonorEmail] = useState('jaapaurelio@gmail.com');
    const [donationValue, setDonationValue] = useState(donationValues[0]);
    const [showOtherAmount, setShowOtherAmount] = useState(false);
    const [donorPhoneNumber /*, setDonorPhoneNumber*/] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [activePaymentMethod, setActivePaymentMethod] = useState(formConstants.NONE_PAYMENT);
    const stripe = useStripe();
    const elements = useElements();
    const customAmountInputRef = React.useRef();

    function createDonationPayload(provider) {
        return {
            paymentType: activePaymentMethod,
            provider,
            amount: donationValue,
            name: donorName,
            email: donorEmail,
        };
    }

    async function multibancoPayment() {
        const owner = {
            email: donorEmail,
        };

        if (donorName) {
            owner.name = donorName;
        }

        setLoading(true);

        try {
            const result = await stripe.createSource({
                type: 'multibanco',
                amount: Math.round(donationValue * 100),
                currency: 'eur',
                owner,
                redirect: {
                    return_url: process.env.NEXT_PUBLIC_HOME_URL,
                },
            });

            if (
                result &&
                result.source &&
                result.source.multibanco &&
                result.source.multibanco.reference
            ) {
                const dataMb = result.source;
                var formatNumber = new Intl.NumberFormat('de-DE', {
                    style: 'currency',
                    currency: 'EUR',
                    minimumFractionDigits: 0,
                });

                const amountEuro = formatNumber.format(Math.round(result.source.amount / 100));

                const body = {
                    ...createDonationPayload('mb'),
                    reference: dataMb.multibanco.reference,
                    entity: dataMb.multibanco.entity,
                    paymentId: dataMb.id,
                };

                const response = await callDonationApi(body);

                if (response.status == 'success') {
                    router.push(
                        `/pagamento?type=mb&&entity=${dataMb.multibanco.entity}&reference=${dataMb.multibanco.reference}&amount=${amountEuro}&donor=${donorName}`
                    );

                    return;
                }

                setErrorMessage('Ocorreu um erro. Verifique os dados e tente novamente.');
            }
        } catch (e) {
            setErrorMessage('Ocorreu um erro. Verifique os dados e tente novamente.');
        }

        setLoading(false);
    }

    function mbWayPayment() {
        setLoading(true);
        fetch(
            `${constants.apiEndpoint}/create-donation-mbway.php?amount=${donationValue}&phone=${donorPhoneNumber}&email=${donorEmail}&name=${donorName}`
        )
            .then((response) => response.json())
            .then((response) => {
                if (response.status == 'error') {
                    setErrorMessage(response.message[0]);
                    return;
                }

                window.location = `/mbway?phone=${donorPhoneNumber}&donor=${donorName}`;
            })
            .catch(() => {
                setErrorMessage('Ocorreu um erro. Verifique os dados e tente novamente.');
            })
            .then(() => {
                setLoading(false);
            });
    }

    function ibanPayment() {
        setLoading(true);
        return fetch(
            `${constants.apiEndpoint}/create-donation_iban.php?amount=${donationValue}&email=${donorEmail}&name=${donorName}`
        )
            .then((response) => response.json())
            .then((response) => {
                if (response.status == 'error') {
                    setErrorMessage(response.message[0]);

                    return;
                }

                window.location = `/iban?amount=${donationValue}&donor=${donorName}`;
            })
            .catch(() => {
                setErrorMessage('Ocorreu um erro. Verifique os dados e tente novamente.');
            })
            .then(() => {
                setLoading(false);
            });
    }

    async function cardPayment() {
        const body = createDonationPayload('stripe');

        setLoading(true);

        try {
            const response = await callDonationApi(body);
            const name = donorName || undefined;

            const billingDetails = {
                email: donorEmail,
                name,
            };

            const stripeResponse = await stripe.confirmCardPayment(
                response.data.donationData.intentid,
                {
                    payment_method: {
                        card: elements.getElement('card'),
                        billing_details: billingDetails,
                    },
                }
            );

            if (stripeResponse.error) {
                setErrorMessage(response.error.message);
            }

            if (
                stripeResponse &&
                stripeResponse.paymentIntent &&
                stripeResponse.paymentIntent.status === 'succeeded'
            ) {
                window.location = `/obrigado`;
            }
        } catch (e) {
            setErrorMessage('Ocorreu um erro. Verifique os dados e tente novamente.');
        }

        setLoading(false);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const submitStrategy = {
            MULTIBANCO_PAYMENT: multibancoPayment,
            CARD_PAYMENT: cardPayment,
            IBAN_PAYMENT: ibanPayment,
            MB_WAY_PAYMENT: mbWayPayment,
        };

        setErrorMessage('');

        if (activePaymentMethod === formConstants.NONE_PAYMENT) {
            setErrorMessage('Selecione um método de pagamento.');
            return;
        }

        return submitStrategy[activePaymentMethod]();
    };

    const setPaymentMethod = function (paymentMethod) {
        setActivePaymentMethod(paymentMethod);
        setErrorMessage('');
    };

    const otherAmountClass = showOtherAmount ? styles.activeOption : '';
    return (
        <div className="pageWidthAlign">
            <form onSubmit={handleSubmit}>
                <Title mainText="Doar"></Title>
                <h2>Os seus dados</h2>

                <div>
                    <div>Nome</div>
                    <input
                        type="text"
                        value={!isAnonymous ? donorName : 'Anónimo'}
                        disabled={isAnonymous}
                        onChange={(e) => setDonorName(e.target.value)}
                    />
                </div>

                <div
                    onClick={() => {
                        setIsAnonymous(!isAnonymous);
                    }}>
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
                            amount === donationValue && !showOtherAmount ? styles.activeOption : '';
                        return (
                            <div
                                onClick={() => {
                                    setDonationValue(amount);
                                    setShowOtherAmount(false);
                                }}
                                className={`${styles.donationAmountOption} ${activeClass}`}
                                key={amount}>
                                {amount}€
                            </div>
                        );
                    })}
                </div>
                <div
                    onClick={() => {
                        if (!showOtherAmount) {
                            setShowOtherAmount(true);
                            setDonationValue('');
                        }

                        setTimeout(() => {
                            customAmountInputRef.current.focus();
                        }, 0);
                    }}
                    className={`
            ${styles.donationAmountOption}
            ${styles.otherDonationAmountOption}
            ${otherAmountClass}
          `}>
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
                                    setDonationValue(Number(e.target.value));
                                }}></input>
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
                            '/images/icons/visa-card.png',
                            '/images/icons/mastercard-card.png',
                            '/images/icons/maestro-card.png',
                        ]}></PaymentOption>

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
                        icons={['/images/icons/mbway.png']}></PaymentOption>

                    {activePaymentMethod === formConstants.MB_WAY_PAYMENT && (
                        <div className={styles.spacingCard}>
                            Nº de telemóvel associado à conta MB WAY
                            <input className={styles.cardInput} type="number" required></input>
                        </div>
                    )}

                    <PaymentOption
                        label="Multibanco"
                        selected={formConstants.MULTIBANCO_PAYMENT == activePaymentMethod}
                        onClick={() => {
                            setPaymentMethod(formConstants.MULTIBANCO_PAYMENT);
                        }}
                        icons={['/images/icons/multibanco.png']}></PaymentOption>

                    <PaymentOption
                        label="Transferência Bancária"
                        selected={formConstants.IBAN_PAYMENT == activePaymentMethod}
                        onClick={() => {
                            setPaymentMethod(formConstants.IBAN_PAYMENT);
                        }}
                        icons={['']}></PaymentOption>
                </div>

                <div className="spacing-section">
                    <button disabled={loading} type="submit" className="btn-primary btn-full">
                        {!loading && <span>Doar</span>}
                        {loading && <span>Aguarde</span>}
                    </button>
                    {errorMessage != '' && (
                        <div className={styles.errorMessage}>{errorMessage}</div>
                    )}
                </div>
            </form>
        </div>
    );
}
