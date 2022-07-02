import React from 'react';
import styles from './Button.module.css';

interface Props {
    children: any;
    click: any;
    mod?: string;
}

const Button = ({ children, click, mod, ...props }: Props) => {
    const cssStyles = [styles.btn];
    if (mod === 'transparent') cssStyles.push(styles.transparent)
    return (
        <button onClick={click} className={cssStyles.join(' ')}>
            <span>{children}</span>
        </button>
    );
};

export default Button;
