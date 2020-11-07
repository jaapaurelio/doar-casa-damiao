import React, { useState } from 'react';
import styles from './doar.module.css';
import { useRouter } from 'next/router';

import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import Title from '../components/Title';
import PaymentOption from '../components/PaymentOption';
import DonationAmount from '../components/DonationAmount';
import { callDonationApi } from '../helpers/http';

const donationValues = [5, 10, 20];
const formConstants = {
    NONE_PAYMENT: 'NONE_PAYMENT',
    CARD_PAYMENT: 'CARD_PAYMENT',
    IBAN_PAYMENT: 'IBAN_PAYMENT',
    MULTIBANCO_PAYMENT: 'MULTIBANCO_PAYMENT',
    MB_WAY_PAYMENT: 'MB_WAY_PAYMENT',
};

var formatNumber = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
});

export default function DonatePage() {
    const router = useRouter();
    const [donorName, setDonorName] = useState('');
    const [donorEmail, setDonorEmail] = useState('jaapaurelio@gmail.com');
    const [donationValue, setDonationValue] = useState(donationValues[0]);
    const [donorPhoneNumber, setDonorPhoneNumber] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [activePaymentMethod, setActivePaymentMethod] = useState(formConstants.NONE_PAYMENT);
    const stripe = useStripe();
    const elements = useElements();

    function createDonationPayload(provider) {
        return {
            paymentType: activePaymentMethod,
            provider,
            amount: donationValue,
            name: donorName,
            email: donorEmail,
            phone: donorPhoneNumber,
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

    async function mbWayPayment() {
        setLoading(true);

        const body = {
            ...createDonationPayload('mbway'),
        };
        const amountEuro = formatNumber.format(Math.round(body.amount));

        try {
            const response = await callDonationApi(body);

            if (response.status == 'success') {
                window.location = `/pagamento?type=mbway&phone=${body.phone}&amount=${amountEuro}`;
                return;
            }

            setErrorMessage(response.data.message);
        } catch (e) {
            setErrorMessage('Ocorreu um erro. Verifique os dados e tente novamente.');
        }

        setLoading(false);
    }

    async function ibanPayment() {
        setLoading(true);

        const body = {
            ...createDonationPayload('iban'),
        };

        const amountEuro = formatNumber.format(Math.round(body.amount));

        try {
            const response = await callDonationApi(body);

            if (response.status == 'success') {
                window.location = `/pagamento?type=iban&amount=${amountEuro}`;
            }

            setErrorMessage(response.data.message);
        } catch (e) {
            setErrorMessage('Ocorreu um erro. Verifique os dados e tente novamente.');
        }

        setLoading(false);
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
                response.data.donationData.clientSecret,
                {
                    payment_method: {
                        card: elements.getElement('card'),
                        billing_details: billingDetails,
                    },
                }
            );

            if (
                stripeResponse &&
                stripeResponse.paymentIntent &&
                stripeResponse.paymentIntent.status === 'succeeded'
            ) {
                window.location = `/obrigado`;
                return;
            }

            setErrorMessage(response.error.message);
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
                        disabled={isAnonymous || loading}
                        onChange={(e) => setDonorName(e.target.value)}
                    />
                </div>

                <div
                    className={styles.stayAnonymous}
                    onClick={() => {
                        if (loading) {
                            return;
                        }
                        setDonorName('');
                        setIsAnonymous(!isAnonymous);
                    }}>
                    <input
                        disabled={loading}
                        readOnly
                        type="checkbox"
                        checked={isAnonymous}></input>
                    Quero ser anónimo
                </div>
                <br></br>

                <div>Email</div>
                <div>
                    <input
                        disabled={loading}
                        type="email"
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        required
                    />
                </div>
                <h2>Quanto quer doar?</h2>
                <DonationAmount
                    onChange={setDonationValue}
                    donationValues={donationValues}
                    donationValue={donationValue}
                    disabled={loading}></DonationAmount>

                <h2>Pagamento</h2>

                <div className={styles.paymentOptions}>
                    <PaymentOption
                        label="Cartão de crédito/débito"
                        selected={formConstants.CARD_PAYMENT == activePaymentMethod}
                        onClick={() => {
                            if (loading) {
                                return;
                            }
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
                                <CardElement options={{ disabled: loading }} />
                            </div>
                        </div>
                    )}

                    <PaymentOption
                        label="MB Way"
                        selected={formConstants.MB_WAY_PAYMENT == activePaymentMethod}
                        onClick={() => {
                            if (loading) {
                                return;
                            }
                            setPaymentMethod(formConstants.MB_WAY_PAYMENT);
                        }}
                        icons={['/images/icons/mbway.png']}></PaymentOption>

                    {activePaymentMethod === formConstants.MB_WAY_PAYMENT && (
                        <div className={styles.spacingCard}>
                            Nº de telemóvel associado à conta MB WAY
                            <input
                                disabled={loading}
                                className={styles.cardInput}
                                value={donorPhoneNumber}
                                type="number"
                                onChange={(e) => {
                                    setDonorPhoneNumber(e.target.value);
                                }}
                                required></input>
                        </div>
                    )}

                    <PaymentOption
                        label="Multibanco"
                        selected={formConstants.MULTIBANCO_PAYMENT == activePaymentMethod}
                        onClick={() => {
                            if (loading) {
                                return;
                            }
                            setPaymentMethod(formConstants.MULTIBANCO_PAYMENT);
                        }}
                        icons={['/images/icons/multibanco.png']}></PaymentOption>

                    <PaymentOption
                        label="Transferência Bancária"
                        selected={formConstants.IBAN_PAYMENT == activePaymentMethod}
                        onClick={() => {
                            if (loading) {
                                return;
                            }
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
