import React from 'react';
import styles from './Login.module.css';

export const Login = ({ password, onChange, onSubmit }) => {
    const onPasswordChnage = (e) => {
        onChange(e.target.value);
    };

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onSubmit(password);
    };

    return (
        <form className={styles.container} onSubmit={onSubmitHandler}>
            <div className={styles.field}>
                <label>Password:</label>
                <input
                    type="password"
                    placeholder="Insert password"
                    onChange={onPasswordChnage}
                    value={password}
                />
            </div>
            <button className="btn-primary">Login/Refresh</button>
        </form>
    );
};
