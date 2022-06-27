import React from 'react';
import styles from './Button.module.css';

interface Props {
    children: any;
    click: any;
}

const Button = ({ children, click, ...props}: Props) => {
    return <button onClick={click} {...props} className={styles.btn}>
        {children}
    </button>;
};

export default Button;
