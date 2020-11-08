import React, { useState } from 'react';
import styles from './Login.module.css';


export const Login = ({ onSubmit }) => {
    const [password, setPassword] = useState();

    const onPasswordChnage = (e) => {
        setPassword(e.target.value);
    }

    const onSubmitHandler = (e) => {
        e.preventDefault();
        onSubmit(password);
    }

    return <form className={styles.container} onSubmit={onSubmitHandler}>
        <div className={styles.field}>
            <label>Password:</label>
            <input type="password" placeholder="Insert password" onChange={onPasswordChnage} value={password} />
        </div>
        <button className="btn-primary">Login/Refresh</button>
    </form>
}