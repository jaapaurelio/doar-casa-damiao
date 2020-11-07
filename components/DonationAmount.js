import React, { useState } from 'react';
import styles from './DonationAmount.module.css';

export default function DonationAmount({ onChange, donationValues, donationValue, disabled }) {
    const [showOtherAmount, setShowOtherAmount] = useState(false);
    const otherAmountClass = showOtherAmount ? styles.activeOtherOption : '';
    const customAmountInputRef = React.useRef();

    return (
        <div>
            <div className={styles.amountContainer}>
                {donationValues.map(function (amount) {
                    const activeClass =
                        amount === donationValue && !showOtherAmount ? styles.activeOption : '';
                    return (
                        <div
                            onClick={() => {
                                if (disabled) {
                                    return;
                                }
                                onChange(amount);
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
                    if (disabled) {
                        return;
                    }
                    if (!showOtherAmount) {
                        setShowOtherAmount(true);
                        onChange('');
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
                            disabled={disabled}
                            ref={customAmountInputRef}
                            className={styles.otherValueInput}
                            autoFocus
                            required
                            min={1}
                            step={1}
                            type="number"
                            value={donationValue}
                            onChange={(e) => {
                                const value = e.target.value ? Number(e.target.value) : '';
                                onChange(value);
                            }}></input>
                        <span>€</span>
                    </div>
                )}
            </div>
        </div>
    );
}
