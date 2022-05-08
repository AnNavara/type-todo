import React, { ChangeEvent } from 'react';
import styles from './InputItem.module.css';

interface Props {
    type: string;
    name: string;
    className: string;
    min?: string;
    placeholder?: string;
    handleChange(event: ChangeEvent<HTMLInputElement>): void;
}

const InputItem = ({
    type,
    name,
    placeholder,
    handleChange,
    className,
    min,
}: Props) => {
    return (
        <input
            min={min}
            className={`${styles.input} ${className}`}
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
        />
    );
};

export default InputItem;
